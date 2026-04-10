import Stripe from 'stripe';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load local environment variables
dotenv.config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../temp/sicamon_rugs.json');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
});

async function seed() {
  console.log('🚀 [Seeder] Starting Bulk Catalog Injection...');

  try {
    const rawData = await readFile(DATA_PATH, 'utf-8');
    const rugs = JSON.parse(rawData);

    // Get existing products to avoid duplicates
    const existingProducts = await stripe.products.list({ limit: 100 });
    const productNames = new Set(existingProducts.data.map(p => p.name));

    for (const rug of rugs) {
      const existing = existingProducts.data.find(p => p.name === rug.rug_title);
      
      if (existing) {
        console.log(`🆙 [Update] Ensuring ${rug.rug_title} is active...`);
        await stripe.products.update(existing.id, { 
          active: true,
          metadata: {
            ...existing.metadata,
            available: rug.available ? 'true' : 'false'
          }
        });
        continue;
      }

      console.log(`📦 [Create] Seeding ${rug.rug_title}...`);

      const priceInPence = Math.round(rug.price * 100);
      const isAvailable = rug.available === true;

      // 1. Create Product
      const product = await stripe.products.create({
        name: rug.rug_title,
        description: rug.description,
        images: rug.image_url ? [rug.image_url] : [],
        active: true, // Always active so they appear in the gallery
        metadata: {
          available: isAvailable ? 'true' : 'false',
          one_of_a_kind: 'true',
          dimensions: rug.size || 'Unknown',
          tiktok_link: rug.video_link || '',
          price_raw: rug.price.toString(),
          origin: 'bulk_seed_v1'
        }
      });

      // 2. Create Price (if applicable)
      if (rug.price > 0) {
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: priceInPence,
          currency: 'gbp',
        });

        // Set as default price
        await stripe.products.update(product.id, {
          default_price: price.id,
        });
        
        console.log(`   ✓ Price created: £${rug.price}`);
      } else {
        console.log(`   ⚠ No price created (Portfolio item)`);
      }
    }

    console.log('\n✅ [Seeder] Injection complete. Check your Stripe Dashboard.');
  } catch (err) {
    console.error('❌ [Seeder] Fatal error during injection:', err);
    process.exit(1);
  }
}

seed();
