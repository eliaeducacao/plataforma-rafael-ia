import { Button } from '@/shared/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/80 to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-justice opacity-10"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            Acesso Exclusivo para Advogados
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Está pronto para advogar com
            <span className="block text-primary-foreground/80">mais inteligência?</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-xl text-primary-foreground mb-8 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Acesse agora a biblioteca de agentes jurídicos e leve sua advocacia para o futuro.
            Junte-se aos advogados que já revolucionaram sua prática com IA especializada.
          </p>

          {/* Benefits List */}
          <div
            className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center justify-center text-primary-foreground">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>Setup em 5 minutos</span>
            </div>
            <div className="flex items-center justify-center text-primary-foreground">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>7 dias grátis</span>
            </div>
            <div className="flex items-center justify-center text-primary-foreground">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>Cancele quando quiser</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button size="lg" variant="secondary" className="px-8 py-4 text-md font-semibold group">
              Criar Minha Conta Grátis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-md font-semibold">
              Agendar Demonstração
            </Button>
          </div>

          {/* Security Note */}
          <p
            className="text-primary-foreground text-sm animate-slide-up"
            style={{ animationDelay: '0.8s' }}
          >
            🔒 Dados protegidos por criptografia de ponta a ponta
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
