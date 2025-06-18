import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isSubscribed: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        isLoggedIn: true,
        isSubscribed: action.payload?.isSubscribed || false,
        userInfo: action.payload,
      };
    },

    subscribeUser: (state) => {
      if (state) {
        state.isSubscribed = true;
      }
    },

    removeUser: () => {
      return {
        isLoggedIn: false,
        isSubscribed: false,
        userInfo: null,
      };
    },
  },
});

export const { addUser, removeUser, subscribeUser } = userSlice.actions;
export default userSlice.reducer;
