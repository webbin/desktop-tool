/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CommandData } from '../types';

const initialState: CommandData[] = [];

const info = createSlice({
  name: 'commandList',
  initialState,
  reducers: {
    initCommands(state, action: PayloadAction<CommandData[]>) {
      return action.payload;
    },
    addCommand: (state, action: PayloadAction<CommandData>) => {
      state.push(action.payload);
    },
    deleteCommand(state, action: PayloadAction<string>) {
      const cmd = action.payload;
      const index = state.findIndex((item) => item.command === cmd);
      if (index >= 0) {
        state.splice(index, 1);
      }
    },
    updateCommand(state, action: PayloadAction<CommandData>) {
      const { key } = action.payload;
      const index = state.findIndex((item) => item.key === key);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    updateCommandTagByIndex(
      state,
      action: PayloadAction<{ index: number; tag: string }>
    ) {
      const { index, tag } = action.payload;
      if (state[index]) {
        state[index].tag = tag;
      }
    },
  },
});

const { actions, reducer } = info;

export default reducer;

export { actions };
