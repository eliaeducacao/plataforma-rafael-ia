import { Card } from "@/shared/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ScrollAnimated } from "@/shared/components/scroll-animated";

export default function PerformanceSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollAnimated animationType="scroll-txt">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Performance em Documentos Jurídicos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tempo médio para gerar uma petição inicial completa
            </p>
          </div>
        </ScrollAnimated>

        <ScrollAnimated animationType="scroll-bottom" delay={200}>
          <div className="w-full">
            <Card className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
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
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-24 lg:w-32 text-xs sm:text-sm font-medium text-foreground">Elia</div>
                      <div className="flex-1 relative">
                        <div className="h-6 sm:h-8 bg-primary rounded-full flex items-center justify-end pr-2 sm:pr-4">
                          <span className="text-primary-foreground text-xs sm:text-sm font-bold">15 min</span>
                        </div>
                      </div>
                    </div>

                    {/* ChatGPT */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-24 lg:w-32 text-xs sm:text-sm font-medium text-foreground">ChatGPT</div>
                      <div className="flex-1 relative">
                        <div className="h-6 sm:h-8 bg-muted rounded-full flex items-center justify-end pr-2 sm:pr-4" style={{ width: '60%' }}>
                          <span className="text-muted-foreground text-xs sm:text-sm font-bold">2h 15min</span>
                        </div>
                      </div>
                    </div>

                    {/* Claude */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-24 lg:w-32 text-xs sm:text-sm font-medium text-foreground">Claude</div>
                      <div className="flex-1 relative">
                        <div className="h-6 sm:h-8 bg-muted rounded-full flex items-center justify-end pr-2 sm:pr-4" style={{ width: '50%' }}>
                          <span className="text-muted-foreground text-xs sm:text-sm font-bold">2h</span>
                        </div>
                      </div>
                    </div>

                    {/* Advogado Júnior */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-24 lg:w-32 text-xs sm:text-sm font-medium text-foreground">Advogado Júnior</div>
                      <div className="flex-1 relative">
                        <div className="h-6 sm:h-8 bg-muted rounded-full flex items-center justify-end pr-2 sm:pr-4" style={{ width: '25%' }}>
                          <span className="text-muted-foreground text-xs sm:text-sm font-bold">4h</span>
                        </div>
                      </div>
                    </div>

                    {/* Advogado Sênior */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-24 lg:w-32 text-xs sm:text-sm font-medium text-foreground">Advogado Sênior</div>
                      <div className="flex-1 relative">
                        <div className="h-6 sm:h-8 bg-muted rounded-full flex items-center justify-end pr-2 sm:pr-4" style={{ width: '20%' }}>
                          <span className="text-muted-foreground text-xs sm:text-sm font-bold">6h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span>Baseado em testes reais com 100+ petições de diferentes áreas do Direito</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
}