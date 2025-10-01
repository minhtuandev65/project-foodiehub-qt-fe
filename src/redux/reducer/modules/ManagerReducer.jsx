import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  ManagerAPI from '../../api/ManagerApi'

const initialState = {
    loadingGetListRes: false,
    listRes: [],
    loadingDetail: [],
    itemDetail: {}
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
        builder.addCase(handelGetRestaurant.pending, (state, { payload }) => {
            state.loadingGetListRes = true
        })
        builder.addCase(handelGetRestaurant.fulfilled, (state, { payload }) => {
            state.listRes = payload
            state.loadingGetListRes = false
        });
        builder.addCase(handleSeeDetailRes.pending, (state, { payload }) => {
            state.loadingDetail = true
        });
        builder.addCase(handleSeeDetailRes.fulfilled, (state, { payload }) => {
            state.itemDetail = payload?.data?.data
            state.loadingDetail = false
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
        console.log(res)
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


export const { setUser } = ManagerReducer.actions

export default ManagerReducer.reducer