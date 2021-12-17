import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        authStatus: 'PENDING'
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthStatus: (state, action) => {
            state.authStatus = action.payload;
        }
    }
});

export const { setUser, setAuthStatus } = userSlice.actions;
export default userSlice.reducer;