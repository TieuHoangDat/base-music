import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    clearUserInfo: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
    }
  }
});

export const { updateUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
