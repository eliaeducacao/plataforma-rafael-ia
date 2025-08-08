import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Loader2,
  CheckCircle,
  Brain,
  Scale,
  Users,
  FileText,
  Building,
  Calculator,
  Heart,
  Home,
  Star,
  Play,
  TrendingUp,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export function CaptureView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Configure o webhook do n8n
      const webhookUrl =
        process.env.VITE_N8N_WEBHOOK_URL ||
        'https://your-n8n-instance.com/webhook/capture-oab-rondonia';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: 'landing-page-oab-rondonia',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Cadastro realizado com sucesso!');
        reset();
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      toast.error('Erro ao enviar formulário. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const legalAreas = [
    { icon: Scale, name: 'Direito Civil' },
    { icon: Users, name: 'Direito do Consumidor' },
    { icon: Building, name: 'Direito do Trabalho' },
    { icon: FileText, name: 'Direito Penal' },
    { icon: Building, name: 'Direito Empresarial' },
    { icon: Calculator, name: 'Direito Tributário' },
    { icon: Heart, name: 'Direito Previdenciário' },
    { icon: Home, name: 'Direito de Família e Sucessões' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            {/* Partnership Badge */}
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-purple-100/80 text-purple-700 border-purple-200 rounded-full text-xs sm:text-sm font-medium"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                OAB Rondônia e EliaAI juntos
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

              {/* OAB Rondônia Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-200">
                  <img
                    src="/oabro-logo.png"
                    alt="OAB Rondônia"
                    className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">OAB Rondônia</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 touch-manipulation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Mobile Form - Visible only on mobile */}
          <div className="lg:hidden mb-8">
            <div className="w-full max-w-sm mx-auto">
              <Card className="shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2 pb-4 px-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {isSubmitted ? 'Cadastro Realizado!' : 'Acesse Seu Teste Gratuito'}
                  </CardTitle>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {isSubmitted
                      ? 'Em breve você receberá as instruções de acesso por email.'
                      : 'Preencha seus dados e comece a usar IA na advocacia hoje mesmo'}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 px-4 pb-4">
                  {isSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      </div>
                      <p className="text-base font-semibold mb-2 text-gray-900">
                        Obrigado pelo seu interesse!
                      </p>
                      <p className="text-sm text-gray-600">
                        Verifique seu email para acessar a plataforma
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Nome Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="name-mobile"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nome completo <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="name-mobile"
                          placeholder="Seu nome completo"
                          className="h-11 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                          {...register('name', {
                            required: 'Nome é obrigatório',
                            minLength: {
                              value: 2,
                              message: 'Nome deve ter pelo menos 2 caracteres',
                            },
                          })}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email-mobile"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email profissional <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="email-mobile"
                          type="email"
                          placeholder="seu@email.com"
                          className="h-11 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                          {...register('email', {
                            required: 'Email é obrigatório',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email inválido',
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone-mobile"
                          className="text-sm font-medium text-gray-700"
                        >
                          Telefone <span className="text-purple-500">*</span>
                        </Label>
                        <Input
                          id="phone-mobile"
                          placeholder="(11) 99999-9999"
                          className="h-11 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                          {...register('phone', {
                            required: 'Telefone é obrigatório',
                            pattern: {
                              value: /^[\d\s()\-+]+$/,
                              message: 'Formato de telefone inválido',
                            },
                          })}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              Iniciar Teste Gratuito
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Terms */}
                      <p className="text-xs text-gray-500 text-center leading-relaxed pt-2">
                        Ao se cadastrar, você concorda com nossos{' '}
                        <a href="#" className="text-purple-600 hover:underline transition-colors font-medium">
                          Termos de Uso
                        </a>{' '}
                        e{' '}
                        <a href="#" className="text-purple-600 hover:underline transition-colors font-medium">
                          Política de Privacidade
                        </a>
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-col lg:grid-cols-12 gap-8 lg:gap-16 min-h-[calc(100vh-12rem)]">
            {/* Content Side */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Main Title */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900">
                  <span className="text-purple-600">E</span>xplore os{' '}
                  <span className="text-purple-600">L</span>imites da{' '}
                  <span className="text-purple-600">I</span>nteligência{' '}
                  <span className="text-purple-600">A</span>rtificial na{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">Advocacia</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Inteligência Artificial desenvolvida para atender o universo jurídico
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 sm:space-y-4 bg-white/70 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    <span className="font-medium">Teste gratuito</span> por 30 dias
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    <span className="font-medium">Agentes especializados</span> em Direito
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    <span className="font-medium">Tutorial prático</span> incluso
                  </span>
                </div>
              </div>
            </div>

            {/* Form Side - Desktop Only */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-start lg:items-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <Card className="shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center space-y-2 pb-4 px-4 sm:px-6">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      {isSubmitted ? 'Cadastro Realizado!' : 'Acesse Seu Teste Gratuito'}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {isSubmitted
                        ? 'Em breve você receberá as instruções de acesso por email.'
                        : 'Preencha seus dados e comece a usar IA na advocacia hoje mesmo'}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                    {isSubmitted ? (
                      <div className="text-center py-6 sm:py-8">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                        </div>
                        <p className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                          Obrigado pelo seu interesse!
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          Verifique seu email para acessar a plataforma
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                        {/* Nome Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="name-desktop"
                            className="text-sm font-medium text-gray-700"
                          >
                            Nome completo <span className="text-purple-500">*</span>
                          </Label>
                          <Input
                            id="name-desktop"
                            placeholder="Seu nome completo"
                            className="h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            {...register('name', {
                              required: 'Nome é obrigatório',
                              minLength: {
                                value: 2,
                                message: 'Nome deve ter pelo menos 2 caracteres',
                              },
                            })}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="email-desktop"
                            className="text-sm font-medium text-gray-700"
                          >
                            Email profissional <span className="text-purple-500">*</span>
                          </Label>
                          <Input
                            id="email-desktop"
                            type="email"
                            placeholder="seu@email.com"
                            className="h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            {...register('email', {
                              required: 'Email é obrigatório',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido',
                              },
                            })}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone-desktop"
                            className="text-sm font-medium text-gray-700"
                          >
                            Telefone <span className="text-purple-500">*</span>
                          </Label>
                          <Input
                            id="phone-desktop"
                            placeholder="(11) 99999-9999"
                            className="h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            {...register('phone', {
                              required: 'Telefone é obrigatório',
                              pattern: {
                                value: /^[\d\s()\-+]+$/,
                                message: 'Formato de telefone inválido',
                              },
                            })}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                Iniciar Teste Gratuito
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Terms */}
                        <p className="text-xs text-gray-500 text-center leading-relaxed pt-2">
                          Ao se cadastrar, você concorda com nossos{' '}
                          <a href="#" className="text-purple-600 hover:underline transition-colors font-medium">
                            Termos de Uso
                          </a>{' '}
                          e{' '}
                          <a href="#" className="text-purple-600 hover:underline transition-colors font-medium">
                            Política de Privacidade
                          </a>
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Mobile Content - Visible only on mobile */}
          <div className="lg:hidden">
            <div className="flex flex-col justify-center space-y-6">
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-[1.05] tracking-tight text-gray-900">
                  <span className="text-purple-600">E</span>xplore os{' '}
                  <span className="text-purple-600">L</span>imites da{' '}
                  <span className="text-purple-600">I</span>nteligência{' '}
                  <span className="text-purple-600">A</span>rtificial na{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">Advocacia</span>
                </h1>

                <p className="text-base text-gray-600 leading-relaxed">
                  Inteligência Artificial desenvolvida para atender o universo jurídico
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Teste gratuito</span> por 30 dias
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Agentes especializados</span> em Direito
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Tutorial prático</span> incluso
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5" />O poder da IA Jurídica ao alcance de quem
                advoga
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 leading-tight px-4">
                Agentes de IA especializados em Direito
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
                Treinados para entregar respostas de alta qualidade, com base em critérios objetivos
                do que é considerado uma boa entrega jurídica.
              </p>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 lg:mb-20 border border-gray-100 mx-4 sm:mx-0">
              <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  Cada agente foi cuidadosamente configurado com instruções específicas sobre
                  estrutura, linguagem e escopo de atuação, utilizando como referência modelos reais
                  de peças e interações jurídicas bem elaboradas.
                </p>

                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  O resultado são respostas tecnicamente sólidas, claras e alinhadas à prática
                  profissional de advogados e escritórios de advocacia, sempre em conformidade com
                  as normas da OAB.
                </p>
              </div>
            </div>

            {/* Legal Areas */}
            <div className="mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center text-gray-900">
                Atendem a diferentes áreas do Direito:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {legalAreas.map((area, index) => {
                  const IconComponent = area.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-purple-200 transition-colors">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base font-medium text-center text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                        {area.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tutorial Section */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white mx-4 sm:mx-0">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                  Tutorial prático incluso sobre:
                </h3>
                <p className="text-purple-100 text-sm sm:text-base lg:text-lg">
                  Aprenda a usar IA na advocacia com nosso guia completo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1">
                        O que é IA Generativa?
                      </h4>
                      <p className="text-purple-100 text-xs sm:text-sm">
                        Fundamentos e conceitos básicos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1">IA na Advocacia</h4>
                      <p className="text-purple-100 text-xs sm:text-sm">
                        Aplicações práticas no dia a dia
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1">
                        Engenharia de Prompts
                      </h4>
                      <p className="text-purple-100 text-xs sm:text-sm">
                        Como criar comandos eficazes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1">
                        Como usar a Plataforma da Elia
                      </h4>
                      <p className="text-purple-100 text-xs sm:text-sm">
                        Guia completo da ferramenta
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900 leading-tight px-4">
                Seu próximo passo em relação à{' '}
                <span className="text-purple-600">produtividade e eficiência</span> com uso de IA
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Acompanhamento da Jornada de Ponta a Ponta
              </p>
            </div>

            {/* Testimonials and Proof */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0">
              {/* Testimonial Card */}
              <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm sm:text-base lg:text-lg italic text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                    "A plataforma da Elia revolucionou minha prática jurídica. Os agentes de IA são
                    incrivelmente precisos e me poupam horas de trabalho diariamente. É
                    impressionante como a qualidade das minhas peças melhorou."
                  </blockquote>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-lg sm:text-xl">M</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-base sm:text-lg text-gray-900">Dra. Mel</p>
                      <p className="text-sm sm:text-base text-gray-600">Advogada Especialista</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-purple-600 font-medium">
                          OAB/SP 123.456
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 sm:gap-3 text-purple-600 hover:text-purple-700 transition-colors font-medium group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="underline text-sm sm:text-base">Ver depoimento completo</span>
                  </button>
                </CardContent>
              </Card>

              {/* Efficiency Proof Card */}
              <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                        Eficiência Comprovada
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                        Resultados medidos em centenas de casos
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
                          Redução no tempo de pesquisa
                        </span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                          75%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-green-500 h-1.5 sm:h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
                          Melhoria na qualidade das peças
                        </span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                          85%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-blue-500 h-1.5 sm:h-2 rounded-full w-[85%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
                          Aumento da produtividade
                        </span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">
                          90%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-purple-500 h-1.5 sm:h-2 rounded-full w-[90%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 sm:gap-3 text-purple-600 hover:text-purple-700 transition-colors font-medium mt-6 sm:mt-8">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="underline text-sm sm:text-base">Ver estudo completo</span>
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Final CTA */}
            <div className="relative px-4 sm:px-0">
              <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
                <div className="max-w-5xl mx-auto text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                    Não perca essa oportunidade única
                  </h3>

                  <p className="text-sm sm:text-base lg:text-xl text-purple-100 mb-8 sm:mb-10 leading-relaxed">
                    Parceria exclusiva entre OAB Rondônia e Elia Educação.
                    <br className="hidden sm:block" />
                    Acesso antecipado à tecnologia que está transformando a advocacia.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-4">
                        <Users className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <p className="font-semibold text-base sm:text-base lg:text-lg mb-2 sm:mb-1 text-center">
                        +500 advogados
                      </p>
                      <p className="text-purple-100 text-sm sm:text-sm text-center">
                        já utilizam a plataforma
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-4">
                        <Clock className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <p className="font-semibold text-base sm:text-base lg:text-lg mb-2 sm:mb-1 text-center">
                        Resultados em 24h
                      </p>
                      <p className="text-purple-100 text-sm sm:text-sm text-center">
                        primeiros resultados práticos
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-4">
                        <Award className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <p className="font-semibold text-base sm:text-base lg:text-lg mb-2 sm:mb-1 text-center">
                        Suporte OAB
                      </p>
                      <p className="text-purple-100 text-sm sm:text-sm text-center">
                        apoio oficial da ordem
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <Button
                      size="lg"
                      className="sm:w-auto bg-white text-purple-700 hover:bg-gray-100 text-xs sm:text-base lg:text-xl font-semibold px-4 sm:px-8 lg:px-12 py-4 sm:py-4 lg:py-6 h-auto rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Começar Teste Gratuito Agora
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </Button>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-sm text-purple-100">
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-green-400 text-base">✓</span> 30 dias grátis
                      </span>
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-green-400 text-base">✓</span> Sem compromisso
                      </span>
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-green-400 text-base">✓</span> Suporte completo
                      </span>
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-green-400 text-base">✓</span> Cancele quando quiser
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Tradutor Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Pesquisador de Jurisprudência
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Modelador de Petições Jurídicas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Revisor Jurídico
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-primary transition-colors">
                    Marketing Jurídico
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
                © 2024 AdvocacIA. Todos os direitos reservados.
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
