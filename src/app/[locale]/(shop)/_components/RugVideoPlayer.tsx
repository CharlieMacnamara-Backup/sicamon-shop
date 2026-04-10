'use client';

import React, { useEffect } from 'react';
import { trackRugInsight } from '@/actions/museum';
import { extractTikTokId, getNativeEmbedUrl } from '@/actions/tiktok-protocol';
import { useParams } from 'next/navigation';

interface RugVideoPlayerProps {
  productId: string;
  videoUrl: string;
  className?: string;
}

/**
 * Isolated Rug Video Player
 * Consumes the TikTok Protocol for secure, high-performance V1 embedding.
 * Resolves IDE regressions by strictly typing the intrinsic iframe elements.
 */
export function RugVideoPlayer({ productId, videoUrl, className }: RugVideoPlayerProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const videoId = extractTikTokId(videoUrl);

  useEffect(() => {
    if (videoId) {
      // Log museum engagement with the 10x backend protocol
      trackRugInsight({
        productId,
        locale,
        interactionType: 'video_play',
      });
    }
  }, [productId, videoId, locale]);

  if (!videoId) return null;

  const embedUrl = getNativeEmbedUrl(videoId);

  return (
    <div className={`relative w-full overflow-hidden transition-all duration-700 ${className || ''}`}>
      {/* 10x Boutique Frame: Fixed 9:16 Aspect Ratio */}
      <div className="relative w-full aspect-9/16 bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group/player">
        
        {/* Shimmer Skeleton - Atelier Luxury Layer */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-900/40 backdrop-blur-sm">
            <div className="w-full h-full animate-pulse bg-linear-to-br from-zinc-800/20 via-zinc-700/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] animate-pulse">
                Hydrating Studio Insight...
              </span>
            </div>
          </div>
        )}

        <iframe
          src={embedUrl}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title="Sicamon Studio Creative Process"
          key={videoId} 
        />
        
        {/* Subtle Brand Overlay (Non-interfering) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none group-hover/player:opacity-0 transition-opacity z-10">
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">Studio Archive</span>
        </div>
      </div>
    </div>
  );
}
