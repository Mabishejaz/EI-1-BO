
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  composeOpen: boolean;
  settingsOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  sidebarOpen: true,
  composeOpen: false,
  settingsOpen: false,
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openCompose: (state) => {
      state.composeOpen = true;
    },
    closeCompose: (state) => {
      state.composeOpen = false;
    },
    toggleSettings: (state) => {
      state.settingsOpen = !state.settingsOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  openCompose,
  closeCompose,
  toggleSettings,
  setTheme
} = uiSlice.actions;

export default uiSlice.reducer;
