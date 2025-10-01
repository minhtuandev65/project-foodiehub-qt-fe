import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../../api/AuthApi'
import showMessage from '../../../Helper/showMessage';
import Cookies from 'js-cookie';

const initialState = {
    loadingLogin: false
}

const AuthReducer = createSlice({
    name: 'auth_reducer',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handelLogin.pending, (state, { payload }) => {
            state.loadingLogin = true
        })
        builder.addCase(handelLogin.fulfilled, (state, { payload }) => {
            state.loadingLogin = false
            Cookies.set("access_token", payload.data.accessToken);
            Cookies.set("user_id", payload.data.id);
        });
    },
});

export const handelLogin = createAsyncThunk('auth/login', async (values) => {
    try {
        const res = await login(values)
        return res?.data
    } catch (error) {
        console.log(error)
    }
})


export const { setUser } = AuthReducer.actions

export default AuthReducer.reducer