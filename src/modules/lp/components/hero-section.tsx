import { Button } from "@/shared/components/ui/button";
import { Play, Scale } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 lg:py-30 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            {/* Título Principal */}
            <div className="space-y-6">
              <h1
                className="font-bold text-foreground leading-tight"
                style={{
                  fontSize: 'clamp(1.875rem, 4vw, 3.75rem)',
                  lineHeight: '1.1'
                }}
              >
                <span className="text-primary">Cliente paga resultado,</span>
                <br />
                não hora trabalhada.
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Elia é a única plataforma com agentes de IA treinados para o fluxo completo do advogado brasileiro — do diagnóstico com o cliente até a petição final.
              </p>
            </div>

            {/* Botões CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Experimente 7 dias grátis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Agende sua demonstração
              </Button>
            </div>

            {/* Texto de apoio */}
            <div className="text-sm text-muted-foreground">
              <p>Sem cartão. Sem pegadinha. Cancela quando quiser.</p>
              <p>30 minutos. A gente mostra, você decide.</p>
            </div>
          </div>

          {/* Área do Vídeo */}
          <div>
            <div className="relative">
              {/* Logo da Elia no topo direito do vídeo */}
              <div className="absolute -top-6 -right-6 z-20">
                <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg shadow-lg border">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <Scale className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-primary">Elia</span>
                </div>
              </div>

              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground ml-1" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base sm:text-lg font-medium">Vídeo de Demonstração</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Veja como a Elia funciona na prática
                    </p>
                  </div>
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