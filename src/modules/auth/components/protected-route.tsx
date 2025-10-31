import { ReactNode, useState } from "react"
import { useAuth } from "../hooks/use-auth"
import { useLocation } from "wouter"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSessionStorage } from '@uidotdev/usehooks'
import { api } from '@/shared/lib/axios'
import type { Chat } from '@/modules/chat/types'

import { AppSidebar } from "@/shared/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar"
import { InternalHeader } from "@/shared/components/internal-header"
import { SubscriptionGate } from '@/modules/auth/components/subscription-gate'
import { useSubscriptionGuardModel } from '@/modules/auth/models/subscription-guard.model'

type ProtectedRouteProps = {
  children: ReactNode
}

// API functions para chats
const chatApi = {
  getChats: async (agentId: string): Promise<Chat[]> => {
    const response = await api.get(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/agents/${agentId}/chats`
    );
    return response.data;
  },

  deleteChat: async (chatId: string): Promise<void> => {
    await api.post(`/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/chats/${chatId}/delete`);
  },

  updateChatTitle: async (chatId: string, title: string): Promise<Chat> => {
    const response = await api.post(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/chats/${chatId}/rename`,
      { title }
    );
    return response.data;
  },

  createChat: async (agentId: string, data: { title: string }): Promise<Chat> => {
    const response = await api.post(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/agents/${agentId}/chats`,
      data
    );
    return response.data;
  },
};

// Query Keys
const queryKeys = {
  chats: (agentId: string) => ['chats', agentId] as const,
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { logout, user } = useAuth()
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()
  const subscriptionGuard = useSubscriptionGuardModel()

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [selectedAgentId] = useSessionStorage<string>('x-selected-agent-id', '')

  const activeAgentId = selectedAgentId.replace(/"/g, '')

  const { data: chats, isLoading: isLoadingChats } = useQuery({
    queryKey: queryKeys.chats(activeAgentId),
    queryFn: () => chatApi.getChats(activeAgentId),
    enabled: !!activeAgentId && !subscriptionGuard.isRestricted,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const deleteChatMutation = useMutation({
    mutationFn: chatApi.deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) })

      if (selectedChatId && chats && Array.isArray(chats)) {
        const remainingChats = chats.filter(chat => chat._id !== selectedChatId)
        if (remainingChats.length > 0 && remainingChats[0]) {
          setSelectedChatId(remainingChats[0]._id)
          setLocation(`/chats/${remainingChats[0]._id}`)
        } else {
          setSelectedChatId(null)
          setLocation('/chats')
        }
      }
    },
    onError: (error) => {
      console.error('Erro ao deletar chat:', error)
    },
  })

  const updateChatTitleMutation = useMutation({
    mutationFn: ({ chatId, title }: { chatId: string; title: string }) =>
      chatApi.updateChatTitle(chatId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) })
    },
    onError: (error) => {
      console.error('Erro ao atualizar título do chat:', error)
    },
  })

  const createChatMutation = useMutation({
    mutationFn: ({ agentId, title }: { agentId: string; title: string }) =>
      chatApi.createChat(agentId, { title }),
    onSuccess: (newChat) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) })
      setSelectedChatId(newChat._id)
      setLocation(`/chats/${newChat._id}`)
    },
    onError: (error) => {
      console.error('Erro ao criar chat:', error)
    },
  })

  const handleSelectChat = subscriptionGuard.wrap((chatId: string) => {
    setSelectedChatId(chatId)
    setLocation(`/chats/${chatId}`)
  })

  const handleNewConversation = subscriptionGuard.wrap(() => {
    if (activeAgentId) {
      createChatMutation.mutate({
        agentId: activeAgentId,
        title: 'Novo Chat',
      })
    }
  })

  const handleDeleteChat = subscriptionGuard.wrap((chatId: string) => {
    deleteChatMutation.mutate(chatId)
  })

  const handleUpdateChatTitle = subscriptionGuard.wrap((chatId: string, title: string) => {
    return updateChatTitleMutation.mutateAsync({ chatId, title })
  })

  const handleStartEditChat = (chatId: string) => {
    setEditingChatId(chatId)
  }

  const handleStopEditChat = () => {
    setEditingChatId(null)
  }

  const isSubscriptionRestricted = subscriptionGuard.isRestricted

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          avatar: '',
          email: user?.email ?? '',
          name: user?.name ?? ''
        }}
        onLogout={logout}
        chats={isSubscriptionRestricted ? [] : chats}
        selectedChatId={isSubscriptionRestricted ? null : selectedChatId}
        selectedAgentId={isSubscriptionRestricted ? null : activeAgentId}
        onSelectChat={handleSelectChat}
        onNewConversation={handleNewConversation}
        onDeleteChat={handleDeleteChat}
        onUpdateChatTitle={handleUpdateChatTitle}
        editingChatId={editingChatId}
        onStartEditChat={handleStartEditChat}
        onStopEditChat={handleStopEditChat}
        updateChatTitleMutation={updateChatTitleMutation}
        isCreatingChat={createChatMutation.isPending}
        isLoadingChats={isLoadingChats}
        isSubscriptionRestricted={isSubscriptionRestricted}
        restrictionMessage={subscriptionGuard.statusInfo.sidebarMessage}
        onManageSubscription={subscriptionGuard.goToPlans}
      />
      <SidebarInset>
        <InternalHeader />
        <SubscriptionGate
          isBlocking={subscriptionGuard.isBlocking}
          statusInfo={subscriptionGuard.statusInfo}
          onManageSubscription={subscriptionGuard.goToPlans}
        >
          {children}
        </SubscriptionGate>
      </SidebarInset>
    </SidebarProvider>
  )
}