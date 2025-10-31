// Demo Video Types and Interfaces

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string; // "3:45"
  type: 'youtube' | 'vimeo' | 'direct' | 'embedded';
  market: 'LATAM' | 'USA' | 'GLOBAL';
  language: 'es' | 'en';
  features?: string[]; // Features highlighted in video
}

export interface VideoModalProps {
  video: DemoVideo;
  isOpen: boolean;
  onClose: () => void;
  onPlay?: () => void;
  onComplete?: () => void;
}

export interface DemoVideoSectionProps {
  videos?: DemoVideo[];
  primaryVideo?: DemoVideo;
  autoplayThumbnail?: boolean;
  showPlaylist?: boolean;
  market?: 'LATAM' | 'USA' | 'GLOBAL';
  language?: 'es' | 'en';
  className?: string;
}