import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Play,
  Clock,
  CheckCircle,
  ArrowLeft,
  Brain,
  Scale,
  Users,
  Sparkles,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Link } from 'wouter';
import { useAcademyModel } from './model';
import { VIDEOS } from './contants';
import { Video } from './model';

export function AcademyView(props: ReturnType<typeof useAcademyModel>) {
  const {
    completedVideos,
    isLoading,
    error,
    selectVideo,
    getProgressPercentage,
    getCurrentVideo,
  } = props;

  const progressPercentage = getProgressPercentage();
  const currentVideo = getCurrentVideo();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando Academy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">Erro ao carregar a Academy</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/capture"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Partnership Badge */}
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-purple-100/80 text-purple-700 border-purple-200 rounded-full text-xs sm:text-sm font-medium"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                OAB e EliaAI juntos
              </Badge>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-8">
              {/* EliaAI Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">EliaAI</span>
              </div>

              <div className="w-px h-8 sm:h-10 bg-gray-300"></div>

              {/* OAB Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-200">
                  <img
                    src="/oab-logo.png"
                    alt="OAB"
                    className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">OAB</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Video Player Section */}
      <section className="py-2 sm:py-4 lg:py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                Trial 30 Dias - Academia Elia
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Aprenda a usar todos os agentes da plataforma Elia com nossa playlist completa "Trial 30 Dias".
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Video Player - Left Side */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                  <div className="aspect-video">
                    <iframe
                      src={currentVideo.url.replace('youtu.be/', 'youtube.com/embed/')}
                      title={currentVideo.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {currentVideo.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
              </div>

              {/* Lessons List - Right Side */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Trial 30 Dias - Tutoriais
                    </h3>
                    <p className="text-sm text-gray-600">
                      {completedVideos.size} de {VIDEOS.length} tutoriais concluídos
                    </p>
                  </div>

                  <div className="p-4 space-y-2">
                    {VIDEOS.map((video: Video, index: number) => (
                      <div
                        key={video.id}
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border ${currentVideo.id === video.id
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-transparent hover:border-purple-200'
                          }`}
                        onClick={() => selectVideo(video)}
                      >
                        {/* Lesson Number */}
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-purple-600">
                            {index + 1}
                          </span>
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{video.duration}</span>
                            {completedVideos.has(video.id) && (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                        </div>

                        {/* Play Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-shrink-0"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              Playlist Gratuita - Trial 30 Dias
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
              Academy de{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">
                Inteligência Artificial
              </span>{' '}
              na Advocacia
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto">
              Aprenda a usar todos os agentes da plataforma Elia com nossa playlist completa de tutoriais.
              Playlist "Trial 30 Dias" com 12 vídeos práticos e gratuitos.
            </p>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Seu Progresso na Playlist
                </h3>
                <span className="text-sm sm:text-base text-gray-600">
                  {completedVideos.size} de {VIDEOS.length} tutoriais concluídos
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {progressPercentage === 100
                  ? '🎉 Parabéns! Você completou a playlist!'
                  : `${Math.round(progressPercentage)}% concluído`
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                O que você vai aprender na playlist "Trial 30 Dias"
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Conhecimentos práticos para usar todos os agentes da plataforma Elia desde o primeiro dia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                    Agentes Especializados
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Conheça todos os agentes da plataforma Elia e suas funcionalidades específicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                    Aplicações Práticas
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Aprenda a usar cada agente para otimizar seu trabalho e aumentar a produtividade.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                    Implementação Imediata
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Aprenda a implementar e usar todos os agentes da plataforma Elia imediatamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Scale />

              <p className="text-sidebar-accent-foreground leading-relaxed">
                A primeira plataforma de agentes de IA especializados em Direito, desenvolvida para
                revolucionar a prática jurídica brasileira.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Agentes IA</h3>
              <ul className="space-y-3 text-sidebar-accent-foreground">
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Diagnóstico de Caso Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Analista de Tese Processual
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Promptador Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Consultor de Atendimento Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Especialista em Contratos
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Suporte</h3>
              <ul className="space-y-3 text-sidebar-accent-foreground">
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Tutoriais
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Status da Plataforma
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Contato</h3>
              <div className="space-y-4 text-sidebar-accent-foreground">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-sidebar-primary" />
                  <a
                    href="mailto:eliaescolaadv@gmail.com"
                    className="hover:text-sidebar-primary transition-colors"
                  >
                    eliaescolaadv@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-sidebar-primary" />
                  <a
                    href="tel:+5511913337009"
                    className="hover:text-sidebar-primary transition-colors"
                  >
                    (11) 91333-7009
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-sidebar-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sidebar-accent-foreground/70 text-sm">
                © 2024 EliaAI. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Política de Privacidade
                </a>
                <a
                  href="#"
                  className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Termos de Uso
                </a>
                <a
                  href="#"
                  className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  LGPD
                </a>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sidebar-accent-foreground/50 text-xs">
                Plataforma desenvolvida por advogados, para advogados. Tecnologia GPT-4 com
                especialização jurídica.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
