import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  ManagerAPI from '../../api/ManagerApi'
import showMessage from '../../../Helper/showMessage'

const initialState = {
    loadingGetListRes: false,
    listRes: [],
    loadingDetail: [],
    itemDetail: {},
    loadingCreate: false ,
    loadingEdit:false
}

const ManagerReducer = createSlice({
    name: 'manager_reducer',
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
        builder.addCase(handleSeeDetailRes.pending, (state) => {
            state.loadingDetail = true
        });
        builder.addCase(handleSeeDetailRes.fulfilled, (state, { payload }) => {
            state.itemDetail = payload?.data?.data
            state.loadingDetail = false
        });
         builder.addCase(handleCreateNewRestaurant.pending, (state) => {
            state.loadingCreate = true
        });
         builder.addCase(handleCreateNewRestaurant.fulfilled, (state, { payload }) => {
            state.loadingCreate = false
            showMessage(payload?.data?.message, 'success')
        });
         builder.addCase(handleEditRestaurant.pending, (state) => {
            state.loadingEdit = true
        });
         builder.addCase(handleEditRestaurant.fulfilled, (state, { payload }) => {
            state.loadingEdit = false
            showMessage(payload?.data?.message, 'success')
        });
    },
});

export const handelGetRestaurant = createAsyncThunk('manager/get-list-restaurant', async () => {
    try {
        const res = await ManagerAPI.getListRestaurant()
        return res?.data?.data?.restaurantList
    } catch (error) {
        console.log(error)
    }
})

export const handleCreateNewRestaurant = createAsyncThunk('manager/create-new-restaurant', async (value) => {
    try {
        const res = await ManagerAPI.createNewRestaurant(value)
        return res
    } catch (error) {
        console.log(error)
    }
})

export const handleSeeDetailRes = createAsyncThunk('manager/see-detail-res', async (id) => {
    try {
        const res = await ManagerAPI.detailRestaurant(id)
        console.log(res?.data)
        return res
    } catch (error) {
        console.log(error)
    }
})


export const handleEditRestaurant = createAsyncThunk('manager/edit-res', async ({id, values}) => {
    try {
        const res = await ManagerAPI.editRestaurant(id, values)
        return res
    } catch (error) {
        console.log(error)
    }
})


export const { setUser } = ManagerReducer.actions

export default ManagerReducer.reducer