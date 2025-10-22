import { Agent, Category } from "@/shared/types";
import { CategorySelector } from "@/modules/agents-library/components/category-selector";
import { AgentCard, AgentCardSkeleton } from "@/modules/agents-library/components/agent-card";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";
import { Play, Sparkles, Clock, Shield, CheckCircle } from "lucide-react";

type AgentsSectionProps = {
  agents: Agent[] | undefined;
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  isCategoriesLoading: boolean;
  onCategoryChange: (categoryId: string | null) => void;
  onSelectAgent: (agentId: string) => void;
};

const AgentsSection = ({
  agents,
  categories,
  selectedCategory,
  isLoading,
  isCategoriesLoading,
  onCategoryChange,
  onSelectAgent
}: AgentsSectionProps) => {

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            8 agentes por área do Direito. Cada um treinado para uma etapa específica do seu trabalho.
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Do primeiro atendimento à petição final, você tem um especialista para cada tarefa. Escolha a área que você atua e veja como cada agente acelera sua rotina.
          </p>
        </div>

        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          isLoading={isCategoriesLoading}
        />

        {/* Grid de Agentes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <AgentCardSkeleton key={index} index={index} />
            ))
          ) : (
            // Actual agents
            agents?.map((agent, index) => (
              <AgentCard
                key={agent._id}
                agent={agent}
                index={index}
                onSelectAgent={onSelectAgent}
              />
            ))
          )}
        </div>

        {/* CTA Intermediário */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Pronto para acelerar seu trabalho?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha a forma que funciona melhor para você conhecer a Elia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Opção 1: Teste Grátis */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 text-center relative">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    <Shield className="w-3 h-3 mr-1" />
                    Sem compromisso
                  </Badge>
                </div>

                <h4 className="text-xl font-semibold mb-3">
                  Teste grátis por 7 dias
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experimente todos os agentes no seu ritmo, sem cartão de crédito
                </p>

                <Button size="lg" className="w-full text-lg py-6 group-hover:scale-105 transition-transform duration-300">
                  Começar teste grátis
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancela quando quiser</span>
                </div>
              </CardContent>
            </Card>

            {/* Opção 2: Demonstração */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-400 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 text-center relative">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="mb-4">
                    <Clock className="w-3 h-3 mr-1" />
                    30 minutos
                  </Badge>
                </div>

                <h4 className="text-xl font-semibold mb-3">
                  Agende uma demonstração
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Veja como a Elia resolve seu caso específico em tempo real
                </p>

                <Button variant="outline" size="lg" className="w-full text-lg py-6 group-hover:scale-105 transition-transform duration-300">
                  Agendar demonstração
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Personalizada para você</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Separador visual */}
          <div className="flex items-center justify-center mt-12 mb-8 max-w-md mx-auto">
            <Separator className="flex-1" />
            <span className="px-4 text-sm text-muted-foreground font-medium">ou</span>
            <Separator className="flex-1" />
          </div>

          {/* CTA adicional */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ainda tem dúvidas? Fale com nosso time
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Falar com especialista →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;