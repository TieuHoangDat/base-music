import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  // XÓA createTransform NẾU BẠN CÓ DÒNG NÀY Ở ĐÂY
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import musicPlayerReducer from './slices/musicPlayerSlice';

// XÓA TOÀN BỘ PHẦN musicPlayerTransform NÀY
// const musicPlayerTransform = createTransform(
//   (inboundState: any, key) => {
//     return inboundState;
//   },
//   (outboundState: any, key) => {
//     return {
//       ...outboundState,
//       currentTime: 0,
//       volume: 0.5,
//       isMuted: false,
//     };
//   },
//   { whitelist: ['musicPlayer'] }
// );


const persistConfig = {
  key: 'root', // key for localStorage
  version: 1,
  storage,
  whitelist: ['musicPlayer'], // Chỉ định reducer nào bạn muốn persist (currentSong, isPlaying, currentTime, volume, isMuted)
  // XÓA DÒNG transforms: [musicPlayerTransform], NẾU BẠN CÓ NÓ Ở ĐÂY
};

const persistedReducer = persistReducer(persistConfig, musicPlayerReducer);

export const store = configureStore({
  reducer: {
    musicPlayer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Định nghĩa RootState và AppDispatch cho TypeScrip
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;