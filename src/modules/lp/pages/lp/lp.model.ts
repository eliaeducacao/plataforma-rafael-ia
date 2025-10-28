import { api } from '@/shared/lib/axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { Agent, Category } from '@/shared/types';
import { AxiosError } from 'axios';

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

  // Mutation para criar checkout do Stripe
  const createCheckoutMutation = useMutation({
    mutationFn: async () => {
      const cancelUrl = window.location.origin;
      const successUrl = `${window.location.origin}/check-email`;

      const { data } = await api.post(
        '/webhook/8d37c0bd-4bb1-485b-8206-88fa4bae5c64/stripe/prices/price_1SMvWsBHoqMVqqO2ZOjouBjy/checkout/trial',
        {
          cancel_url: cancelUrl,
          success_url: successUrl,
        }
      );
      return data;
    },
    onSuccess: data => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Erro ao redirecionar para o checkout');
      }
    },
    onError: (error: AxiosError) => {
      console.error('Erro ao criar checkout:', error);
      toast.error('Erro ao iniciar o teste gratuito. Tente novamente.');
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

  function handleCategoryChange(categoryId: string | null) {
    setSelectedCategory(categoryId);
  }

  const handleSelectAgent = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleStartTrial = () => {
    createCheckoutMutation.mutate();
  };

  return {
    agents: filteredAgents,
    categories: sortedCategories,
    selectedCategory,
    isAgentsLoading,
    isCategoriesLoading,
    handleCategoryChange,
    handleSelectAgent,
    handleStartTrial,
    isStartingTrial: createCheckoutMutation.isPending,
  };
}
