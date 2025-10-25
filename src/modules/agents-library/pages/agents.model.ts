import { api } from '@/shared/lib/axios';
import { Agent, Category } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useSessionStorage } from '@uidotdev/usehooks';
import { useLocation } from 'wouter';
import { useState, useEffect, useMemo } from 'react';

export function useAgentsModel() {
  const [selectedAgentId, setSelectedAgentId] = useSessionStorage<string>(
    'x-selected-agent-id',
    ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const { data: agents, isLoading: isAgentsLoading } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get<Agent[]>('/webhook/api/v1/agents');
      return data;
    },
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/webhook/api/v1/categories');
      return data;
    },
  });

  // Ordenar categorias para que "Gerais" seja a última
  const sortedCategories = useMemo(() => {
    return categories
      ? [...categories].sort((a, b) => {
          if (a.name.toLowerCase() === 'gerais') return 1;
          if (b.name.toLowerCase() === 'gerais') return -1;
          return a.order - b.order;
        })
      : [];
  }, [categories]);

  // Selecionar a primeira categoria da lista ordenada por padrão
  useEffect(() => {
    if (sortedCategories && sortedCategories.length > 0 && !selectedCategory) {
      const firstCategory = sortedCategories[0];
      if (firstCategory && firstCategory._id) {
        setSelectedCategory(firstCategory._id);
      }
    }
  }, [sortedCategories, selectedCategory]);

  // Filtrar agentes por categoria
  const filteredAgents = agents?.filter(agent => {
    if (!selectedCategory) return true;
    return agent.category === selectedCategory;
  });

  function handleChangeAgent(id: string) {
    setSelectedAgentId(id);
    setLocation('/chats');
  }

  function handleCategoryChange(categoryId: string | null) {
    setSelectedCategory(categoryId);
  }

  return {
    selectedAgentId,
    agents: filteredAgents,
    categories: sortedCategories,
    selectedCategory,
    isAgentsLoading,
    isCategoriesLoading,
    setSelectedAgentId,
    handleChangeAgent,
    handleCategoryChange,
  };
}
