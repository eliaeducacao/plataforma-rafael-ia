import { api } from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';

import { Agent } from '@/shared/types';

export function useHomeModel() {
  const { data: agents, isLoading: isAgentsLoading } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get<Agent[]>('/webhook/api/v1/agents');

      return data;
    },
  });

  return {
    agents,
    isAgentsLoading,
  };
}
