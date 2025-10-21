import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle, Clock, TrendingUp, Shield } from "lucide-react";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            O que você ganha ao assinar
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Três pilares para você implementar IA no seu escritório e ver resultados desde as primeiras horas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${pillar.bgColor} rounded-lg`}>
                    <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground leading-tight">
                      {pillar.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Invista no seu escritório por menos que 4 horas de um advogado júnior
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Acesso completo aos 8 agentes especializados, treinamentos práticos e atualizações contínuas.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl font-bold text-primary">R$ 197</span>
              <span className="text-2xl text-muted-foreground">/mês</span>
              <Badge variant="secondary" className="ml-4">
                -85% vs advogado júnior
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 border-destructive/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Advogado Júnior</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">4 horas/mês:</span>
                      <span className="font-medium">R$ 1.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Treinamento:</span>
                      <span className="font-medium">R$ 500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atualizações:</span>
                      <span className="font-medium">R$ 200</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>R$ 1.900</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-200 bg-green-50/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Elia IA</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">8 agentes especializados:</span>
                      <span className="font-medium">R$ 197</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Treinamentos inclusos:</span>
                      <span className="font-medium text-green-600">Grátis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atualizações contínuas:</span>
                      <span className="font-medium text-green-600">Grátis</span>
                    </div>
                    <div className="border-t border-green-200 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>R$ 197</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-green-50/50 border-green-200 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    7 dias para testar. Se não servir pra você, devolvemos 100%.
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    Experimente com seus casos, seus clientes, sua rotina. Se por qualquer motivo não for pra você, devolvemos integralmente.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> Sem condições
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> Sem perguntas
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> Sem burocracia
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;