import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Check, Shield, Clock, Zap } from "lucide-react";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 lg:w-5xl mx-auto">
            Invista no seu escritório por menos que 4 horas de um advogado júnior
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="relative border-2 border-primary">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Mais Popular
              </Badge>
            </div>

            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-semibold text-foreground mb-4">
                Plano Completo
              </CardTitle>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-primary">
                  R$ 197<span className="text-xl text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground">
                  Acesso completo aos 8 agentes especializados, treinamentos práticos e atualizações contínuas.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full">
                Começar Teste Grátis
              </Button>

              <div className="bg-green-50/50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      7 dias para testar. Se não servir pra você, devolvemos 100%.
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Sem condições. Sem perguntas. Sem burocracia.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                A matemática é clara
              </h3>
              <p className="text-muted-foreground">
                Todo dia que você gasta 4 horas formatando petição é um dia que você poderia estar fechando um novo cliente.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-destructive" />
                </div>
                <h4 className="font-medium text-foreground">Sem Elia</h4>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-destructive">4 horas</p>
                  <p className="text-sm text-muted-foreground">para formatar petição</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-foreground">Com Elia</h4>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-green-600">15 minutos</p>
                  <p className="text-sm text-muted-foreground">para petição completa</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground">Resultado</h4>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-primary">3h45min</p>
                  <p className="text-sm text-muted-foreground">para fechar novos clientes</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-4 bg-muted/30 rounded-lg">
              <p className="font-medium text-foreground">
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