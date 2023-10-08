import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { CommandData } from '../types';

type CommandInfo = {
  execResult: string;
};

const InitialState: CommandInfo = {
  execResult: '',
};

const slice = createSlice({
  name: 'commandInfo',
  initialState: InitialState,
  reducers: {
    setExecResult(state, action: PayloadAction<string>) {
      state.execResult = action.payload;
    },
  },
});

export default slice.reducer;
const { setExecResult } = slice.actions;
export { setExecResult };
