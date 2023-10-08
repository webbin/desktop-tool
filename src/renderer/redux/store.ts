import { configureStore } from '@reduxjs/toolkit';

import RoleDataReducer from './RoleDataReducer';
import GlobalDataReducer from './GlobalDataReducer';
import UserDataReducer from './UserDataReducer';

export const store = configureStore({
  reducer: {
    roleData: RoleDataReducer,
    globalData: GlobalDataReducer,
    userData: UserDataReducer,
  },
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
