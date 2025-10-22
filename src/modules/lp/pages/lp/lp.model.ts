import { api } from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { Agent, Category } from '@/shared/types';

export function useLpModel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // Selecionar a primeira categoria por padrão
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];
      if (firstCategory && firstCategory._id) {
        setSelectedCategory(firstCategory._id);
      }
    }
  }, [categories, selectedCategory]);

  // Filtrar agentes por categoria
  const filteredAgents = agents?.filter(agent => {
    if (!selectedCategory) return true;
    return agent.category === selectedCategory;
  });

  function handleCategoryChange(categoryId: string | null) {
    setSelectedCategory(categoryId);
  }

  const handleSelectAgent = () => {
    window.location.href = '/login';
  };

  // Ordenar categorias para que "Gerais" seja a última
  const sortedCategories = categories
    ? [...categories].sort((a, b) => {
        if (a.name.toLowerCase() === 'gerais') return 1;
        if (b.name.toLowerCase() === 'gerais') return -1;
        return a.order - b.order;
      })
    : [];

  return {
    agents: filteredAgents,
    categories: sortedCategories,
    selectedCategory,
    isAgentsLoading,
    isCategoriesLoading,
    handleCategoryChange,
    handleSelectAgent,
  };
}
