import { configureStore } from '@reduxjs/toolkit';

import commandList from './CommandListReducer';
import commandInfo from './CommandInfoReducer';
import commandResultList from './CommandResultList';

export const store = configureStore({
  reducer: {
    commandList,
    commandInfo,
    commandResultList,
  },
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
