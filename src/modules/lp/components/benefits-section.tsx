import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

const BenefitsSection = () => {
  const pillars = [
    {
      icon: CheckCircle,
      title: "Fluxo Jurídico Completo Automatizado",
      description: "8 agentes especializados cobrindo: diagnóstico, tese, atendimento, contratos, jurisprudência, petição inicial, revisão e petição incidental. Do primeiro contato com o cliente à peça final.",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Implementação Garantida em 15 Minutos",
      description: "Treinamentos práticos que ensinam exatamente como usar cada agente no seu dia a dia. Não é teoria — é \"clique aqui, faça isso, receba aquilo\".",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Evolução Contínua da Plataforma",
      description: "Melhorias regulares baseadas no feedback de advogados que usam Elia no dia a dia. Sua ferramenta sempre fica mais inteligente.",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            O que você ganha ao assinar
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Três pilares para você implementar IA no seu escritório e ver resultados desde as primeiras horas
          </p>
        </div>

        {/* Grid dos 3 Pilares */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300"></div>

              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground leading-tight">
                  {pillar.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Valor */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h3 className="text-2xl lg:text-4xl font-bold text-foreground">
              Invista no seu escritório por menos que 4 horas de um advogado júnior
            </h3>

            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                R$ 197<span className="text-2xl text-muted-foreground">/mês</span>
              </div>
              <p className="text-lg text-muted-foreground">
                Acesso completo aos 8 agentes especializados, treinamentos práticos e atualizações contínuas.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                7 dias para testar. Se não servir pra você, devolvemos 100%.
              </h4>
              <p className="text-green-700">
                Experimente com seus casos, seus clientes, sua rotina. Se por qualquer motivo não for pra você, devolvemos integralmente.
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">
                Sem condições. Sem perguntas. Sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;