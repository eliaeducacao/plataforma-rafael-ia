import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

const BenefitsSection = () => {
  const pillars = [
    {
      icon: CheckCircle,
      title: "Fluxo Jurídico Completo Automatizado",
      description: "8 agentes especializados cobrindo: diagnóstico, tese, atendimento, contratos, jurisprudência, petição inicial, revisão e petição incidental. Do primeiro contato com o cliente à peça final.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      title: "Implementação Garantida em 15 Minutos",
      description: "Treinamentos práticos que ensinam exatamente como usar cada agente no seu dia a dia. Não é teoria — é \"clique aqui, faça isso, receba aquilo\".",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Evolução Contínua da Plataforma",
      description: "Melhorias regulares baseadas no feedback de advogados que usam Elia no dia a dia. Sua ferramenta sempre fica mais inteligente.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4">
            O que você ganha ao assinar
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-4">
            Três pilares para você implementar IA no seu escritório e ver resultados desde as primeiras horas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 lg:mb-16">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="p-0 mb-0">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 ${pillar.bgColor} rounded-lg`}>
                    <pillar.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-foreground leading-tight">
                      {pillar.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-3 sm:mt-4 flex-1">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;