import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SpawnData } from '../types';

const initialState: SpawnData[] = [];

const info = createSlice({
  name: 'spawnList',
  initialState,
  reducers: {
    addSpawn: (state, action: PayloadAction<SpawnData>) => {
      state.push(action.payload);
    },
    deleteSpawn: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((spawn) => spawn.key === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateSpawn: (state, action: PayloadAction<SpawnData>) => {
      const { key } = action.payload;
      const index = state.findIndex((spawn) => spawn.key === key);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updateSpawnTagByKey: (
      state,
      action: PayloadAction<{ key: string; tag: string }>
    ) => {
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
