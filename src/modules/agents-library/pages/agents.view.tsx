import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { useAgentsModel } from "./agents.model";
import { CategorySelector } from "../components/category-selector";
import { AgentCard, AgentCardSkeleton } from "../components/agent-card";

export function AgentsView(props: ReturnType<typeof useAgentsModel>) {
  const {
    agents,
    categories,
    selectedCategory,
    handleChangeAgent,
    handleCategoryChange,
    isAgentsLoading,
    isCategoriesLoading
  } = props;

  return (
    <div className="px-10 py-12">
      <div className="flex items-center mb-6">
        <SidebarTrigger className="md:hidden mr-4" />
        <h1 className="text-2xl font-bold">Biblioteca de Agentes</h1>
      </div>

      {/* Category Selector */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isLoading={isCategoriesLoading}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto">
        {isAgentsLoading ? (
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
              onSelectAgent={handleChangeAgent}
            />
          ))
        )}
      </div>
    </div>
  )
}