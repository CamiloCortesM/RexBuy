import { botState } from './';

type botActionType =
  | { type: '[bot] - MessageBot'; payload: string }
  | { type: '[bot] - MessageUser'; payload: string }
  | {
      type: '[bot] - LoadMessages';
      payload: {
        role: string;
        content: string;
      }[];
    }
  | { type: '[bot] - ClearMessages' }
  | { type: '[bot] - isLoading' };

export const botReducer = (
  state: botState,
  action: botActionType
): botState => {
  switch (action.type) {
    case '[bot] - MessageUser':
      return {
        ...state,
        isLoading: true,
        messages: [
          ...state.messages,
          { role: 'user', content: action.payload },
        ],
      };
    case '[bot] - MessageBot':
      return {
        ...state,
        isLoading: false,
        messages: [
          ...state.messages,
          { role: 'assistant', content: action.payload },
        ],
      };
    case '[bot] - LoadMessages':
      return {
        ...state,
        isLoading: false,
        messages:action.payload
      };
    case '[bot] - ClearMessages':
      return {
        ...state,
        messages: [{ role: 'assistant', content: 'Hola que tal ¿En que te puedo ayudar?' }],
      };
    case '[bot] - isLoading':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
