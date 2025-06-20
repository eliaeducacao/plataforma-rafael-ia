import { api } from '@/shared/lib/axios';
import { Agent } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useSessionStorage } from '@uidotdev/usehooks';
import { useLocation } from 'wouter';

export function useAgentsModel() {
  const [selectedAgent, setSelectedAgent] = useSessionStorage<string>('x-selected-agent', '');
  const [, setLocation] = useLocation();

  const { data: agents, isLoading: isAgentsLoading } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get<Agent[]>('/webhook/api/v1/agents');

      return data;
    },
  });

  function handleChangeAgent(id: string) {
    setSelectedAgent(id);
    setLocation('/chats');
  }

  return {
    selectedAgent,
    agents,
    isAgentsLoading,
    setSelectedAgent,
    handleChangeAgent,
  };
}
