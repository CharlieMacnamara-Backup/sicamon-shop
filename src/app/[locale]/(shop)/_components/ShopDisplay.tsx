'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { RugCheckout } from './RugCheckout';
import { useTranslations } from 'next-intl';
import { ProductGalleryModal } from './ProductGalleryModal';

interface Product {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  metadata: Record<string, string>;
  active: boolean;
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  } | null;
}

interface ShopDisplayProps {
  products: Product[];
}

export function ShopDisplay({ products }: ShopDisplayProps) {
  const t = useTranslations("Shop");
  const tEmpty = useTranslations("Shop.empty");
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);

  const handleBuyNow = async (priceId: string) => {
    if (isCreatingSession) return;
    
    // Sequential Flow: Close gallery first to avoid state collision
    setIsGalleryOpen(false);
    
    setIsCreatingSession(true);
    try {
      setSelectedPriceId(priceId);
      setIsModalOpen(true);
    } finally {
      setTimeout(() => setIsCreatingSession(false), 800);
    }
  };

  const handleOpenGallery = (product: Product) => {
    setFocusedProduct(product);
    setIsGalleryOpen(true);
  };

  // Modularly sorting product list: Available items first, followed by others
  const sortedProducts = [...products].sort((a, b) => {
    const aAvailable = a.metadata.available === 'true';
    const bAvailable = b.metadata.available === 'true';
    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;
    return 0;
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32 text-center px-6 sm:px-10 lg:px-14">
        <h2 className="text-4xl font-display font-medium mb-6 sm:mb-8 lg:mb-10 text-zinc-900 dark:text-white italic tracking-tighter">
          {tEmpty("title")}
        </h2>
        <p className="max-w-md text-zinc-500 dark:text-zinc-400 mb-12 sm:mb-16 lg:mb-20 leading-relaxed text-lg font-medium italic">
          {tEmpty("description")}
        </p>
        <Link 
          href="/contact"
          className="btn-premium px-12 py-5 sm:px-14 sm:py-6"
        >
          {tEmpty("cta")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 px-4 md:px-8 max-w-7xl mx-auto">
        {sortedProducts.map((product) => {
          const price = product.default_price;
          const isSoldOut = product.metadata.available !== 'true' || !product.active;
          
          const priceString = price 
            ? new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: price.currency.toUpperCase(),
              }).format(price.unit_amount / 100)
            : 'Price on Request';
            
          return (
            <div 
              key={product.id} 
              className="group flex flex-col h-full w-full overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-500 rounded-[2.5rem]"
            >
              {/* Image Container - Expanded Click Target */}
              <div 
                className="relative aspect-4/5 group/card overflow-hidden bg-zinc-50 dark:bg-zinc-800/20 cursor-zoom-in"
                onClick={() => handleOpenGallery(product)}
              >
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'opacity-80' : ''}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-400 italic font-medium">
                    <span>{t("items.awaitingImage")}</span>
                  </div>
                )}
                

                {/* Identity Strip: Horizontal Symmetry */}
                {product.metadata.one_of_a_kind === 'true' && (
                  <div className={`absolute top-6 left-4 sm:top-8 sm:left-8 border border-zinc-900 dark:border-white ${isSoldOut ? 'bg-zinc-900 text-white border-none' : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white'} backdrop-blur px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest z-20 shadow-lg pointer-events-none whitespace-nowrap`}>
                    {isSoldOut ? t("items.sold") : t("items.oneOfAKind")}
                  </div>
                )}
                
                {!isSoldOut && product.metadata.discount_eligible === 'true' && (
                  <div className="absolute top-6 right-4 sm:top-8 sm:right-8 bg-teal-600/90 backdrop-blur text-white px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest z-20 shadow-lg pointer-events-none whitespace-nowrap">
                    15% Discount
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 flex flex-col flex-1">
                <div className="flex flex-col gap-1 sm:gap-1 w-full text-center md:text-left mb-6 sm:mb-8 min-h-[140px]">
                  <h3 className="text-2xl font-display font-medium text-zinc-900 dark:text-white group-hover:text-zinc-500 transition-colors mb-4 tracking-tighter line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                    <div className="flex flex-col items-center md:items-start gap-1 sm:gap-1 min-h-[60px] justify-start">
                      {product.metadata.discount_eligible === 'true' && !isSoldOut && price ? (
                        <>
                          <span className="text-sm font-display italic text-zinc-400 line-through leading-none">
                            {priceString}
                          </span>
                          <span className="text-2xl font-display italic text-zinc-900 dark:text-white leading-tight">
                            {new Intl.NumberFormat('en-GB', {
                              style: 'currency',
                              currency: price.currency.toUpperCase(),
                            }).format((price.unit_amount * 0.85) / 100)}
                          </span>
                          <span className="mt-1 px-2 py-0.5 bg-zinc-50 dark:bg-zinc-950/30 text-teal-600 dark:text-teal-400 text-[9px] font-bold uppercase tracking-widest rounded border border-zinc-100 dark:border-zinc-900/50">
                            Use code: sicamon
                          </span>
                        </>
                      ) : (
                        <span className={isSoldOut 
                          ? "text-2xl font-display italic text-zinc-400 line-through" 
                          : "text-2xl font-display italic text-zinc-900 dark:text-white"
                        }>
                          {priceString}
                        </span>
                      )}
                    </div>
                  </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-8 sm:mb-10 min-h-[110px] leading-relaxed italic font-serif text-center flex-1">
                  {product.description || t("items.defaultDescription")}
                </p>

                <div className="mt-auto">
                  {isSoldOut || !price?.id ? (
                    <button 
                      disabled
                      className="w-full py-4 sm:py-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 font-bold text-xs cursor-not-allowed uppercase tracking-widest"
                    >
                      {!price?.id && !isSoldOut ? t("items.awaitingImage") : t("items.sold")}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBuyNow(price.id)}
                      disabled={isCreatingSession}
                      className={`w-full btn-premium py-4 sm:py-5 ${isCreatingSession ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {isCreatingSession ? t("items.securing") || "Securing..." : t("items.buyNow")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discover & Acquire Chain */}
      <ProductGalleryModal
        product={focusedProduct as any}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onBuyNow={handleBuyNow}
      />
      
      {selectedPriceId && (
        <RugCheckout 
          priceId={selectedPriceId} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
