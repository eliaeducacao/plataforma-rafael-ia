import { Link } from 'wouter';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { PhoneInputMask } from '@/shared/components/ui/phone-input-mask';

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
import { useCaptureModel } from './model';


export function CaptureView(props: ReturnType<typeof useCaptureModel>) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitted,
    isSubmitting,
    onSubmit,
    setValue,
  } = props;

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
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Single Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-[calc(100vh-12rem)] items-center">

            {/* Content Side */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center space-y-4  sm:space-y-8 lg:space-y-10">
              {/* Main Title */}
              <div className="text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Transforme sua Advocacia com
                  <span className="block text-purple-600 mt-1 lg:mt-2">
                    Inteligência Artificial
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md sm:max-w-2xl mx-auto lg:mx-0">
                  Descubra como a IA pode revolucionar sua prática jurídica e aumentar sua produtividade de forma ética e eficiente
                </p>
              </div>

              {/* Benefits Grid - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
                {[
                  { icon: Brain, text: 'IA Especializada em Direito' },
                  { icon: TrendingUp, text: 'Aumente sua Produtividade' },
                  { icon: Clock, text: 'Economize Tempo Valioso' },
                  { icon: Award, text: 'Mantenha a Excelência' },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-white/50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Legal Areas - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Especializado em todas as áreas do Direito:
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 max-w-2xl">
                  {legalAreas.map((area, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 text-gray-700 border-gray-200 text-xs sm:text-sm"
                    >
                      <area.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      {area.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-sm lg:max-w-md">
                <Card className="border-0 shadow-xl lg:shadow-2xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center pb-2 p-4 lg:p-6">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      {isSubmitted ? 'Cadastro Realizado!' : 'Acesse Seu Teste Gratuito'}
                    </CardTitle>
                    <p className="text-sm sm:text-base text-gray-600">
                      {isSubmitted
                        ? 'Curso com 3 vídeos sobre IA na Advocacia'
                        : 'Preencha os dados abaixo para começar'}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-2 p-4 lg:p-6">
                    {isSubmitted ? (
                      <div className="text-center space-y-4 lg:space-y-6">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                            Curso com 3 vídeos sobre IA na Advocacia
                          </p>
                        </div>
                        <div>
                          <Link href="/academy">
                            <Button className="w-full h-12 text-sm lg:text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                              Acessar Academy
                              <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off" noValidate>
                        {/* Nome Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                          >
                            Nome completo <span className="text-purple-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Seu nome completo"
                            className="h-11 text-sm lg:text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            autoComplete="off"
                            {...register('name')}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                          >
                            Email profissional <span className="text-purple-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="h-11 text-sm lg:text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            autoComplete="off"
                            {...register('email')}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Telefone <span className="text-purple-500">*</span>
                          </Label>
                          <PhoneInputMask
                            id="phone"
                            placeholder="(11) 99999-9999"
                            className="h-11 text-sm lg:text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                            autoComplete="off"
                            {...register('phone')}
                            onAccept={(value) => setValue('phone', value)}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <Button
                            type="submit"
                            className="w-full h-12 text-sm lg:text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
                                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same... */}
      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                Por que escolher a EliaAI?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Nossa plataforma foi desenvolvida especificamente para advogados brasileiros
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Brain,
                  title: 'IA Especializada',
                  description: 'Treinada especificamente para o direito brasileiro, com conhecimento das leis e jurisprudências mais atuais.'
                },
                {
                  icon: Scale,
                  title: 'Conformidade Ética',
                  description: 'Desenvolvida seguindo as diretrizes da OAB, garantindo que sua prática permaneça ética e profissional.'
                },
                {
                  icon: TrendingUp,
                  title: 'Aumento de Produtividade',
                  description: 'Automatize tarefas repetitivas e foque no que realmente importa: seus clientes e casos complexos.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Company Info */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold">EliaAI</span>
                </div>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                  Transformando a advocacia brasileira com inteligência artificial ética e especializada.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contato</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <span className="text-sm sm:text-base text-gray-400">contato@eliaai.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <span className="text-sm sm:text-base text-gray-400">(11) 9999-9999</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-400">
                © 2024 EliaAI. Todos os direitos reservados. Em parceria com OAB Rondônia.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
