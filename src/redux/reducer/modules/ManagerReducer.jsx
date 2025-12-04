import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  ManagerAPI from '../../api/ManagerApi'
import showMessage from '../../../Helper/showMessage'

const initialState = {
    loadingGetListRes: false,
    listRes: [],
    loadingDetail: [],
    itemDetail: {},
    loadingCreate: false,
    loadingEdit: false,
    restaurantDetail: {},
    loadingDetailRestaurant: false,
    dataComment: [],
    loadingCreateComment: false,
    loadingGetComment: false,
    loadingDeleteComment: false,
    loadingGetStaff:false,
    dataStaff:[]
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
        }),
        builder.addCase(createComment.pending, (state) => {
                state.loadingCreateComment = true;
        })
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.dataComment.commentList.push(payload?.data?.data)
            state.loadingCreateComment = false;
        })
        builder.addCase(createComment.rejected, (state) => {
            state.loadingCreateComment = false;
        }),
        builder.addCase(getStaff.pending, (state) => {
                state.loadingGetStaff = true;
        })
        builder.addCase(getStaff.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.dataStaff= payload.data.data
            state.loadingGetStaff = false;
        })
        builder.addCase(getStaff.rejected, (state) => {
            state.loadingGetStaff = false;
        })
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


export const handleEditRestaurant = createAsyncThunk('manager/edit-res', async ({ id, values }) => {
    try {
        const res = await ManagerAPI.editRestaurant(id, values)
        return res
    } catch (error) {
        console.log(error)
    }
})

export const getRestaurantDetail = createAsyncThunk('manager/getRestaurantDetail', async (id) => {
    const res = await ManagerAPI.getRestaurantDetailApi(id);
    return res
})

export const createTable = createAsyncThunk('manager/createTable', async ({ restaurantId, values }) => {
    const res = await ManagerAPI.createTableApi({ restaurantId, values });
    return res
})

export const createComment = createAsyncThunk('staff/createComment', async (data) => {
    const res = await ManagerAPI.createCommentApi(data);
    return res
})

export const getComments = createAsyncThunk('staff/getComments', async (restaurantId) => {
    const res = await ManagerAPI.getCommentsApi(restaurantId);
    return res
})

export const deleteComment = createAsyncThunk(
    'staff/deleteComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const res = await ManagerAPI.deleteCommentApi(commentId);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const getStaff = createAsyncThunk(
    'staff/getStaff',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const res = await ManagerAPI.getStaffApi(restaurantId);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const { setUser } = ManagerReducer.actions

export default ManagerReducer.reducer