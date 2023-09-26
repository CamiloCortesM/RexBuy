import { UiState } from './';

type UiActionType =
  | { type: '[UI] - ToggleMenu' }
  | { type: '[UI] - activeSearchInput' };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case '[UI] - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isSearching: false,
      };
    case '[UI] - activeSearchInput':
      return {
        ...state,
        isMenuOpen: true,
        isSearching: true,
      };
    default:
      return state;
  }
};
