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
    clearExecResult() {
      return [];
    },
  },
});

export default slice.reducer;
const { clearExecResult, addExecResult } = slice.actions;
export { clearExecResult, addExecResult };
