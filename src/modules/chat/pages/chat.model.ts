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

export interface FileData {
  filename: string;
  mimeType: string;
  contentBase64: string;
  size?: number; // Tamanho do arquivo em bytes para exibição na UI
}

export interface SubmitData {
  message: string;
  file?: FileData;
}

interface SendMessageRequest {
  message: string;
  file?: FileData;
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

  // Enviar Mensagem para um Chat (JSON com arquivo base64)
  sendMessage: async (chatId: string, data: SendMessageRequest): Promise<ApiMessageResponse> => {
    const requestBody = {
      message: data.message,
      ...(data.file && { file: data.file }),
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
};

// Query Keys - Centralizadas para consistência
const queryKeys = {
  chats: (agentId: string) => ['chats', agentId] as const,
  messages: (chatId: string) => ['messages', chatId] as const,
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

  // Estados para arquivo
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConvertingFile, setIsConvertingFile] = useState(false);

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
  const selectedChat = useMemo(
    () => chats.find((chat: Chat) => chat._id === selectedChatId) || null,
    [chats, selectedChatId]
  );

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

      // Selecionar o novo chat
      setSelectedChatId(newChat._id);
    },
    onError: error => {
      console.error('Erro ao criar chat:', error);
      // Invalidar queries para garantir consistência
      queryClient.invalidateQueries({ queryKey: queryKeys.chats(activeAgentId) });
    },
  });

  // React Query - Enviar Mensagem
  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, message, file }: { chatId: string; message: string; file?: FileData }) =>
      chatApi.sendMessage(chatId, { message, file }),
    onMutate: async ({ chatId, message, file }) => {
      console.log('🚀 Iniciando envio de mensagem:', { chatId, messageLength: message.length });

      // Adicionar mensagem do usuário imediatamente (optimistic update)
      queryClient.setQueryData(queryKeys.messages(chatId), (oldMessages: Message[] | undefined) => {
        const currentMessages = Array.isArray(oldMessages) ? oldMessages : [];

        const userMessage: Message = {
          role: 'human',
          message: message,
          timestamp: Date.now(),
          attachedFile: file
            ? {
                filename: file.filename,
                mimeType: file.mimeType,
                size: file.size || 0,
              }
            : undefined,
        };

        return [...currentMessages, userMessage];
      });
    },
    onSuccess: (newMessage: ApiMessageResponse, { chatId }) => {
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
      if (!data.message.trim() && !selectedFile) return;

      setIsConvertingFile(true);

      try {
        let fileData: FileData | undefined;

        if (selectedFile) {
          const contentBase64 = await convertFileToBase64(selectedFile);
          fileData = {
            filename: selectedFile.name,
            mimeType: selectedFile.type,
            contentBase64,
            size: selectedFile.size, // Adicionando o tamanho para usar na UI
          };
        }

        sendMessageMutation.mutate({
          chatId: selectedChat._id,
          message: data.message,
          file: fileData,
        });

        // Limpar após envio
        setMessageInput('');
        setSelectedFile(null);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
      } finally {
        setIsConvertingFile(false);
      }
    },
    [selectedChat, selectedFile, sendMessageMutation, convertFileToBase64]
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
    (chatId: string, message: string, file?: FileData) => {
      sendMessageMutation.mutate({ chatId, message, file });
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

  // Função para validar arquivo
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Por favor, selecione apenas arquivos PDF ou DOCX' };
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { valid: false, error: 'O arquivo deve ter no máximo 10MB' };
    }

    return { valid: true };
  }, []);

  // Handler para seleção de arquivo
  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (!file) {
        setSelectedFile(null);
        return;
      }

      const validation = validateFile(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      setSelectedFile(file);
    },
    [validateFile]
  );

  // Handler para remover arquivo
  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    // Limpar o input file também
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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

      // Métodos de cache management
      clearCache,
      invalidateChats,
      invalidateMessages,

      // Estados para arquivo
      selectedFile,
      isConvertingFile,

      // Handlers para arquivo
      handleFileSelect,
      handleFileRemove,

      // Estados para transcrição de áudio
      isTranscribing,

      // Handlers para áudio
      handleAudioRecorded,
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
      clearCache,
      invalidateChats,
      invalidateMessages,
      selectedFile,
      isConvertingFile,
      handleFileSelect,
      handleFileRemove,
      isTranscribing,
      handleAudioRecorded,
    ]
  );
}
