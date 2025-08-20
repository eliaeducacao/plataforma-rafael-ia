import { useState, useCallback } from 'react';
import { VIDEOS } from './contants';

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  thumbnail: string;
  completed?: boolean;
}

export interface AcademyState {
  completedVideos: Set<string>;
  isLoading: boolean;
  error: string | null;
}

export function useAcademyModel() {
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const markVideoAsCompleted = useCallback((videoId: string) => {
    setCompletedVideos(prev => new Set([...prev, videoId]));
  }, []);

  const openVideo = useCallback((video: Video) => {
    try {
      window.open(video.url, '_blank');
      // Opcional: marcar como completado automaticamente
      // markVideoAsCompleted(video.id);
    } catch {
      setError('Erro ao abrir o vídeo. Tente novamente.');
    }
  }, []);

  const getProgressPercentage = useCallback(() => {
    return (completedVideos.size / VIDEOS.length) * 100;
  }, [completedVideos.size]);

  const selectVideo = useCallback((video: Video) => {
    setCurrentVideo(video);
  }, []);

  const getCurrentVideo = useCallback((): Video => {
    return (
      currentVideo ||
      VIDEOS[0] || {
        id: '1',
        title: 'Como acessar a plataforma da Elia',
        description: 'Tutorial completo sobre como acessar e navegar pela plataforma da Elia.',
        duration: '5 min',
        url: 'https://youtu.be/ws5t1YCwKFc',
        thumbnail: '/api/placeholder/400/225',
      }
    );
  }, [currentVideo]);

  return {
    completedVideos,
    isLoading,
    error,
    markVideoAsCompleted,
    openVideo,
    selectVideo,
    getProgressPercentage,
    getCurrentVideo,
  };
}
