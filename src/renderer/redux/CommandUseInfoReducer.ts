import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { CommandData } from '../types';

type CommandUseInfo = {
  [key: string]: number;
};

type UpdateCommandUseData = {
  key: string;
  count: number;
};

const InitialState: CommandUseInfo = {};

const CommandUseInfoSlice = createSlice({
  name: 'commandUseInfo',
  initialState: InitialState,
  reducers: {
    updateCommandUse(state, action: PayloadAction<UpdateCommandUseData>) {
      state[action.payload.key] = action.payload.count;
    },
    addCommandUse(state, action: PayloadAction<string>) {
      state[action.payload] = (state[action.payload] || 0) + 1;
    },
  },
});

export default CommandUseInfoSlice.reducer;
const { actions } = CommandUseInfoSlice;
export { actions };
