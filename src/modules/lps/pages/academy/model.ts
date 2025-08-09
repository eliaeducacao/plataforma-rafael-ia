import { useState, useCallback } from 'react';

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
  videos: Video[];
  completedVideos: Set<string>;
  isLoading: boolean;
  error: string | null;
}

export interface AcademyActions {
  markVideoAsCompleted: (videoId: string) => void;
  openVideo: (video: Video) => void;
  selectVideo: (video: Video) => void;
  getProgressPercentage: () => number;
  getCurrentVideo: () => Video;
}

export type AcademyModel = AcademyState & AcademyActions;

export function useAcademyModel(): AcademyModel {
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: '1',
      title: 'Aula de Boas-vindas',
      description:
        'Introdução ao curso e apresentação dos objetivos de aprendizagem sobre IA na advocacia.',
      duration: '15 min',
      url: 'https://youtu.be/FOP4CmVCxFQ',
      thumbnail: '/api/placeholder/400/225',
    },
    {
      id: '2',
      title: 'O que é Inteligência Artificial Generativa?',
      description:
        'Fundamentos e conceitos básicos sobre IA generativa e suas aplicações no universo jurídico.',
      duration: '25 min',
      url: 'https://youtu.be/7p1KBGZSX9g',
      thumbnail: '/api/placeholder/400/225',
    },
    {
      id: '3',
      title: 'IA na Advocacia',
      description:
        'Aplicações práticas da IA no dia a dia da advocacia e como implementar essas tecnologias.',
      duration: '30 min',
      url: 'https://youtu.be/eAvpJGB9edc',
      thumbnail: '/api/placeholder/400/225',
    },
  ];

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
    return (completedVideos.size / videos.length) * 100;
  }, [completedVideos.size]);

  const selectVideo = useCallback((video: Video) => {
    setCurrentVideo(video);
  }, []);

  const getCurrentVideo = useCallback((): Video => {
    return (
      currentVideo ||
      videos[0] || {
        id: '1',
        title: 'Aula de Boas-vindas',
        description: 'Introdução ao curso',
        duration: '15 min',
        url: 'https://youtu.be/FOP4CmVCxFQ',
        thumbnail: '/api/placeholder/400/225',
      }
    );
  }, [currentVideo, videos]);

  return {
    videos,
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
