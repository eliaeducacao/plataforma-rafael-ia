import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/axios';
import type { Message, Chat } from '../types';
import { useSessionStorage } from '@uidotdev/usehooks';

// Tipos para as respostas da API
interface CreateChatRequest {
  title: string;
}

interface SendMessageRequest {
  message: string;
}

// Funções de API
const chatApi = {
  // Criar Chat
  createChat: async (agentId: string, data: CreateChatRequest): Promise<Chat> => {
    const response = await api.post(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/agents/${agentId}/chats`,
      data
    );
    return response.data;
  },

  // Listar Chats de um Agente
  getChats: async (agentId: string): Promise<Chat[]> => {
    const response = await api.get(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/agents/${agentId}/chats`
    );
    return response.data;
  },

  // Listar Mensagens de um Chat
  getMessages: async (chatId: string): Promise<Message[]> => {
    const response = await api.get(
      `/webhook/8d782de6-243e-41c3-a955-8a8682d4a565/api/v1/chats/${chatId}/messages`
    );
    return response.data;
  },

  // Enviar Mensagem para um Chat (multipart/form-data)
  sendMessage: async (chatId: string, data: SendMessageRequest): Promise<Message> => {
    const formData = new FormData();
    formData.append('message', data.message);

    const response = await api.post(
      `/webhook/3667f47c-418a-41c7-98ae-3f97d6468e84/api/v1/chats/${chatId}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};

interface UseChatModelProps {
  agentId?: string;
  chatId?: string;
}

export function useChatModel(props: UseChatModelProps = {}) {
  const queryClient = useQueryClient();

  // Estados principais - apenas os essenciais
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedAgentId] = useSessionStorage<string>('x-selected-agent-id', '');
  const [messageInput, setMessageInput] = useState('');
  const [newConversationMode, setNewConversationMode] = useState(false);

  // Navegação
  const [, setLocation] = useLocation();

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determinar IDs ativos - useMemo para evitar recalcular constantemente
  const activeAgentId = useMemo(
    () => props.agentId || selectedAgentId.replace(/"/g, ''),
    [props.agentId, selectedAgentId]
  );

  const activeChatId = useMemo(
    () => props.chatId || selectedChatId,
    [props.chatId, selectedChatId]
  );

  // React Query - Listar Chats
  const {
    data: chatsData,
    isLoading: isLoadingChats,
    error: chatsError,
    refetch: refetchChats,
  } = useQuery({
    queryKey: ['chats', activeAgentId],
    queryFn: () => chatApi.getChats(activeAgentId),
    enabled: !!activeAgentId,
  });

  // React Query - Listar Mensagens
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['messages', activeChatId],
    queryFn: () => chatApi.getMessages(activeChatId!),
    enabled: !!activeChatId,
  });

  // Garantir que sempre sejam arrays - useMemo para evitar recriação
  const chats = useMemo(() => (Array.isArray(chatsData) ? chatsData : []), [chatsData]);

  const messages = useMemo(() => (Array.isArray(messagesData) ? messagesData : []), [messagesData]);

  // Chat selecionado - useMemo para evitar recálculo desnecessário
  const selectedChat = useMemo(
    () => chats.find((chat: Chat) => chat._id === selectedChatId) || null,
    [chats, selectedChatId]
  );

  // React Query - Criar Chat
  const createChatMutation = useMutation({
    mutationFn: ({ agentId, title }: { agentId: string; title: string }) =>
      chatApi.createChat(agentId, { title }),
    onSuccess: newChat => {
      // Atualizar cache local
      queryClient.setQueryData(['chats', activeAgentId], (oldChats: Chat[] | undefined) => {
        const currentChats = Array.isArray(oldChats) ? oldChats : [];
        return [...currentChats, newChat];
      });

      // Selecionar o novo chat
      setSelectedChatId(newChat._id);
    },
    onError: error => {
      console.error('Erro ao criar chat:', error);
    },
  });

  // React Query - Enviar Mensagem
  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, message }: { chatId: string; message: string }) =>
      chatApi.sendMessage(chatId, { message }),
    onSuccess: newMessage => {
      // Atualizar cache local de mensagens
      queryClient.setQueryData(['messages', activeChatId], (oldMessages: Message[] | undefined) => {
        const currentMessages = Array.isArray(oldMessages) ? oldMessages : [];
        return [...currentMessages, newMessage];
      });

      // Limpar input
      setMessageInput('');
    },
    onError: error => {
      console.error('Erro ao enviar mensagem:', error);
    },
  });

  // Scroll automático - useEffect simples apenas quando há mensagens
  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [messages.length]); // Apenas quando o número de mensagens muda

  // Handlers com useCallback para evitar recriação
  const handleSelectChat = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
  }, []);

  const handleNewConversation = useCallback(() => {
    if (!activeAgentId) return;

    const title = `Chat ${chats.length + 1}`;
    createChatMutation.mutate({
      agentId: activeAgentId,
      title,
    });
  }, [activeAgentId, chats.length, createChatMutation]);

  const handleUpdateThread = useCallback(
    (chatId: string, messages: Message[]) => {
      queryClient.setQueryData(['messages', chatId], messages);
    },
    [queryClient]
  );

  const handleMessageInputChange = useCallback((value: string) => {
    setMessageInput(value);
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!selectedChat || !content.trim()) return;

      sendMessageMutation.mutate({
        chatId: selectedChat._id,
        message: content.trim(),
      });
    },
    [selectedChat, sendMessageMutation]
  );

  const handleSubmitMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (messageInput.trim()) {
        handleSendMessage(messageInput.trim());
      }
    },
    [messageInput, handleSendMessage]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmitMessage(e);
      }
    },
    [handleSubmitMessage]
  );

  const handleInputResize = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = '40px';
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  }, []);

  const handleNavigateToAgents = useCallback(() => {
    setLocation('/agents');
  }, [setLocation]);

  const handleBackFromConversation = useCallback(() => {
    // Implementar lógica de voltar se necessário
  }, []);

  const handleSelectConversation = useCallback((agent: unknown, conversationId: string) => {
    return { agent, conversationId };
  }, []);

  const handleNewConversationMode = useCallback((mode: boolean) => {
    setNewConversationMode(mode);
  }, []);

  const handleStartNewConversation = useCallback(() => {
    handleNewConversation();
    setNewConversationMode(false);
  }, [handleNewConversation]);

  // Métodos de API com useCallback
  const createChat = useCallback(
    (agentId: string, title: string) => {
      createChatMutation.mutate({ agentId, title });
    },
    [createChatMutation]
  );

  const sendMessage = useCallback(
    (chatId: string, message: string) => {
      sendMessageMutation.mutate({ chatId, message });
    },
    [sendMessageMutation]
  );

  // Retorno estável usando useMemo
  return useMemo(
    () => ({
      // Estados principais
      chats,
      selectedChatId,
      selectedChat,
      selectedAgentId: activeAgentId,
      messages,

      // Estados do chat window - usar messages diretamente ao invés de localMessages
      localMessages: messages,
      messagesEndRef,

      // Estados do input
      messageInput,

      // Estados da sidebar de conversas
      newConversationMode,

      // Estados de loading e error
      isLoadingChats,
      isLoadingMessages,
      chatsError,
      messagesError,
      isCreatingChat: createChatMutation.isPending,
      isSendingMessage: sendMessageMutation.isPending,

      // Handlers principais
      handleSelectChat,
      handleNewConversation,
      handleUpdateThread,

      // Handlers do input
      handleMessageInputChange,
      handleSendMessage,
      handleSubmitMessage,
      handleKeyPress,
      handleInputResize,

      // Handlers de navegação
      handleNavigateToAgents,
      handleBackFromConversation,

      // Handlers da sidebar de conversas
      handleSelectConversation,
      handleNewConversationMode,
      handleStartNewConversation,

      // Métodos de API
      createChat,
      sendMessage,
      refetchChats,
      refetchMessages,
    }),
    [
      chats,
      selectedChatId,
      selectedChat,
      activeAgentId,
      messages,
      messageInput,
      newConversationMode,
      isLoadingChats,
      isLoadingMessages,
      chatsError,
      messagesError,
      createChatMutation.isPending,
      sendMessageMutation.isPending,
      handleSelectChat,
      handleNewConversation,
      handleUpdateThread,
      handleMessageInputChange,
      handleSendMessage,
      handleSubmitMessage,
      handleKeyPress,
      handleInputResize,
      handleNavigateToAgents,
      handleBackFromConversation,
      handleSelectConversation,
      handleNewConversationMode,
      handleStartNewConversation,
      createChat,
      sendMessage,
      refetchChats,
      refetchMessages,
    ]
  );
}
