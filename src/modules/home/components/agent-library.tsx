import { Agent, Category } from "@/shared/types"
import { CategorySelector } from "@/modules/agents-library/components/category-selector";
import { AgentCard, AgentCardSkeleton } from "@/modules/agents-library/components/agent-card";

type AgentLibraryProps = {
  agents: Agent[] | undefined;
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  isCategoriesLoading: boolean;
  onCategoryChange: (categoryId: string | null) => void;
  onSelectAgent: (agentId: string) => void;
}

function AgentLibrary({
  agents,
  categories,
  selectedCategory,
  isLoading,
  isCategoriesLoading,
  onCategoryChange,
  onSelectAgent
}: AgentLibraryProps) {
  return (
    <section id="agentes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Biblioteca de Agentes Especializados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente foi desenvolvido com expertise específica para atender diferentes áreas da
            prática jurídica com precisão e eficiência
          </p>
        </div>

        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          isLoading={isCategoriesLoading}
        />

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

        {/* Library Stats */}
        <div className="mt-16 bg-secondary rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">9+</div>
              <div className="text-muted-foreground">Agentes Especializados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Disponibilidade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Focado em Direito</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">GPT-4</div>
              <div className="text-muted-foreground">Tecnologia Avançada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentLibrary;