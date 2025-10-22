import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Check, Clock, Shield, Zap } from "lucide-react";

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
            Invista no seu escritório por menos que 4 horas de um advogado júnior
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
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs sm:text-sm w-fit mx-auto sm:mx-0">
                    -85% vs advogado júnior
                  </Badge>
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

        <div className="max-w-3xl mx-auto">
          <Card className="p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                A matemática é clara
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Todo dia que você gasta 4 horas formatando petição é um dia que você poderia estar fechando um novo cliente.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                </div>
                <h4 className="font-medium text-foreground text-sm sm:text-base">Sem Elia</h4>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-bold text-destructive">4 horas</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">para formatar petição</p>
                </div>
              </div>

              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-foreground text-sm sm:text-base">Com Elia</h4>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-bold text-green-600">15 minutos</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">para petição completa</p>
                </div>
              </div>

              <div className="text-center space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm sm:text-base">Resultado</h4>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-bold text-primary">3h45min</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">para fechar novos clientes</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8 p-3 sm:p-4 bg-muted/30 rounded-lg">
              <p className="font-medium text-foreground text-sm sm:text-base">
                Quanto mais você espera, mais dinheiro você deixa na mesa.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;