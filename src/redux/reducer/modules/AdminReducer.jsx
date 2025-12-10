import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import * as  AdminApi from '../../api/AdminApi'
import showMessage from '../../../Helper/showMessage'

const initialState = {
    loadingGetListRes: false,
    listRes: [],
    loadingDetail: [],
    itemDetail: {},
    loadingCreate: false,
    loadingEdit: false,
    loadingAccept: false,
    loadingGetListUser: false,
    dataStaff: {
        userList: []
    },
    userData: {},
    loadingGetUserData: false,
    loadingLock: false
}

const AdminReducer = createSlice({
    name: 'admin_reducer',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setLoadingGetUserData: (state, { payload }) => {
            state.loadingGetUserData = payload
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
        builder.addCase(handleAcceptRestaurant.fulfilled, (state, { payload }) => {
            state.loadingAccept = false
            showMessage(payload?.data?.message, 'success')
            handelGetRestaurant()
        })
        builder.addCase(getStaff.pending, (state) => {
            state.loadingGetListUser = true
        })
        builder.addCase(getStaff.fulfilled, (state, { payload }) => {
            state.dataStaff.userList = payload?.data?.data?.userList
            state.loadingGetListUser = false
        })
        builder.addCase(getStaff.rejected, (state, { payload }) => {
            state.loadingGetListUser = false
        })
        builder.addCase(getUserDetail.pending, (state) => {
            state.loadingGetUserData = true
        })
        builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
            state.userData = payload?.data?.data
            state.loadingGetUserData = false
        })
        builder.addCase(getUserDetail.rejected, (state, { payload }) => {
            state.loadingGetUserData = false
        })
        builder.addCase(lockUser.pending, (state) => {
            state.loadingLock = true
        })
        builder.addCase(lockUser.fulfilled, (state, { payload }) => {
            const indexFind = current(state.dataStaff.userList).findIndex(
                (item) => item?._id == payload?.data?.data?._id
            );
            if (indexFind !== -1) {
                // update item
                state.dataStaff.userList[indexFind] = payload?.data?.data;
            } else {
                // add new item
                state.dataStaff.userList[indexFind] = payload?.data?.data;
            }
            state.loadingLock = false
        })
        builder.addCase(lockUser.rejected, (state, { payload }) => {
            state.loadingLock = false
        })
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

export const getStaff = createAsyncThunk('manager/get-list-user', async () => {
    try {
        const res = await AdminApi.getStaffApi()
        return res
    } catch (error) {
        console.log(error)
    }
})

export const getUserDetail = createAsyncThunk('manager/get-user-detail', async (userId) => {
    try {
        const res = await AdminApi.getUserDetailApi(userId)
        return res
    } catch (error) {
        console.log(error)
    }
})

export const lockUser = createAsyncThunk('manager/lock-user', async (userId) => {
    try {
        const res = await AdminApi.lockUserApi(userId)
        return res
    } catch (error) {
        console.log(error)
    }
})




export const { setUser, setLoadingGetUserData } = AdminReducer.actions

export default AdminReducer.reducer