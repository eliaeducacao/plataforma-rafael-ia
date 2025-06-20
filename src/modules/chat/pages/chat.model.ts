import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import type { Message, Chat } from '../types';
import { useSessionStorage } from '@uidotdev/usehooks';

export function useChatModel() {
  // Estados principais
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
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

  // Chat selecionado
  const selectedChat =
    chats !== null ? chats.find((chat: Chat) => chat._id === selectedChatId) : null;

  // Efeito para sincronizar mensagens locais
  useEffect(() => {
    if (currentMessage) {
      setLocalMessages(prev => [...prev, currentMessage]);
    } else {
      setLocalMessages([]);
    }
  }, [currentMessage]);

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
    setCurrentMessage(undefined); // Reset mensagem atual
    setLocalMessages([]); // Reset mensagens locais
  };

  const handleNewConversation = () => {
    const newChat: Chat = {
      _id: `temp-${Date.now()}`,
      title: `Chat ${chats ? chats.length + 1 : 1}`,
      user_id: 'temp-user',
      agent_id: selectedAgentId.replace(/"/g, ''),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setChats((prev: Chat[] | null) => {
      if (prev === null) return [newChat];
      return [...prev, newChat];
    });

    setSelectedChatId(newChat._id);
    setCurrentMessage(undefined);
    setLocalMessages([]);
  };

  const handleUpdateThread = (chatId: string, messages: Message[]) => {
    setChats((prev: Chat[] | null) => {
      if (prev === null) return null;
      return prev.map((chat: Chat) => (chat._id === chatId ? { ...chat, messages } : chat));
    });
  };

  // Handlers para input de mensagem
  const handleMessageInputChange = (value: string) => {
    setMessageInput(value);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    // Criar mensagem do usuário
    const userMessage: Message = {
      message: content,
      role: 'human',
    };

    // TODO: Fazer a chamada API https://api.eliaeducacao.com.br/webhook/3667f47c-418a-41c7-98ae-3f97d6468e84/api/v1/chats/:chat_id/messages e pegar o campo output para definir a mensagem da IA

    // Simular resposta do agente após um delay
    const aiMessage: Message = {
      message: content + ' messagem de ia',
      role: 'ai',
    };

    // Atualizar mensagens localmente
    const newMessages = [...localMessages, userMessage];
    setLocalMessages(newMessages);

    // Limpar input
    setMessageInput('');

    // Simular delay da resposta da IA
    setTimeout(() => {
      const finalMessages = [...newMessages, aiMessage];
      setLocalMessages(finalMessages);

      // Notificar sobre a atualização
      handleUpdateThread(selectedChat._id, finalMessages);
    }, 1000);
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

  // Handlers de navegação
  const handleNavigateToAgents = () => {
    setLocation('/agents');
  };

  const handleBackFromConversation = () => {
    // Implementar lógica de voltar se necessário
  };

  // Handlers da sidebar de conversas
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
    selectedAgentId: selectedAgentId.replace(/"/g, ''),
    messages,

    // Estados do chat window
    localMessages,
    currentMessage,
    messagesEndRef,

    // Estados do input
    messageInput,

    // Estados da sidebar de conversas
    newConversationMode,

    // Handlers principais
    handleSelectChat,
    handleNewConversation,
    handleUpdateThread,
    setMessages,

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
  };
}
