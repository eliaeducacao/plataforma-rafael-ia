import { agents } from "@/modules/home/components/agent-library";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useLocation } from "wouter";

export function useAgentsModel() {
  const [selectedAgent, setSelectedAgent] = useSessionStorage<string>('x-selected-agent', '')
  const [, setLocation] = useLocation()
  
  function handleChangeAgent(id: string) {
    setSelectedAgent(id)
    setLocation('/chats')
  }

  return {
    selectedAgent,
    agents,
    setSelectedAgent,
    handleChangeAgent
  }
}