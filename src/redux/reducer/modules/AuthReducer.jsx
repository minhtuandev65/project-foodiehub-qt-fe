import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, logout } from '../../api/AuthApi'
import Cookies from 'js-cookie';
import showMessage from '../../../Helper/showMessage';

const initialState = {
    loadingLogin: false,
    loadingLogout: false
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
        })
        builder.addCase(handleLogout.pending, (state, { payload }) => {
            state.loadingLogout = true
        })
        builder.addCase(handleLogout.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loadingLogout = false
            Cookies.remove("access_token");
            // showMessage(payload?.message, payload?.status)
        })
        builder.addCase(handleLogout.rejected, (state, { payload }) => {
            state.loadingLogout = false
        })
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

export const handleLogout = createAsyncThunk('auth/logout', async () => {
    try {
        const res = await logout()
        return res?.data
    } catch (error) {
        console.log(error)
    }
})


export const { setUser } = AuthReducer.actions

export default AuthReducer.reducer