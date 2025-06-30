import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Bot, MessageSquare, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-justice opacity-5"></div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Column - Content */}
          <div className="flex-1 text-center lg:text-left mt-10">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />A Revolução da Advocacia 5.0
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              A otimização da sua
              <span className="text-primary"> rotina jurídica </span>
              começa aqui
            </h1>

            <p
              className="text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              Uma biblioteca de agentes de inteligência artificial especializados em Direito, pronta
              para acelerar sua prática jurídica e otimizar a eficiência processual.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <Button size="lg" className="px-8 py-4 text-lg group text-primary-foreground">
                Acessar Biblioteca Jurídica de IA
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg text-foreground hover:text-foreground"
              >
                Ver Demonstração
              </Button> */}
            </div>

            <div
              className="flex items-center justify-center lg:justify-start text-sm text-muted-foreground animate-slide-up"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Acesso Seguro 24/7
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="flex-1 relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-8 animate-scale-in">
              {/* Mock Chat Interface */}
              <div className="bg-card rounded-lg shadow-lg p-6 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Bot className="w-6 h-6 text-primary mr-2 mt-1" />
                    <div className="bg-muted rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-foreground">
                        Olá! Sou o Diagnóstico de Caso Jurídico. Descreva sua situação que vou analisar a área do Direito e possíveis teses.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Cliente bateu o carro no semáforo e quer me processar por negligência na manutenção</p>
                    </div>
                    <MessageSquare className="w-6 h-6 text-muted-foreground ml-2 mt-1" />
                  </div>
                  <div className="flex items-start">
                    <Bot className="w-6 h-6 text-primary mr-2 mt-1" />
                    <div className="bg-muted rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-foreground">
                        <strong>Área:</strong> Direito Civil - Responsabilidade Civil<br />
                        <strong>Tese:</strong> Análise de nexo causal e excludentes de responsabilidade...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Agent Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-lg shadow-lg p-3 animate-pulse">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">6 Agentes Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
