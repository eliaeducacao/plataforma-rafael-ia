import { Agent, Category } from "@/shared/types";
import { CategorySelector } from "@/modules/agents-library/components/category-selector";
import { AgentCard, AgentCardSkeleton } from "@/modules/agents-library/components/agent-card";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ArrowRight } from "lucide-react";

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
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Título da Seção */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            8 agentes por área do Direito. Cada um treinado para uma etapa específica do seu trabalho.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <AgentCardSkeleton index={index} />
            ))
          ) : (
            // Actual agents
            agents?.map((agent, index) => (
              <AgentCard
                agent={agent}
                index={index}
                onSelectAgent={onSelectAgent}
              />

            ))
          )}
        </div>

        {/* CTA Intermediário */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
                Agora você realmente sabe como utilizar a Inteligência Artificial a seu favor
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Escolha a melhor forma para você conhecer a Elia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      Teste Grátis
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Se você quer testar a Elia no seu ritmo, sem compromisso:
                    </p>

                    <Button size="lg" className="w-full">
                      Experimente 7 dias grátis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Sem cartão. Sem pegadinha.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Cancela quando quiser.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Acesso completo à plataforma</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      Demonstração
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Se você quer ver como a Elia resolve o seu caso específico antes de testar:
                    </p>

                    <Button variant="outline" size="lg" className="w-full">
                      Agende sua demonstração
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>30 minutos personalizados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>A gente mostra, você decide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>Casos específicos da sua área</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Separador visual */}
            <div className="flex items-center justify-center mt-10 mb-6 max-w-md mx-auto">
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
      </div >
    </section >
  );
};

export default AgentsSection;