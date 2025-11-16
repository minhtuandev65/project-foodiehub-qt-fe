import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  StaffApi from '../../api/StaffApi'

const initialState = {
    user: {},
    restaurants:[],
    loadingGetRestaurants:false,
    restaurantDetail: {},
    loadingDetailRestaurant:false,
    listTableRestaurant:[],
    loadingGetTable: false
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
        })
         builder.addCase(getListRestaurant.pending, (state) => {
            state.loadingGetRestaurants = true;
        })
         builder.addCase(getListRestaurant.fulfilled, (state, { payload }) => {
            state.restaurants = payload?.data?.data;
            state.loadingGetRestaurants = false;
        })
         builder.addCase(getListRestaurant.rejected, (state) => {
           state.loadingGetRestaurants = false;
        })
        builder.addCase(getRestaurantDetail.pending, (state) => {
            state.loadingDetailRestaurant = true;
        })
         builder.addCase(getRestaurantDetail.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.restaurantDetail = payload?.data?.data;
            state.loadingGetRestaurants = false;
        })
         builder.addCase(getRestaurantDetail.rejected, (state) => {
           state.loadingDetailRestaurant = false;
        })
        builder.addCase(getListTableRestaurant.pending, (state) => {
            state.loadingGetTable = true;
        })
         builder.addCase(getListTableRestaurant.fulfilled, (state, { payload }) => {
            state.listTableRestaurant = payload?.data?.data;
            state.loadingGetTable = false;
        })
         builder.addCase(getListTableRestaurant.rejected, (state) => {
           state.loadingGetTable = false;
        })
    },
});

export const getProfile = createAsyncThunk("staff/getProfile", async (dispatch) => {
    const res = await StaffApi.getProfileApi()
    return res?.data?.data
})

export const updateProfile= createAsyncThunk('staff/updateProfile', async (values)=>{
    const res =await StaffApi.updateProfileApi(values)
    return res
})

export const getListRestaurant=createAsyncThunk('staff/getListRestaurant', async (filter)=>{
    const res = await StaffApi.getListRestaurantApi(filter);
    return res
})

export const getRestaurantDetail=createAsyncThunk('staff/getRestaurantDetail', async (id)=>{
    const res = await StaffApi.getRestaurantDetailApi(id);
    return res
})

export const getListTableRestaurant= createAsyncThunk('staff/getListTableRestaurant', async (restaurantId)=>{
    const res = await StaffApi.getListTableRestaurantApi(restaurantId);
    return res
})

export const { setUser } = StaffReducer.actions

export default StaffReducer.reducer