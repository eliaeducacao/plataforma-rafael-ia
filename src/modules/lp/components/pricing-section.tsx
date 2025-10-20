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
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Invista no seu escritório por menos que 4 horas de um advogado júnior
          </h2>
        </div>

        {/* Card de Preço Principal */}
        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden border-2 border-primary shadow-2xl">
            {/* Badge de Destaque */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-bl-lg">
              <Badge variant="secondary" className="bg-primary-foreground text-primary">
                Mais Popular
              </Badge>
            </div>

            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-bold text-foreground mb-4">
                Plano Completo
              </CardTitle>

              {/* Preço */}
              <div className="space-y-2">
                <div className="text-6xl font-bold text-primary">
                  R$ 197<span className="text-2xl text-muted-foreground">/mês</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Acesso completo aos 8 agentes especializados, treinamentos práticos e atualizações contínuas.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Botão CTA */}
              <Button size="lg" className="w-full text-lg py-6">
                Começar Teste Grátis
              </Button>

              {/* Garantia */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-800">
                    7 dias para testar. Se não servir pra você, devolvemos 100%.
                  </h4>
                </div>
                <p className="text-green-700 mb-2">
                  Experimente com seus casos, seus clientes, sua rotina. Se por qualquer motivo não for pra você, devolvemos integralmente.
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Sem condições. Sem perguntas. Sem burocracia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparação de Valor */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                A matemática é clara
              </h3>
              <p className="text-lg text-muted-foreground">
                Todo dia que você gasta 4 horas formatando petição é um dia que você poderia estar fechando um novo cliente.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-foreground">Sem Elia</h4>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-red-600">4 horas</p>
                  <p className="text-sm text-muted-foreground">para formatar petição</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-foreground">Com Elia</h4>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">15 minutos</p>
                  <p className="text-sm text-muted-foreground">para petição completa</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Resultado</h4>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">3h45min</p>
                  <p className="text-sm text-muted-foreground">para fechar novos clientes</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-primary/5 rounded-lg">
              <p className="text-lg font-semibold text-foreground">
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