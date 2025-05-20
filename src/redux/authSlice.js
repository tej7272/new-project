import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData: null,
    status: false,
    message: 'User not logged in'
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {
        login: (state, action) => {
            state.userData = action.payload;
            state.status = true;
            state.message = 'User logged in'
        },
        logout: (state) => {
            state.userData = null;
            state.status = false;
            state.message = 'User logout';
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;