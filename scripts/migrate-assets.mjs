import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environmental identifiers for Dahlia-class authentication
dotenv.config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
});

const TEMP_DIR = path.resolve('temp');
const MANIFEST_PATH = path.join(TEMP_DIR, 'sicamon_rugs.json');

async function migrate() {
  console.log('🚀 [Atelier] Initializing Sequential Asset Migration Bridge...');

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ [Atelier] Manifest not found at temp/sicamon_rugs.json');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const products = await stripe.products.list({ limit: 100, active: true });

  console.log(`📦 [Atelier] Identified ${manifest.length} manifest items.`);

  for (const item of manifest) {
    const filePath = path.join(TEMP_DIR, item.image_ref);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ [Atelier] Asset missing locally: ${item.image_ref}. Skipping.`);
      continue;
    }

    // Identfying the corresponding Stripe Product by name
    const product = products.data.find(p => 
      p.name.toLowerCase() === item.rug_title.toLowerCase()
    );

    if (!product) {
      console.warn(`🕵️ [Atelier] No Stripe product found for: "${item.rug_title}". Skipping.`);
      continue;
    }

    try {
      console.log(`📡 [Atelier] Uploading ${item.image_ref} as certified asset for "${item.rug_title}"...`);
      
      // 1. Upload file directly to Stripe CDN using curl.exe for robust multipart handling
      const curlCmd = `curl.exe -s -X POST https://files.stripe.com/v1/files -u ${process.env.STRIPE_SECRET_KEY}: -F purpose=business_logo -F "file=@${filePath.replace(/\\/g, '/')}"`;
      const fileResponse = JSON.parse(child_process.execSync(curlCmd).toString());

      if (fileResponse.error) throw new Error(fileResponse.error.message);

      // 2. Generate secure Public File Link
      const fileLink = await stripe.fileLinks.create({
        file: fileResponse.id,
      });

      // 3. Atomic Product Update: Purging legacy pointers
      await stripe.products.update(product.id, {
        images: [fileLink.url],
        metadata: {
          ...product.metadata,
          asset_migrated: 'true',
          handcrafted_size: item.size,
          video_link: item.video_link
        }
      });

      console.log(`✅ [Atelier] ${item.rug_title} successfully manifest at ${fileLink.url}`);
    } catch (err) {
      console.error(`❌ [Atelier] Migration failed for ${item.rug_title}:`, err.message);
    }
  }

  console.log('\n✅ [Atelier] Sequential Asset Migration Bridge Closed.');
}

migrate();
