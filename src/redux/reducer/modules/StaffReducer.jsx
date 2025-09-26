import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  StaffApi from '../../api/StaffApi'

const initialState = {
    user: {}
}

const StaffReducer = createSlice({
    name: 'staff_reducer',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, { payload }) => {
            state.user = payload;
        });
    },
});

export const getProfile = createAsyncThunk("staff/getProfile", async (dispatch) => {
    const res = await StaffApi.getProfileApi()
    return res?.data?.data
})

export const { setUser } = StaffReducer.actions

export default StaffReducer.reducer