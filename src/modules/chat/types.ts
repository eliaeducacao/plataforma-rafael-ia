export type { Agent } from '@/shared/types';

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export interface Chat {
  _id: string;
  title: string;
  user_id: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  role: string;
  message: string;
  isStreaming?: boolean;
  timestamp?: number;
  attachedFiles?: AttachedFile[];
}

export interface AttachedFile {
  filename: string;
  mimeType: string;
  size: number;
  contentBase64?: string;
  id?: string;
}
