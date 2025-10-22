import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowRight, Shield } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Pronto para revolucionar seu escritório?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha a opção que melhor se adapta ao seu ritmo e comece a ver resultados desde o primeiro dia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center justify-center gap-3">

                  <h3 className="text-xl font-semibold text-foreground">
                    Teste Grátis
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Se você quer testar a Elia no seu ritmo, sem compromisso:
                  </p>

                  <Button size="lg" className="w-full">
                    Experimente 7 dias grátis
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Sem cartão. Sem pegadinha.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Cancela quando quiser.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Acesso completo à plataforma</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    Demonstração
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Se você quer ver como a Elia resolve o seu caso específico antes de testar:
                  </p>

                  <Button variant="outline" size="lg" className="w-full">
                    Agende sua demonstração
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>30 minutos personalizados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>A gente mostra, você decide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Casos específicos da sua área</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <p className="text-lg font-medium text-foreground mb-2">
              Todo dia que você gasta 4 horas formatando petição é um dia que você poderia estar fechando um novo cliente.
            </p>
            <p className="text-muted-foreground">
              A matemática é clara: quanto mais você espera, mais dinheiro você deixa na mesa.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-foreground">
              Garantia de 7 dias - 100% do dinheiro de volta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;