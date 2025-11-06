'use client';

import { useState, useEffect } from 'react';
import { DemoVideo, VideoModalProps, DemoVideoSectionProps } from '@/types/demo-video';
import { trackCTAClick } from '@/lib/analytics';
import { PRODUCTION_DEMO_VIDEOS, getVideosByMarket, getMainDemoVideo } from '@/lib/demo-videos';
import ImageCarousel from '@/components/ui/image-carousel';
import { getScreenshotsByMarket, PLACEHOLDER_SCREENSHOTS } from '@/lib/product-screenshots';

// Use production video configuration
const DEMO_VIDEOS = PRODUCTION_DEMO_VIDEOS;

// Helper function to properly combine URL parameters
function buildVideoUrl(baseUrl: string, params: Record<string, string | number>): string {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  
  const finalUrl = url.toString();
  
  // Debug logging for video URL generation
  if (typeof window !== 'undefined') {
    console.log('🎬 Video URL Debug:', {
      baseUrl,
      params,
      finalUrl,
      cacheBustEnv: process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST
    });
  }
  
  return finalUrl;
}

// Video Modal Component
function VideoModal({ video, isOpen, onClose, onPlay, onComplete }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      onPlay?.();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onPlay]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-[var(--brand)] transition text-2xl z-10"
          aria-label="Cerrar video"
        >
          ✕
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video">
            {video.type === 'youtube' && (
              <iframe
                src={buildVideoUrl(video.videoUrl, { autoplay: 1, rel: 0, modestbranding: 1 })}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            {video.type === 'vimeo' && (
              <iframe
                src={buildVideoUrl(video.videoUrl, { autoplay: 1, title: 0, byline: 0, portrait: 0 })}
                title={video.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            {video.type === 'direct' && (
              <video
                src={video.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
                onEnded={onComplete}
              >
                Tu navegador no soporta la reproducción de video.
              </video>
            )}
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 text-white text-center">
          <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
          <p className="text-gray-300 text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

// Main Demo Video Section Component
export default function DemoVideoSection({
  videos = DEMO_VIDEOS,
  primaryVideo,
  autoplayThumbnail = false,
  showPlaylist = false,
  market = 'LATAM',
  language = 'es',
  className = ""
}: DemoVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'video' | 'images'>('video');
  const [videoError, setVideoError] = useState(false);

  // Filter videos by market and language using utility function
  const filteredVideos = getVideosByMarket(market, language);

  // Use smart main video selection or provided primary video
  const mainVideo = primaryVideo || getMainDemoVideo(market, language) || filteredVideos[0];

  // Get product screenshots for the current market
  const screenshots = getScreenshotsByMarket(market);

  // Get localized text based on market and language
  const getLocalizedText = (key: 'screenshots' | 'productScreenshots' | 'videoDemo') => {
    const texts = {
      'screenshots': {
        'es': '🖼️ Capturas',
        'en': '🖼️ Screenshots', 
        'pt': '🖼️ Capturas'
      },
      'productScreenshots': {
        'es': 'Capturas del Producto',
        'en': 'Product Screenshots',
        'pt': 'Capturas do Produto'
      },
      'videoDemo': {
        'es': '🎬 Historia del Fundador',
        'en': '🎬 Founder\'s Story',
        'pt': '🎬 História do Fundador'
      }
    };
    return texts[key]?.[language as keyof typeof texts[typeof key]] || texts[key]?.['en'] || key;
  };

  // Auto-switch to images if video fails to load
  useEffect(() => {
    if (videoError) {
      setViewMode('images');
    }
  }, [videoError]);

  if (!mainVideo) {
    // Fallback content if no videos available
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Demo próximamente disponible' : 'Demo coming soon'}
          </h2>
          <p className="text-[var(--muted)] mb-8">
            {language === 'es' 
              ? 'Estamos preparando el video del fundador para usted.'
              : 'We are preparing the founder\'s video for you.'
            }
          </p>
          <a
            href="/schedule"
            className="inline-flex items-center gap-2 gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            {language === 'es' ? 'Agendar videollamada personal con el fundador' : 'Schedule personal video call with founder'}
          </a>
        </div>
      </section>
    );
  }

  const handleVideoPlay = (video: DemoVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    trackCTAClick('demo_video', `play_${video.id}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const t = getTranslations(language);

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">{t.title}</h2>
          <p className="text-[var(--muted)] text-lg mb-6">{t.subtitle}</p>
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setViewMode('video')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'video'
                  ? 'bg-[var(--brand)] text-black'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-[var(--brand)]'
              }`}
            >
              {getLocalizedText('videoDemo')}
            </button>
            <button
              onClick={() => setViewMode('images')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'images'
                  ? 'bg-[var(--brand)] text-black'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-[var(--brand)]'
              }`}
            >
              {getLocalizedText('screenshots')}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {viewMode === 'video' ? (
          /* Main Video */
        <div className="relative mb-8">
          <div className="relative group cursor-pointer" onClick={() => handleVideoPlay(mainVideo)}>
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[var(--brand)]/20 to-[var(--brand2)]/20 rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[var(--brand)] transition-all duration-300">
              {/* Placeholder thumbnail with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                {/* Clean video area - no text overlay */}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
                <div className="w-20 h-20 bg-[var(--brand)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-black text-2xl ml-1">▶</div>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                {mainVideo.duration}
              </div>

              {/* Feature Highlights - REMOVED: Features now shown in carousel screenshots */}
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--brand)]/0 to-[var(--brand2)]/0 group-hover:from-[var(--brand)]/5 group-hover:to-[var(--brand2)]/5 transition-all duration-300 pointer-events-none" />
          </div>

          {/* Video Info */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{mainVideo.title}</h3>
            <p className="text-[var(--muted)] mb-4">{mainVideo.description}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleVideoPlay(mainVideo)}
                className="inline-flex items-center gap-2 gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
              >
                <span>▶</span>
                {t.watchDemo}
              </button>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] px-6 py-3 rounded-lg transition font-medium"
                onClick={() => trackCTAClick('demo_video', 'request_live_demo')}
              >
                <span>📧</span>
                {t.scheduleLive}
              </a>
            </div>
          </div>
        </div>
        ) : (
          /* Image Carousel */
          <div className="relative mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{getLocalizedText('productScreenshots')}</h3>
              <p className="text-[var(--muted)]">
                {language === 'es' 
                  ? 'Explore nuestra interfaz a través de estas capturas reales del producto'
                  : 'Explore our interface through these product images'
                }
              </p>
            </div>
            
            <ImageCarousel 
              images={screenshots}
              autoPlay={true}
              showDots={true}
              showArrows={true}
              autoPlayInterval={4000}
              className="max-w-4xl mx-auto"
            />
            
            {/* Action Buttons for Carousel */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/schedule"
              className="inline-flex items-center gap-2 gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
              onClick={() => trackCTAClick('demo_screenshots', 'request_demo')}
            >
              <span>�</span>
              {language === 'es' ? 'Agendar Videollamada' : 'Schedule Video Call'}
            </a>              <button
                onClick={() => setViewMode('video')}
                className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] px-6 py-3 rounded-lg transition font-medium"
              >
                <span>📹</span>
                Switch to Video
              </button>
            </div>
          </div>
        )}

        {/* Video Playlist */}
        {showPlaylist && filteredVideos.length > 1 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">{t.moreVideos}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.slice(1).map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => handleVideoPlay(video)}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-[var(--border)] group-hover:border-[var(--brand)] transition-all duration-300">
                    {/* Thumbnail placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-3xl mb-2">○</div>
                        <div className="text-sm font-medium px-2">{video.title}</div>
                      </div>
                    </div>

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition">
                      <div className="w-12 h-12 bg-[var(--brand)] rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <div className="text-black text-lg ml-0.5">▶</div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                    <p className="text-[var(--muted)] text-xs">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits Section - REMOVED: Obsolete due to new carousel screenshots */}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onPlay={() => trackCTAClick('demo_video', `started_${selectedVideo.id}`)}
          onComplete={() => trackCTAClick('demo_video', `completed_${selectedVideo.id}`)}
        />
      )}
    </section>
  );
}

// Translation helper
function getTranslations(language: 'es' | 'en') {
  if (language === 'es') {
    return {
      title: 'La Historia Detrás de KHESED-TEK',
      subtitle: 'Nuestra Misión: Transformar la Gestión de Iglesias',
      watchDemo: 'Ver Historia del Fundador',
      scheduleLive: 'Agendar Videollamada Personal',
      moreVideos: 'Más Videos',
      benefits: {
        quick: {
          title: 'Historia Personal',
          description: 'Conozca la historia personal del fundador y por qué creó esta solución.'
        },
        personalized: {
          title: 'Videollamada Personal',
          description: 'Hable directamente con el fundador sobre las necesidades de su iglesia.'
        },
        noCommitment: {
          title: 'Conversación Sin Presión',
          description: 'Una charla genuina sobre cómo podemos servir a su congregación.'
        }
      }
    };
  } else {
    return {
      title: 'The Story Behind KHESED-TEK',
      subtitle: 'Our Mission: Transforming Church Management',
      watchDemo: 'Watch Founder\'s Story',
      scheduleLive: 'Schedule Personal Video Call',
      moreVideos: 'More Videos',
      benefits: {
        quick: {
          title: 'Personal Story',
          description: 'Learn the founder\'s personal journey and why this solution was created.'
        },
        personalized: {
          title: 'Personal Video Call',
          description: 'Speak directly with the founder about your church\'s specific needs.'
        },
        noCommitment: {
          title: 'No-Pressure Conversation',
          description: 'A genuine conversation about how we can serve your congregation.'
        }
      }
    };
  }
}