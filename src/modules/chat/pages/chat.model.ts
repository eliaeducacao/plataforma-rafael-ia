import { useState, useEffect, useRef } from 'react';
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

  // Estados principais
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedAgentId] = useSessionStorage<string>('x-selected-agent-id', '');

  // Estados para o chat window
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message | undefined>(undefined);

  // Estados para input de mensagem
  const [messageInput, setMessageInput] = useState('');

  // Estados para sidebar de conversas
  const [newConversationMode, setNewConversationMode] = useState(false);

  // Navegação
  const [, setLocation] = useLocation();

  // Refs para scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determinar IDs ativos
  const activeAgentId = props.agentId || selectedAgentId.replace(/"/g, '');
  const activeChatId = props.chatId || selectedChatId;

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

  // Garantir que chats sempre seja um array
  const chats = Array.isArray(chatsData) ? chatsData : [];

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

  // Garantir que messages sempre seja um array
  const messages = Array.isArray(messagesData) ? messagesData : [];

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
      setCurrentMessage(undefined);
      setLocalMessages([]);
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

      // Atualizar mensagens locais
      setLocalMessages(prev => [...prev, newMessage]);

      // Limpar input
      setMessageInput('');
    },
    onError: error => {
      console.error('Erro ao enviar mensagem:', error);
    },
  });

  // Chat selecionado
  const selectedChat = chats.find((chat: Chat) => chat._id === selectedChatId) || null;

  // Efeito para sincronizar mensagens locais com as mensagens da API
  useEffect(() => {
    if (messages.length > 0) {
      setLocalMessages(messages);
    } else {
      setLocalMessages([]);
    }
  }, [messages]);

  // Efeito para scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  // Efeito para reset do scroll quando muda de thread
  useEffect(() => {
    if (selectedChat) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [selectedChat?._id, selectedChat]);

  // Handlers principais
  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setCurrentMessage(undefined);
  };

  const handleNewConversation = () => {
    if (!activeAgentId) return;

    const title = `Chat ${chats.length + 1}`;
    createChatMutation.mutate({
      agentId: activeAgentId,
      title,
    });
  };

  const handleUpdateThread = (chatId: string, messages: Message[]) => {
    // Atualizar cache local
    queryClient.setQueryData(['messages', chatId], messages);
  };

  // Handlers para input de mensagem
  const handleMessageInputChange = (value: string) => {
    setMessageInput(value);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat || !content.trim()) return;

    // Criar mensagem temporária do usuário para feedback imediato
    const tempUserMessage: Message = {
      message: content.trim(),
      role: 'human',
    };

    // Adicionar mensagem temporária às mensagens locais
    setLocalMessages(prev => [...prev, tempUserMessage]);

    // Enviar mensagem via API
    sendMessageMutation.mutate({
      chatId: selectedChat._id,
      message: content.trim(),
    });
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      handleSendMessage(messageInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage(e);
    }
  };

  const handleInputResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = '40px';
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  };

  // Handlers para navegação
  const handleNavigateToAgents = () => {
    setLocation('/agents');
  };

  const handleBackFromConversation = () => {
    // Implementar lógica de voltar se necessário
  };

  // Handlers para sidebar de conversas
  const handleSelectConversation = (agent: unknown, conversationId: string) => {
    return { agent, conversationId };
  };

  const handleNewConversationMode = (mode: boolean) => {
    setNewConversationMode(mode);
  };

  const handleStartNewConversation = () => {
    handleNewConversation();
    setNewConversationMode(false);
  };

  return {
    // Estados principais
    chats,
    selectedChatId,
    selectedChat,
    selectedAgentId: activeAgentId,
    messages,

    // Estados do chat window
    localMessages,
    currentMessage,
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

    // Métodos de API (para uso direto se necessário)
    createChat: (agentId: string, title: string) => createChatMutation.mutate({ agentId, title }),
    sendMessage: (chatId: string, message: string) =>
      sendMessageMutation.mutate({ chatId, message }),
    refetchChats,
    refetchMessages,
  };
}
