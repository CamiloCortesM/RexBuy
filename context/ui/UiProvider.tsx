import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from '.';

export interface UiState {
  isMenuOpen: boolean;
  isSearching: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
  isSearching: false,
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' });
  };

  const activateSearchInput = () => {
    dispatch({ type: '[UI] - activeSearchInput' });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSideMenu,
        activateSearchInput,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
