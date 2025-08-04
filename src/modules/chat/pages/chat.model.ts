import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/axios';
import type { Message, Chat } from '../types';
import type { Agent } from '@/shared/types';
import { useSessionStorage } from '@uidotdev/usehooks';
import { toast } from 'sonner';
import type { FileWithId } from '../components/multi-file-upload';

// Tipos para as respostas da API
interface CreateChatRequest {
  title: string;
}

export interface FileData {
  filename: string;
  mimeType: string;
  contentBase64: string;
  size: number; // Tamanho do arquivo em bytes para exibição na UI (obrigatório)
  id?: string; // ID único para gerenciamento na UI
}

export interface SubmitData {
  message: string;
  files?: FileData[]; // Mudança: array de arquivos ao invés de um único
}

interface SendMessageRequest {
  message: string;
  files?: FileData[]; // Mudança: array de arquivos ao invés de um único
}

interface ApiMessageResponse {
  threadId: string;
  output: string;
  usage: Record<string, unknown>;
}

interface TranscriptionResponse {
  text: string;
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

  // Enviar Mensagem para um Chat (JSON com arquivos base64)
  sendMessage: async (chatId: string, data: SendMessageRequest): Promise<ApiMessageResponse> => {
    const requestBody = {
      message: data.message,
      ...(data.files && data.files.length > 0 && { files: data.files }),
    };

    const response = await api.post(
      `/webhook/3667f47c-418a-41c7-98ae-3f97d6468e84/api/v1/chats/${chatId}/messages`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  // Transcrever Áudio
  transcribeAudio: async (audioBlob: Blob): Promise<TranscriptionResponse> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    const response = await api.post('/webhook/api/v1/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Deletar Chat
  deleteChat: async (chatId: string): Promise<void> => {
    await api.post(`/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/chats/${chatId}/delete`);
  },

  // Atualizar Nome do Chat
  updateChatTitle: async (chatId: string, title: string): Promise<Chat> => {
    const response = await api.post(
      `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/chats/${chatId}/rename`,
      { title }
    );
    return response.data;
  },

  // Obter Agente por ID
  getAgent: async (agentId: string): Promise<Agent> => {
    const response = await api.get(
      `/webhook/f356c2bb-bb5e-4667-9853-92ee23b172b8/api/v1/agents/${agentId}`
    );
    return response.data;
  },
};

// Query Keys - Centralizadas para consistência
const queryKeys = {
  chats: (agentId: string) => ['chats', agentId] as const,
  messages: (chatId: string) => ['messages', chatId] as const,
  agent: (agentId: string) => ['agent', agentId] as const,
  allChats: () => ['chats'] as const,
  allMessages: () => ['messages'] as const,
  transcription: (audioId: string) => ['transcription', audioId] as const,
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
  const [messageInput, setMessageInput] = useState('');
  const [newConversationMode, setNewConversationMode] = useState(false);

  // Estados para arquivos múltiplos
  const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);
  const [isConvertingFiles, setIsConvertingFiles] = useState(false);

  // Navegação
  const [, setLocation] = useLocation();

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determinar IDs ativos
  const activeAgentId = useMemo(
    () => props.agentId || selectedAgentId.replace(/"/g, ''),
    [props.agentId, selectedAgentId]
  );

  const activeChatId = useMemo(
    () => props.chatId || selectedChatId,
    [props.chatId, selectedChatId]
  );

  // Efeito para definir selectedChatId quando chatId vem da URL
  useEffect(() => {
    if (props.chatId && props.chatId !== selectedChatId) {
      setSelectedChatId(props.chatId);
    }
  }, [props.chatId, selectedChatId]);

  // Query para buscar detalhes de um chat específico (quando chatId vem da URL)
  const { data: individualChatData, isLoading: isLoadingIndividualChat } = useQuery({
    queryKey: ['chat', activeChatId],
    queryFn: async () => {
      // Buscar detalhes do chat para obter agent_id
      const response = await api.get(
        `/webhook/ba68523b-6eb3-4ca5-9d31-f26e0137a838/api/v1/chats/${activeChatId}`
      );
      return response.data;
    },
    enabled: !!activeChatId && !activeAgentId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // React Query - Listar Chats
  const {
    data: chatsData,
    isLoading: isLoadingChats,
    error: chatsError,
    refetch: refetchChats,
  } = useQuery({
    queryKey: queryKeys.chats(activeAgentId),
    queryFn: () => chatApi.getChats(activeAgentId),
    enabled: !!activeAgentId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // React Query - Listar Mensagens
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: queryKeys.messages(activeChatId!),
    queryFn: () => chatApi.getMessages(activeChatId!),
    enabled: !!activeChatId,
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // React Query - Obter Agente
  const {
    data: currentAgent,
    isLoading: isLoadingAgent,
    error: agentError,
  } = useQuery({
    queryKey: queryKeys.agent(activeAgentId),
    queryFn: () => chatApi.getAgent(activeAgentId),
    enabled: !!activeAgentId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // React Query - Transcrição de Áudio
  const { mutate: transcribeAudio, isPending: isTranscribing } = useMutation({
    mutationFn: (audioBlob: Blob) => chatApi.transcribeAudio(audioBlob),
    onSuccess: response => {
      // Adicionar texto transcrito ao input
      console.log('🎤 Transcrição de áudio:', response);
      const transcribedText = response.text;
      if (transcribedText) {
        setMessageInput(prev => {
          const newText = prev ? `${prev} ${transcribedText}` : transcribedText;
          return newText;
        });
      }
    },
    onError: error => {
      console.error('Erro ao transcrever áudio:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    },
  });

  // Log de erros se houver
  useEffect(() => {
    if (chatsError) {
      console.error('Erro ao carregar chats:', chatsError);
    }
  }, [chatsError]);

  useEffect(() => {
    if (messagesError) {
      console.error('Erro ao carregar mensagens:', messagesError);
    }
  }, [messagesError]);

  // Garantir que sempre sejam arrays - useMemo para evitar recriação
  const chats = useMemo(() => (Array.isArray(chatsData) ? chatsData : []), [chatsData]);

  const messages = useMemo(() => (Array.isArray(messagesData) ? messagesData : []), [messagesData]);

  // Chat selecionado - useMemo para evitar recálculo desnecessário
  const selectedChat = useMemo(() => {
    // Primeiro, tentar encontrar o chat na lista de chats carregados
    const chatFromList = chats.find((chat: Chat) => chat._id === selectedChatId);
    if (chatFromList) return chatFromList;

    // Se não encontrar e temos dados do chat individual, usar esses dados
    if (individualChatData && individualChatData._id === selectedChatId) {
      return individualChatData;
    }

    return null;
  }, [chats, selectedChatId, individualChatData]);

  // React Query - Criar Chat
  const createChatMutation = useMutation({
    mutationFn: ({ agentId, title }: { agentId: string; title: string }) =>
      chatApi.createChat(agentId, { title }),
    onSuccess: newChat => {
      // Atualizar cache de chats
      queryClient.setQueryData(queryKeys.chats(activeAgentId), (oldChats: Chat[] | undefined) => {
        const currentChats = Array.isArray(oldChats) ? oldChats : [];
        return [...currentChats, newChat];
      });

      // Invalidar queries relacionadas para recarregar dados atualizados
      queryClient.invalidateQueries({ queryKey: queryKeys.allChats() });

      // Selecionar o novo chat e navegar de forma síncrona
      setSelectedChatId(newChat._id);
      // Usar setTimeout para garantir que o selectedChatId seja atualizado primeiro
      setTimeout(() => {
        setLocation(`/chats/${newChat._id}`);
      }, 0);
    },
    onError: error => {
      console.error('Erro ao criar chat:', error);
      // Invalidar queries para garantir consistência
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) });
    },
  });

  // React Query - Enviar Mensagem
  const sendMessageMutation = useMutation({
    mutationFn: ({
      chatId,
      message,
      files,
    }: {
      chatId: string;
      message: string;
      files?: FileData[];
    }) => chatApi.sendMessage(chatId, { message, files }),
    onMutate: async ({ chatId, message, files }) => {
      console.log('🚀 Iniciando envio de mensagem:', { chatId, messageLength: message.length });

      // Adicionar mensagem do usuário imediatamente (optimistic update)
      queryClient.setQueryData(queryKeys.messages(chatId), (oldMessages: Message[] | undefined) => {
        const currentMessages = Array.isArray(oldMessages) ? oldMessages : [];

        const userMessage: Message = {
          role: 'human',
          message: message,
          timestamp: Date.now(),
          attachedFiles: files && files.length > 0 ? files : undefined,
        };

        return [...currentMessages, userMessage];
      });
    },
    onSuccess: (newMessage: ApiMessageResponse, { chatId, files }) => {
      console.log('✅ API Response:', newMessage);
      console.log('🔄 Mutation finalizada com sucesso');

      // Atualizar cache com a mensagem real da API
      queryClient.setQueryData(queryKeys.messages(chatId), (oldMessages: Message[] | undefined) => {
        const currentMessages = Array.isArray(oldMessages) ? oldMessages : [];

        // Converter a estrutura da API para nossa estrutura
        const formattedMessage: Message = {
          role: 'ai', // Mensagens da API são sempre do bot
          message: newMessage.output || '', // Usar output da API
          isStreaming: true, // Flag para ativar typewriter
          timestamp: Date.now(), // Timestamp para identificar como nova
          attachedFiles: files && files.length > 0 ? files : undefined,
        };

        console.log('🎬 Mensagem do bot com typewriter:', {
          messageLength: formattedMessage.message.length,
          isStreaming: formattedMessage.isStreaming,
        });

        const updatedMessages = [...currentMessages, formattedMessage];

        // Após o tempo necessário, desativar o streaming
        const messageText = formattedMessage.message;
        if (messageText && messageText.length > 0) {
          const timeoutDuration = messageText.length * 15 + 500;

          setTimeout(() => {
            queryClient.setQueryData(
              queryKeys.messages(chatId),
              (currentMessages: Message[] | undefined) => {
                if (!currentMessages) return currentMessages;

                return currentMessages.map(msg =>
                  msg.timestamp === formattedMessage.timestamp
                    ? { ...msg, isStreaming: false }
                    : msg
                );
              }
            );
          }, timeoutDuration);
        }

        return updatedMessages;
      });

      // Limpar input
      setMessageInput('');
    },
    onError: (error, { chatId }) => {
      console.error('❌ Erro ao enviar mensagem:', error);
      console.log('🔄 Mutation finalizada com erro');

      // Invalidar queries para recarregar estado correto
      queryClient.invalidateQueries({ queryKey: queryKeys.messages(chatId) });
    },
  });

  // Mutation para deletar chat
  const deleteChatMutation = useMutation({
    mutationFn: (chatId: string) => chatApi.deleteChat(chatId),
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) });
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
      }
      toast.success('Chat deletado com sucesso!');
    },
    onError: error => {
      console.error('Erro ao deletar chat:', error);
      toast.error('Erro ao deletar o chat. Tente novamente.');
    },
  });

  // Mutation para atualizar título do chat
  const updateChatTitleMutation = useMutation({
    mutationFn: ({ chatId, title }: { chatId: string; title: string }) =>
      chatApi.updateChatTitle(chatId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) });
      toast.success('Título do chat atualizado com sucesso!');
    },
    onError: error => {
      console.error('Erro ao atualizar título:', error);
      toast.error('Erro ao atualizar o título do chat. Tente novamente.');
    },
  });

  // Monitorar estado da mutação
  useEffect(() => {
    console.log('📊 Estado da mutação:', {
      isPending: sendMessageMutation.isPending,
      isError: sendMessageMutation.isError,
      isSuccess: sendMessageMutation.isSuccess,
      error: sendMessageMutation.error,
    });
  }, [
    sendMessageMutation.isPending,
    sendMessageMutation.isError,
    sendMessageMutation.isSuccess,
    sendMessageMutation.error,
  ]);

  // Scroll automático - useEffect simples apenas quando há mensagens
  useEffect(() => {
    const messageCount = messages && Array.isArray(messages) ? messages.length : 0;
    if (messageCount > 0) {
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [messages]); // Monitora mudanças no array de mensagens

  // Lógica de seleção automática de chat quando o agente muda
  useEffect(() => {
    console.log('🔄 useEffect seleção automática:', {
      activeAgentId,
      isLoadingChats,
      chats: chats?.length,
      selectedChatId,
      isCreatingChat: createChatMutation.isPending,
    });

    if (activeAgentId && !isLoadingChats && chats !== undefined) {
      // Se há chats disponíveis, seleciona o primeiro
      if (chats && Array.isArray(chats) && chats.length > 0) {
        const firstChat = chats[0];
        if (firstChat && selectedChatId !== firstChat._id) {
          console.log('✅ Selecionando primeiro chat:', firstChat._id);
          setSelectedChatId(firstChat._id);
          setLocation(`/chats/${firstChat._id}`);
        }
      }
      // Se não há chats E não está criando um chat, cria um novo automaticamente
      else if (
        chats &&
        Array.isArray(chats) &&
        chats.length === 0 &&
        !createChatMutation.isPending
      ) {
        console.log('🆕 Criando novo chat para agente:', activeAgentId);
        createChatMutation.mutate({
          agentId: activeAgentId,
          title: 'Novo Chat',
        });
      }
      // Se chats ainda não foi carregado (undefined), não faz nada
      else if (chats === undefined) {
        console.log('⏳ Chats ainda não carregados');
      }
    }
  }, [activeAgentId, chats, isLoadingChats, createChatMutation.isPending, setLocation]);

  // Handlers com useCallback para evitar recriação
  const handleSelectChat = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
  }, []);

  const handleNewConversation = useCallback(() => {
    if (!activeAgentId) return;

    const chatCount = chats && Array.isArray(chats) ? chats.length : 0;
    const title = `Chat ${chatCount + 1}`;
    createChatMutation.mutate({
      agentId: activeAgentId,
      title,
    });
  }, [activeAgentId, chats, createChatMutation]);

  const handleUpdateThread = useCallback(
    (chatId: string, messages: Message[]) => {
      queryClient.setQueryData(queryKeys.messages(chatId), messages);
      // Invalidar para garantir consistência
      queryClient.invalidateQueries({ queryKey: queryKeys.messages(chatId) });
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

  // Função para converter arquivo para Base64
  const convertFileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(',')[1];
          if (base64) {
            resolve(base64);
          } else {
            reject(new Error('Erro ao obter base64 do arquivo'));
          }
        } else {
          reject(new Error('Erro ao converter arquivo'));
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    });
  }, []);

  const handleSubmitMessage = useCallback(
    async (data: SubmitData) => {
      if (!selectedChat) return;
      if (!data.message.trim() && selectedFiles.length === 0) return;

      setIsConvertingFiles(true);

      try {
        const filesData: FileData[] = [];

        // Converter todos os arquivos para base64
        for (const file of selectedFiles) {
          const contentBase64 = await convertFileToBase64(file);
          filesData.push({
            filename: file.name,
            mimeType: file.type,
            contentBase64,
            size: file.size,
            id: file.id,
          });
        }

        sendMessageMutation.mutate({
          chatId: selectedChat._id,
          message: data.message,
          files: filesData.length > 0 ? filesData : undefined,
        });

        // Limpar após envio
        setMessageInput('');
        setSelectedFiles([]);
      } catch (error) {
        console.error('Erro ao processar arquivos:', error);
        toast.error('Erro ao processar arquivos. Tente novamente.');
      } finally {
        setIsConvertingFiles(false);
      }
    },
    [selectedChat, selectedFiles, sendMessageMutation, convertFileToBase64]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        // O Enter enviará apenas a mensagem de texto, sem arquivo
        handleSubmitMessage({ message: messageInput });
      }
    },
    [handleSubmitMessage, messageInput]
  );

  const handleInputResize = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    console.log('📏 Redimensionando input:', {
      value: target.value,
      valueLength: target.value.length,
      scrollHeight: target.scrollHeight,
      currentHeight: target.style.height,
    });

    // Resetar altura para calcular corretamente
    target.style.height = 'auto';

    // Calcular nova altura baseada no conteúdo
    const newHeight = Math.min(target.scrollHeight, 128); // max 128px (8rem)

    // Aplicar nova altura
    target.style.height = `${newHeight}px`;

    console.log('📐 Nova altura aplicada:', newHeight);

    // Sempre permitir scroll quando necessário
    if (target.scrollHeight > 128) {
      target.style.overflowY = 'auto';
      console.log('📜 Scroll habilitado');
    } else {
      target.style.overflowY = 'hidden';
      console.log('📜 Scroll desabilitado');
    }
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
    (chatId: string, message: string, files?: FileData[]) => {
      sendMessageMutation.mutate({ chatId, message, files });
    },
    [sendMessageMutation]
  );

  // Método para limpar cache se necessário
  const clearCache = useCallback(() => {
    queryClient.clear();
  }, [queryClient]);

  // Método para invalidar queries específicas
  const invalidateChats = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.allChats() });
  }, [queryClient]);

  const invalidateMessages = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.allMessages() });
  }, [queryClient]);

  // Handler para seleção de múltiplos arquivos
  const handleFilesSelect = useCallback((files: FileWithId[]) => {
    setSelectedFiles(files);
  }, []);

  // Handler para remover arquivo específico
  const handleFileRemove = useCallback((fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  }, []);

  // Handler para áudio gravado
  const handleAudioRecorded = useCallback(
    (audioBlob: Blob) => {
      console.log('🎤 Áudio gravado recebido:', {
        size: audioBlob.size,
        type: audioBlob.type,
      });

      // Iniciar transcrição
      transcribeAudio(audioBlob);
    },
    [transcribeAudio]
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
      isLoadingMessages: isLoadingMessages || isLoadingIndividualChat,
      isLoadingAgent,
      chatsError,
      messagesError,
      agentError,
      isCreatingChat: createChatMutation.isPending,
      isSendingMessage: sendMessageMutation.isPending,

      // Dados do agente
      currentAgent,

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

      // Métodos de cache management
      clearCache,
      invalidateChats,
      invalidateMessages,

      // Estados para arquivos múltiplos
      selectedFiles,
      isConvertingFiles,

      // Handlers para arquivos múltiplos
      handleFilesSelect,
      handleFileRemove,

      // Estados para transcrição de áudio
      isTranscribing,

      // Handlers para áudio
      handleAudioRecorded,

      // Mutations
      deleteChatMutation,
      updateChatTitleMutation,
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
      isLoadingIndividualChat,
      isLoadingAgent,
      chatsError,
      messagesError,
      agentError,
      createChatMutation.isPending,
      sendMessageMutation.isPending,
      currentAgent,
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
      clearCache,
      invalidateChats,
      invalidateMessages,
      selectedFiles,
      isConvertingFiles,
      handleFilesSelect,
      handleFileRemove,
      isTranscribing,
      handleAudioRecorded,
      deleteChatMutation,
      updateChatTitleMutation,
    ]
  );
}
