import { useState } from 'react';
import type { Message, Chat } from '../types';
import { useSessionStorage } from '@uidotdev/usehooks';

export function useChatModel() {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedAgentId] = useSessionStorage<string>('x-selected-agent-id', '');

  const selectedChat =
    chats !== null ? chats.find((chat: Chat) => chat._id === selectedChatId) : null;

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleNewConversation = () => {
    const newChat: Chat = {
      _id: `temp-${Date.now()}`,
      title: `Chat ${chats ? chats.length + 1 : 1}`,
      user_id: 'temp-user', // Valor temporário
      agent_id: selectedAgentId.replace('"', ''), // Usar o agente selecionado
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setChats((prev: Chat[] | null) => {
      if (prev === null) return [newChat];
      return [...prev, newChat];
    });

    setSelectedChatId(newChat._id);
  };

  const handleUpdateThread = (chatId: string, messages: Message[]) => {
    setChats((prev: Chat[] | null) => {
      if (prev === null) return null;
      return prev.map((chat: Chat) => (chat._id === chatId ? { ...chat, messages } : chat));
    });
  };

  return {
    chats,
    selectedChatId,
    selectedChat,
    selectedAgentId: selectedAgentId.replace('"', ''),
    handleSelectChat,
    handleNewConversation,
    handleUpdateThread,
    messages,
    setMessages,
  };
}
