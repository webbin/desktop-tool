import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CommandSearchMap, CommandSearchInfo } from '../types';

type CommandInfo = {
  execResult: string;
  selectedTagList: string[];
  commandSearchMap: CommandSearchMap;
  runningKeyList: string[];
};

const InitialState: CommandInfo = {
  execResult: '',
  selectedTagList: [],
  commandSearchMap: {},
  runningKeyList: [],
};

const slice = createSlice({
  name: 'commandInfo',
  initialState: InitialState,
  reducers: {
    setExecResult(state, action: PayloadAction<string>) {
      state.execResult = action.payload;
    },
    clearSeletedTags(state) {
      state.selectedTagList = [];
    },
    setSeletedTags(state, action: PayloadAction<string[]>) {
      state.selectedTagList = action.payload;
    },
    addSelectedTag(state, action: PayloadAction<string>) {
      state.selectedTagList.push(action.payload);
    },
    deleteSelectedTag(state, action: PayloadAction<string>) {
      const index = state.selectedTagList.findIndex(
        (item) => action.payload === item
      );
      if (index >= 0) {
        state.selectedTagList.splice(index, 1);
      }
    },
    putSearchCommand: (
      state,
      action: PayloadAction<{
        key: string;
        data: CommandSearchInfo;
      }>
    ) => {
      const { key, data } = action.payload;
      state.commandSearchMap[key] = data;
    },
    addRunningCommand(state, action: PayloadAction<string>) {
      state.runningKeyList.push(action.payload);
    },
    deleteRunningCommand(state, action: PayloadAction<string>) {
      const index = state.runningKeyList.findIndex(
        (item) => action.payload === item
      );
      if (index >= 0) {
        state.runningKeyList.splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

const { actions } = slice;
export { actions };
