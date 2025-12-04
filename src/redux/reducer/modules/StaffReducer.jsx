import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as  StaffApi from '../../api/StaffApi'
import showMessage from '../../../Helper/showMessage';

const initialState = {
    user: {},
    restaurants: [],
    loadingGetRestaurants: false,
    restaurantDetail: {},
    loadingDetailRestaurant: false,
    listTableRestaurant: [],
    loadingGetTable: false,
    loadingLike: false,
    dataComment: [],
    loadingCreateComment: false,
    loadingGetComment: false,
    loadingDeleteComment: false,
    loadingRating: false
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
        builder.addCase(likeRestaurant.pending, (state) => {
            state.loadingLike = true;
        })
        builder.addCase(likeRestaurant.fulfilled, (state, { payload }) => {
            state.loadingLike = false;
            if (payload?.data?.status == 'success') {
                state.restaurants.restaurantList = state.restaurants.restaurantList?.map((item) => {
                    if (payload?.data?.data?.restaurantId === item?._id) {
                        return {
                            ...item,
                            favorite: true
                        }
                    }
                    return item
                })
                showMessage(payload?.data?.message, 'success')
            }
        })
        builder.addCase(likeRestaurant.rejected, (state) => {
            state.loadingLike = false;
        }),
            builder.addCase(getComments.pending, (state) => {
                state.loadingGetComment = true;
            })
        builder.addCase(getComments.fulfilled, (state, { payload }) => {
            state.dataComment = payload?.data?.data;
            state.loadingGetComment = false;
        })
        builder.addCase(getComments.rejected, (state) => {
            state.loadingGetComment = false;
        })
        builder.addCase(createComment.pending, (state) => {
            state.loadingCreateComment = true;
        })
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.dataComment.commentList.push(payload?.data?.data)
            state.loadingCreateComment = false;
        })
        builder.addCase(createComment.rejected, (state) => {
            state.loadingCreateComment = false;
        })
        builder.addCase(deleteComment.pending, (state) => {
            state.loadingDeleteComment = true;
        })
        builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
            state.dataComment.commentList = state.dataComment.commentList.filter((item) => item?._id != payload?.data?.data?._id)
            state.loadingDeleteComment = false;
            showMessage(payload?.data?.message, 'success')
        })
        builder.addCase(deleteComment.rejected, (state, {payload}) => {
            state.loadingDeleteComment = false;
            showMessage(payload?.message, 'error')

        }),
         builder.addCase(ratingRestaurant.pending, (state) => {
            state.loadingRating = true;
        })
        builder.addCase(ratingRestaurant.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loadingRating = false;
            state.restaurantDetail={...state.restaurantDetail, rating: payload?.data?.data?.rating}
            showMessage(payload?.data?.message, 'success')
        })
        builder.addCase(ratingRestaurant.rejected, (state, {payload}) => {
            state.loadingRating = false;
            showMessage(payload?.message, 'error')

        })
    },
});

export const getProfile = createAsyncThunk("staff/getProfile", async (dispatch) => {
    const res = await StaffApi.getProfileApi()
    return res?.data?.data
})

export const updateProfile = createAsyncThunk('staff/updateProfile', async (values) => {
    const res = await StaffApi.updateProfileApi(values)
    return res
})

export const getListRestaurant = createAsyncThunk('staff/getListRestaurant', async (filter) => {
    const res = await StaffApi.getListRestaurantApi(filter);
    return res
})

export const getRestaurantDetail = createAsyncThunk('staff/getRestaurantDetail', async (id) => {
    const res = await StaffApi.getRestaurantDetailApi(id);
    return res
})

export const getListTableRestaurant = createAsyncThunk('staff/getListTableRestaurant', async (restaurantId) => {
    const res = await StaffApi.getListTableRestaurantApi(restaurantId);
    return res
})

export const likeRestaurant = createAsyncThunk('staff/likeRestaurant', async (restaurantId) => {
    const res = await StaffApi.likeRestaurantApi(restaurantId);
    return res
})

export const createComment = createAsyncThunk('staff/createComment', async (data) => {
    const res = await StaffApi.createCommentApi(data);
    return res
})

export const getComments = createAsyncThunk('staff/getComments', async (restaurantId) => {
    const res = await StaffApi.getCommentsApi(restaurantId);
    return res
})

export const deleteComment = createAsyncThunk(
    'staff/deleteComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const res = await StaffApi.deleteCommentApi(commentId);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const ratingRestaurant= createAsyncThunk(
    'staff/ratingRestaurant',
    async (data, { rejectWithValue }) => {
        try {
            const res = await StaffApi.ratingApi(data);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);




export const { setUser } = StaffReducer.actions

export default StaffReducer.reducer