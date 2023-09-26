import { createContext } from 'react';

interface ContextProps {
  isMenuOpen : boolean;
  isSearching: boolean;
  toggleSideMenu: () => void;
  activateSearchInput: () => void;
}

export const UiContext = createContext({} as ContextProps);
