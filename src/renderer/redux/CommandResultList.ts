import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CommandResultInfo } from '../types';

const InitialState: CommandResultInfo[] = [];

const slice = createSlice({
  name: 'commandResultList',
  initialState: InitialState,
  reducers: {
    addExecResult(state, action: PayloadAction<CommandResultInfo>) {
      state.push(action.payload);
    },
    updateExecResult(state, action: PayloadAction<Partial<CommandResultInfo>>) {
      const index = state.findIndex(
        (item) => item.startTimestamp === action.payload.startTimestamp
      );
      if (index !== -1) {
        const old = state[index];
        state[index] = { ...old, ...action.payload };
      }
    },
    clearExecResult() {
      return [];
    },
  },
});

export default slice.reducer;
const { actions } = slice;
export { actions };
