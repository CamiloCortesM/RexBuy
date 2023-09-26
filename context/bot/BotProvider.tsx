import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';
import { BotContext, botReducer } from './';
import { rexbuyApi } from '@/axios';

export interface botState {
  isLoading: boolean;
  messages: {
    role: string;
    content: string;
  }[];
}

const BOT_INITIAL_STATE: botState = {
  isLoading: false,
  messages: [
    {
      role: 'assistant',
      content: 'Hola que tal ¿En que te puedo ayudar?',
    },
  ],
};

export const BotProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(botReducer, BOT_INITIAL_STATE);

  useEffect(() => {
    if (state.messages.length < 1) return;
    Cookie.set('bot', JSON.stringify(state.messages));
  }, [state.messages]);

  useEffect(() => {
    if (Cookie.get('bot')) {
      dispatch({
        type: '[bot] - LoadMessages',
        payload: JSON.parse(
          Cookie.get('bot') ||
            "[{role: 'assistant',content: 'Hola que tal ¿En que te puedo ayudar?'}]"
        ),
      });
    }
  }, []);

  const searchChunks = async (message: string) => {
    dispatch({ type: '[bot] - MessageUser', payload: message });

    try {
      const { data: answer } = await rexbuyApi.post('/chatbot', {
        messages: state.messages,
        message,
      });
      dispatch({ type: '[bot] - MessageBot', payload: answer });

    } catch (error) {
      console.log(error);
    }
  };

  const clearMessages = () => {
    dispatch({ type: '[bot] - ClearMessages' });
  };

  return (
    <BotContext.Provider
      value={{
        ...state,

        //Methods
        searchChunks,
        clearMessages,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};
