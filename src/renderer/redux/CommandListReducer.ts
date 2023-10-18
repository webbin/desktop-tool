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
      const key = action.payload;
      const index = state.findIndex((item) => item.key === key);
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
    updateCommandTagByKey(
      state,
      action: PayloadAction<{ key: string; tag: string }>
    ) {
      const { key, tag } = action.payload;
      const index = state.findIndex((item) => item.key === key);
      if (index >= 0) {
        state[index].tag = tag;
      }
    },
  },
});

const { actions, reducer } = info;

export default reducer;

export { actions };
