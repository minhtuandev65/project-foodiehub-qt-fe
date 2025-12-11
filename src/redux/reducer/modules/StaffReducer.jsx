import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as StaffApi from "../../api/StaffApi";
import showMessage from "../../../Helper/showMessage";
import { t } from "i18next";

const initialState = {
	user: {},
	restaurants: [],
	loadingGetRestaurants: false,
	restaurantDetail: {},
	loadingDetailRestaurant: false,
	listTableRestaurant: [],
	loadingGetTable: false,
	loadingLike: false,
	dataComment: {
		commentList: []
	},
	loadingCreateComment: false,
	loadingGetComment: false,
	loadingDeleteComment: false,
	loadingRating: false,
	listBookTable: [],
	loadingGetBookTable: false,
	listMenu: [],
	loadingGetMenu: false,
	listCartItems: {
		cartItemsList: [],
	},
	loadingGetCartItems: false,
	loadingOrderMenu: false,
	listCartItemsStaff: {
		cartItemsList: [],
	},
	loadingGetCartItemsStaff: false,
	listTableMyRes: {
		data: [],
		limit: 0,
		page: 1,
		total: 0,
	},
	loadingMyRestaurant: false,
	loadinggetUserBookTableList: false,
	listUserBookTable: [],
};

const StaffReducer = createSlice({
	name: "staff_reducer",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		setListCartItems: (state, { payload }) => {
			state.listCartItems.cartItemsList = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProfile.fulfilled, (state, { payload }) => {
			state.user = payload;
		});
		builder.addCase(getListRestaurant.pending, (state) => {
			state.loadingGetRestaurants = true;
		});
		builder.addCase(getListRestaurant.fulfilled, (state, { payload }) => {
			state.restaurants = payload?.data?.data;
			state.loadingGetRestaurants = false;
		});
		builder.addCase(getBookingTable.fulfilled, (state, { payload }) => {
			state.listBookTable = payload?.data?.data;
			state.loadingGetBookTable = false;
		});
		builder.addCase(getListMenu.fulfilled, (state, { payload }) => {
			state.listMenu = payload?.data?.data;
			state.loadingGetMenu = false;
		});
		builder.addCase(getListRestaurant.rejected, (state) => {
			state.loadingGetRestaurants = false;
		});
		builder.addCase(getRestaurantDetail.pending, (state) => {
			state.loadingDetailRestaurant = true;
		});
		builder.addCase(getRestaurantDetail.fulfilled, (state, { payload }) => {
			state.restaurantDetail = payload?.data?.data;
			state.loadingGetRestaurants = false;
		});
		builder.addCase(getRestaurantDetail.rejected, (state) => {
			state.loadingDetailRestaurant = false;
		});
		builder.addCase(getListTableRestaurant.pending, (state) => {
			state.loadingGetTable = true;
		});
		builder.addCase(getListTableRestaurant.fulfilled, (state, { payload }) => {
			state.listTableRestaurant = payload?.data?.data;
			state.loadingGetTable = false;
		});
		builder.addCase(getListTableRestaurant.rejected, (state) => {
			state.loadingGetTable = false;
		});
		builder.addCase(likeRestaurant.pending, (state) => {
			state.loadingLike = true;
		});
		builder.addCase(likeRestaurant.fulfilled, (state, { payload }) => {
			state.loadingLike = false;
			if (payload?.data?.status == "success") {
				state.restaurants.restaurantList =
					state.restaurants.restaurantList?.map((item) => {
						if (payload?.data?.data?.restaurantId === item?._id) {
							return {
								...item,
								favorite: true,
							};
						}
						return item;
					});
				showMessage(payload?.data?.message, "success");
			}
		});
		builder.addCase(likeRestaurant.rejected, (state) => {
			state.loadingLike = false;
		}),
			builder.addCase(getComments.pending, (state) => {
				state.loadingGetComment = true;
			});
		builder.addCase(getComments.fulfilled, (state, { payload }) => {
			state.dataComment = payload?.data?.data;
			state.loadingGetComment = false;
		});
		builder.addCase(getComments.rejected, (state) => {
			state.loadingGetComment = false;
		});
		builder.addCase(createComment.pending, (state) => {
			state.loadingCreateComment = true;
		});
		builder.addCase(createComment.fulfilled, (state, { payload }) => {
			state.dataComment.commentList = [...state.dataComment.commentList, payload?.data?.data];
			state.loadingCreateComment = false;
		});
		builder.addCase(createComment.rejected, (state) => {
			state.loadingCreateComment = false;
		});
		builder.addCase(deleteComment.pending, (state) => {
			state.loadingDeleteComment = true;
		});
		builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
			state.dataComment.commentList = state.dataComment.commentList.filter(
				(item) => item?._id != payload?.data?.data?._id
			);
			state.loadingDeleteComment = false;
			showMessage(payload?.data?.message, "success");
		});
		builder.addCase(deleteComment.rejected, (state, { payload }) => {
			state.loadingDeleteComment = false;
			showMessage(payload?.message, "error");
		}),
			builder.addCase(ratingRestaurant.pending, (state) => {
				state.loadingRating = true;
			});
		builder.addCase(ratingRestaurant.fulfilled, (state, { payload }) => {
			state.loadingRating = false;
			state.restaurantDetail = {
				...state.restaurantDetail,
				rating: payload?.data?.data?.rating,
			};
			showMessage(payload?.data?.message, "success");
		});
		builder.addCase(ratingRestaurant.rejected, (state, { payload }) => {
			state.loadingRating = false;
			showMessage(payload?.message, "error");
		});
		builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
			state.listCartItems = payload?.data?.data || [];
			state.loadingGetCartItems = false;
		});
		builder.addCase(getUserBookTableList.fulfilled, (state, { payload }) => {
			state.listUserBookTable = payload?.data?.data || [];
			state.loadinggetUserBookTableList = false;
		});
		builder.addCase(getCartItemsStaff.fulfilled, (state, { payload }) => {
			state.listCartItemsStaff = payload?.data?.data || [];
			state.loadingGetCartItemsStaff = false;
		});
		builder.addCase(orderMenu.pending, (state) => {
			state.loadingOrderMenu = true;
		});
		builder.addCase(orderMenu.fulfilled, (state, { payload }) => {
			state.loadingOrderMenu = false;
			const indexFind = current(state.listCartItems.cartItemsList).findIndex(
				(item) => item?._id == payload?.data?.data?._id
			);
			if (indexFind !== -1) {
				// update item
				state.listCartItems.cartItemsList[indexFind] = payload?.data?.data;
			} else {
				// add new item
				state.listCartItems.cartItemsList.push(payload?.data?.data);
			}

			state.loadingOrderMenu = false;
			showMessage(t("orderSuccess"), "success");
		});

		builder.addCase(orderMenu.rejected, (state, { payload }) => {
			state.loadingOrderMenu = false;
			showMessage(payload?.message, 'error')
		});
		builder.addCase(getMyRestaurant.pending, (state) => {
			state.loadingMyRestaurant = true;
		});
		builder.addCase(getMyRestaurant.fulfilled, (state, { payload }) => {
			state.listTableMyRes = payload?.data?.data;
			state.loadingMyRestaurant = false;
		});

		builder.addCase(getMyRestaurant.rejected, (state, { payload }) => {
			state.loadingMyRestaurant = false;
		});
		// builder.addCase(increaseQuantity.fulfilled, (state, { payload }) => {
		// 	state.listTableMyRes = payload?.data?.data;
		// 	state.loadingMyRestaurant = false;
		// })
	},
});

export const getProfile = createAsyncThunk("staff/getProfile", async () => {
	const res = await StaffApi.getProfileApi();
	return res?.data?.data;
});

export const updateProfile = createAsyncThunk(
	"staff/updateProfile",
	async (values) => {
		const res = await StaffApi.updateProfileApi(values);
		return res;
	}
);

export const getListRestaurant = createAsyncThunk(
	"staff/getListRestaurant",
	async (filter) => {
		const res = await StaffApi.getListRestaurantApi(filter);
		return res;
	}
);

export const getRestaurantDetail = createAsyncThunk(
	"staff/getRestaurantDetail",
	async (id) => {
		const res = await StaffApi.getRestaurantDetailApi(id);
		return res;
	}
);

export const getListTableRestaurant = createAsyncThunk(
	"staff/getListTableRestaurant",
	async (restaurantId) => {
		const res = await StaffApi.getListTableRestaurantApi(restaurantId);
		return res;
	}
);
export const getListMenuRestaurant = createAsyncThunk(
	"staff/getListMenuRestaurant",
	async (restaurantId) => {
		const res = await StaffApi.getListMenuRestaurantApi(restaurantId);
		return res;
	}
);
export const bookingTable = createAsyncThunk(
	"staff/bookingTable",
	async (data) => {
		const res = await StaffApi.bookTable(data);
		return res;
	}
);

export const likeRestaurant = createAsyncThunk(
	"staff/likeRestaurant",
	async (restaurantId) => {
		const res = await StaffApi.likeRestaurantApi(restaurantId);
		return res;
	}
);

export const createComment = createAsyncThunk(
	"staff/createComment",
	async (data) => {
		const res = await StaffApi.createCommentApi(data);
		return res;
	}
);

export const getComments = createAsyncThunk(
	"staff/getComments",
	async (restaurantId) => {
		const res = await StaffApi.getCommentsApi(restaurantId);
		return res;
	}
);

export const deleteComment = createAsyncThunk(
	"staff/deleteComment",
	async (commentId, { rejectWithValue }) => {
		try {
			const res = await StaffApi.deleteCommentApi(commentId);
			return res;
		} catch (error) {
			return rejectWithValue(error.response?.data || error);
		}
	}
);

export const ratingRestaurant = createAsyncThunk(
	"staff/ratingRestaurant",
	async (data, { rejectWithValue }) => {
		try {
			const res = await StaffApi.ratingApi(data);
			return res;
		} catch (error) {
			return rejectWithValue(error.response?.data || error);
		}
	}
);

export const getBookingTable = createAsyncThunk(
	"staff/getBookingTable",
	async (data) => {
		const res = await StaffApi.getBookingTableApi(data);
		return res;
	}
);
export const getListMenu = createAsyncThunk(
	"staff/getListMenu",
	async (restaurantId) => {
		const res = await StaffApi.getListMenuApi(restaurantId);
		return res;
	}
);

export const orderMenu = createAsyncThunk("staff/orderMenu", async (data, { rejectWithValue }) => {
	try {
		const res = await StaffApi.orderMenuApi(data);
		return res;
	} catch (error) {
		return rejectWithValue(error.response?.data || error);
	}
});
export const getCartItems = createAsyncThunk(
	"staff/getCartItems",
	async (restaurantId) => {
		const res = await StaffApi.getCartItemsApi(restaurantId);
		return res;
	}
);
export const getCartItemsStaff = createAsyncThunk(
	"staff/getCartItemsStaff",
	async (bookTableId) => {
		const res = await StaffApi.getCartItemsStaffApi(bookTableId);
		return res;
	}
);
export const increaseQuantity = createAsyncThunk(
	"staff/increaseQuantity",
	async (cartItemsId) => {
		const res = await StaffApi.increaseQuantityApi(cartItemsId);
		return res;
	}
);
export const decreaseQuantity = createAsyncThunk(
	"staff/decreaseQuantity",
	async (cartItemsId) => {
		const res = await StaffApi.decreaseQuantityApi(cartItemsId);
		return res;
	}
);
export const removeCartItem = createAsyncThunk(
	"staff/removeCartItem",
	async (cartItemsId) => {
		const res = await StaffApi.removeCartItemApi(cartItemsId);
		return res;
	}
);

export const getMyRestaurant = createAsyncThunk(
	"staff/removeCartItem",
	async (restaurantId) => {
		const res = await StaffApi.getMyRestaurantApi(restaurantId);
		return res;
	}
);
export const staffBookTable = createAsyncThunk(
	"staff/staffBookTable",
	async ({ restaurantId, tableId }) => {
		const res = await StaffApi.staffBookTableApi(restaurantId, tableId);
		return res;
	}
);
export const staffCancelBookTable = createAsyncThunk(
	"staff/staffCancelBookTable",
	async ({ restaurantId, tableId }) => {
		const res = await StaffApi.staffCancelBookTableApi(restaurantId, tableId);
		return res;
	}
);
export const staffCheckDoneOrder = createAsyncThunk(
	"staff/staffCheckDoneOrder",
	async (cartId) => {
		const res = await StaffApi.staffCheckDoneOrderApi(cartId);
		return res;
	}
);
export const getUserBookTableList = createAsyncThunk(
	"user/userBookTableList",
	async () => {
		const res = await StaffApi.userBookTableListApi();
		return res;
	}
);

export const userCancelBookTable = createAsyncThunk(
	"user/userCancelBookTable",
	async ({ restaurantId, tableId }) => {
		const res = await StaffApi.userCancelBookTableApi(restaurantId, tableId);
		return res;
	}
);
export const { setUser, setListCartItems } = StaffReducer.actions;

export default StaffReducer.reducer;
