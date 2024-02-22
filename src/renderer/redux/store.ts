import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import commandList from './CommandListReducer';
import spawnList from './SpawnListReducer';
import commandInfo from './CommandInfoReducer';
import commandResultList from './CommandResultList';
import commandUseInfo from './CommandUseInfoReducer';

const rootReducer = combineReducers({
  commandList,
  commandInfo,
  commandResultList,
  commandUseInfo,
  spawnList,
});
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['commandList', 'commandUseInfo', 'SpawnList'],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store, {}, () => {
  console.log('-------persitor----------');
  console.log('rehydration is finished');
  console.log(store.getState());
  console.log('-------persitor----------');
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
export { store, persistor };
