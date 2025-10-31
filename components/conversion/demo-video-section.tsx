'use client';

import { useState, useEffect } from 'react';
import { DemoVideo, VideoModalProps, DemoVideoSectionProps } from '@/types/demo-video';
import { trackCTAClick } from '@/lib/analytics';

// Sample demo videos (in production, fetch from CMS)
const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'demo-overview-es',
    title: 'KHESED-TEK: Demostración Completa',
    description: 'Vea cómo nuestro sistema transforma la gestión de su iglesia en solo 5 minutos.',
    thumbnailUrl: '/images/demo-thumbnail-es.jpg', // You'll need to add this
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    duration: '5:30',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Gestión de miembros', 'Donaciones en línea', 'Eventos', 'Reportes']
  },
  {
    id: 'demo-overview-en',
    title: 'KHESED-TEK: Complete Demonstration',
    description: 'See how our system transforms your church management in just 5 minutes.',
    thumbnailUrl: '/images/demo-thumbnail-en.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:30',
    type: 'youtube',
    market: 'USA',
    language: 'en',
    features: ['Member management', 'Online donations', 'Events', 'Reports']
  },
  {
    id: 'quick-tour-es',
    title: 'Tour Rápido - 2 Minutos',
    description: 'Un vistazo rápido a las funciones principales del sistema.',
    thumbnailUrl: '/images/quick-tour-es.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2:15',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Dashboard', 'Navegación', 'Funciones clave']
  }
];

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
                src={`${video.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            {video.type === 'vimeo' && (
              <iframe
                src={`${video.videoUrl}?autoplay=1&title=0&byline=0&portrait=0`}
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

  // Filter videos by market and language
  const filteredVideos = videos.filter(v => 
    (v.market === market || v.market === 'GLOBAL') && v.language === language
  );

  const mainVideo = primaryVideo || filteredVideos[0];

  if (!mainVideo) return null;

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
        </div>

        {/* Main Video */}
        <div className="relative mb-8">
          <div className="relative group cursor-pointer" onClick={() => handleVideoPlay(mainVideo)}>
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[var(--brand)]/20 to-[var(--brand2)]/20 rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[var(--brand)] transition-all duration-300">
              {/* Placeholder thumbnail with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-2xl font-semibold mb-2">{mainVideo.title}</h3>
                  <p className="text-gray-300 max-w-md mx-auto">{mainVideo.description}</p>
                </div>
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

              {/* Feature Highlights */}
              {mainVideo.features && (
                <div className="absolute top-4 left-4 space-y-2">
                  {mainVideo.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                      {feature}
                    </div>
                  ))}
                </div>
              )}
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
                <span>📅</span>
                {t.scheduleLive}
              </a>
            </div>
          </div>
        </div>

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
                        <div className="text-3xl mb-2">🎬</div>
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

        {/* Benefits Section */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-3xl">⚡</div>
              <h4 className="font-semibold">{t.benefits.quick.title}</h4>
              <p className="text-[var(--muted)] text-sm">{t.benefits.quick.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="text-3xl">🎯</div>
              <h4 className="font-semibold">{t.benefits.personalized.title}</h4>
              <p className="text-[var(--muted)] text-sm">{t.benefits.personalized.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="text-3xl">✅</div>
              <h4 className="font-semibold">{t.benefits.noCommitment.title}</h4>
              <p className="text-[var(--muted)] text-sm">{t.benefits.noCommitment.description}</p>
            </div>
          </div>
        </div>
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
      title: 'Vea KHESED-TEK en Acción',
      subtitle: 'Descubra cómo transformamos la gestión de su iglesia en minutos',
      watchDemo: 'Ver Demostración',
      scheduleLive: 'Agendar Demo en Vivo',
      moreVideos: 'Más Videos Demostrativos',
      benefits: {
        quick: {
          title: 'Demo de 5 Minutos',
          description: 'Vea todas las funciones principales en una demostración rápida y completa.'
        },
        personalized: {
          title: 'Personalizada para su Iglesia',
          description: 'Cada demo se adapta al tamaño y necesidades específicas de su congregación.'
        },
        noCommitment: {
          title: 'Sin Compromiso',
          description: 'Explore libremente todas las funciones antes de tomar cualquier decisión.'
        }
      }
    };
  } else {
    return {
      title: 'See KHESED-TEK in Action',
      subtitle: 'Discover how we transform your church management in minutes',
      watchDemo: 'Watch Demo',
      scheduleLive: 'Schedule Live Demo',
      moreVideos: 'More Demo Videos',
      benefits: {
        quick: {
          title: '5-Minute Demo',
          description: 'See all key features in a quick and comprehensive demonstration.'
        },
        personalized: {
          title: 'Customized for Your Church',
          description: 'Each demo adapts to your congregation\'s specific size and needs.'
        },
        noCommitment: {
          title: 'No Commitment',
          description: 'Freely explore all features before making any decision.'
        }
      }
    };
  }
}