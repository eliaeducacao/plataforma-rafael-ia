import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Check, Shield } from "lucide-react";

const PricingSection = () => {
  const features = [
    "8 agentes especializados",
    "Treinamentos práticos",
    "Atualizações contínuas",
    "Suporte prioritário",
    "Acesso completo à plataforma",
    "Sem limite de uso"
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
            Invista no seu escritório com inteligência artificial
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12 space-y-6 lg:mb-16">
          <Card className="relative border-2 border-primary">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs sm:text-sm">
                Mais Popular
              </Badge>
            </div>

            <CardHeader className="text-center pt-6 sm:pt-8 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                Plano Completo
              </CardTitle>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                    R$ 197<span className="text-lg sm:text-xl text-muted-foreground">/mês</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Acesso completo aos 8 agentes especializados, treinamentos práticos e atualizações contínuas.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full text-base sm:text-lg">
                Começar Teste Grátis
              </Button>
            </CardContent>
          </Card>

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

export default PricingSection;