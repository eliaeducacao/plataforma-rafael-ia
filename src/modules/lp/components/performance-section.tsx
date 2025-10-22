import { Card } from "@/shared/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function PerformanceSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Performance em Documentos Jurídicos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tempo médio para gerar uma petição inicial completa
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8">
            <div className="grid lg:grid-cols-4 gap-8 items-center">
              {/* Stats Left */}
              <div className="lg:col-span-1 space-y-6">
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">
                    9x
                  </div>
                  <div className="text-muted-foreground text-sm">mais rápido que ChatGPT</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">
                    8x
                  </div>
                  <div className="text-muted-foreground text-sm">mais rápido que Claude</div>
                </div>
              </div>

              {/* Chart Right */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {/* Elia */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 text-sm font-medium text-foreground">Elia</div>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-primary rounded-full flex items-center justify-end pr-4">
                        <span className="text-primary-foreground text-sm font-bold">15 min</span>
                      </div>
                    </div>
                  </div>

                  {/* ChatGPT */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 text-sm font-medium text-foreground">ChatGPT</div>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-muted rounded-full flex items-center justify-end pr-4" style={{ width: '60%' }}>
                        <span className="text-muted-foreground text-sm font-bold">2h 15min</span>
                      </div>
                    </div>
                  </div>

                  {/* Claude */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 text-sm font-medium text-foreground">Claude</div>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-muted rounded-full flex items-center justify-end pr-4" style={{ width: '50%' }}>
                        <span className="text-muted-foreground text-sm font-bold">2h</span>
                      </div>
                    </div>
                  </div>

                  {/* Advogado Júnior */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 text-sm font-medium text-foreground">Advogado Júnior</div>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-muted rounded-full flex items-center justify-end pr-4" style={{ width: '25%' }}>
                        <span className="text-muted-foreground text-sm font-bold">4h</span>
                      </div>
                    </div>
                  </div>

                  {/* Advogado Sênior */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 text-sm font-medium text-foreground">Advogado Sênior</div>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-muted rounded-full flex items-center justify-end pr-4" style={{ width: '20%' }}>
                        <span className="text-muted-foreground text-sm font-bold">6h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span>Baseado em testes reais com 100+ petições de diferentes áreas do Direito</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}