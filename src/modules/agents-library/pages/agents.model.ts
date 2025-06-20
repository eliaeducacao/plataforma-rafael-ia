import { api } from '@/shared/lib/axios';
import { Agent } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useSessionStorage } from '@uidotdev/usehooks';
import { useLocation } from 'wouter';

export function useAgentsModel() {
  const [selectedAgentId, setSelectedAgentId] = useSessionStorage<string>(
    'x-selected-agent-id',
    ''
  );
  const [, setLocation] = useLocation();

  const { data: agents, isLoading: isAgentsLoading } = useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get<Agent[]>('/webhook/api/v1/agents');

      return data;
    },
  });

  function handleChangeAgent(id: string) {
    setSelectedAgentId(id);
    setLocation('/chats');
  }

  return {
    selectedAgentId,
    agents,
    isAgentsLoading,
    setSelectedAgentId,
    handleChangeAgent,
  };
}
