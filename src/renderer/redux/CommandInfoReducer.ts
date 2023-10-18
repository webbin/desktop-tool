import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { CommandData } from '../types';

type CommandInfo = {
  execResult: string;
  selectedTagList: string[];
};

const InitialState: CommandInfo = {
  execResult: '',
  selectedTagList: [],
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
  },
});

export default slice.reducer;

const { actions } = slice;
export { actions };
