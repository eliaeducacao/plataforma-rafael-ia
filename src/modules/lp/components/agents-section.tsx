import { Agent, Category } from "@/shared/types";
import { CategorySelector } from "@/modules/agents-library/components/category-selector";
import { AgentCard, AgentCardSkeleton } from "@/modules/agents-library/components/agent-card";
import { Button } from "@/shared/components/ui/button";

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
        <div className="text-center mt-16 space-y-6">
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Se você quer testar a Elia no seu ritmo, sem compromisso:
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              Experimente 7 dias grátis
            </Button>
            <p className="text-sm text-muted-foreground">
              (Sem cartão. Sem pegadinha. Cancela quando quiser.)
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium">
              Se você quer ver como a Elia resolve o seu caso específico antes de testar:
            </p>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Agende sua demonstração
            </Button>
            <p className="text-sm text-muted-foreground">
              (30 minutos. A gente mostra, você decide.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;