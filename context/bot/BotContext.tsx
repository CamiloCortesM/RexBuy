import { createContext } from 'react';

interface ContextProps {
  isLoading: boolean;
  messages: {
    role: string;
    content: string;
  }[];

  searchChunks: (message: string) => Promise<void>;
  clearMessages: () => void;
}

export const BotContext = createContext({} as ContextProps);
