import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  AdminApi from '../../api/AdminApi'
import showMessage from '../../../Helper/showMessage'

const initialState = {
    loadingGetListRes: false,
    listRes: [],
    loadingDetail: [],
    itemDetail: {},
    loadingCreate: false ,
    loadingEdit:false,
    loadingAccept:false
}

const AdminReducer = createSlice({
    name: 'admin_reducer',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handelGetRestaurant.pending, (state) => {
            state.loadingGetListRes = true
        })
        builder.addCase(handelGetRestaurant.fulfilled, (state, { payload }) => {
            state.listRes = payload
            state.loadingGetListRes = false
        });
        builder.addCase(handleAcceptRestaurant.pending, (state) => {
            state.loadingAccept = true
        })
        builder.addCase(handleAcceptRestaurant.fulfilled, (state, {payload}) => {
            state.loadingAccept = false
            showMessage(payload?.data?.message, 'success')
            handelGetRestaurant()
        });
    },
});

export const handelGetRestaurant = createAsyncThunk('manager/get-list-restaurant', async () => {
    try {
        const res = await AdminApi.getListRestaurant()
        return res?.data?.data?.restaurantList
    } catch (error) {
        console.log(error)
    }
})

export const handleAcceptRestaurant = createAsyncThunk('manager/accept-restaurant', async (id) => {
    try {
        const res = await AdminApi.acceptRestaurant(id)
        return res
    } catch (error) {
        console.log(error)
    }
})



export const { setUser } = AdminReducer.actions

export default AdminReducer.reducer