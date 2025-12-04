import instance from "../../config"
import Cookies from "js-cookie";


export const getProfileApi = async () => {
    try {
        const res = await instance.get(`/v1/api/user/profile`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateProfileApi = async (values) => {
    try {
        const res = await instance.put('/v1/api/user/updateMyProfile', values)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getListRestaurantApi = async (filter) => {
    const { page, limit, status } = filter
    const token = Cookies.get('access_token');
    const res = await instance.get(token ? '/v1/api/restaurant/user/list-logged-in' : '/v1/api/restaurant/user/list', {
        params: {
            page,
            limit,
            status
        }
    })
    return res
}

export const getRestaurantDetailApi = async (id) => {
    const res = await instance.get(Cookies.get('access_token')? `/v1/api/restaurant/user/logged-in/${id}` : `/v1/api/restaurant/user/${id}`)
    return res
}

export const getListTableRestaurantApi = async (restaurantId) => {
    const res = await instance.get(`/v1/api/table/restaurant/${restaurantId}/getListTable?page=1&limit=10`)
    return res
}

export const likeRestaurantApi=async(id)=>{
 const res = await instance.put(`/v1/api/favorites/${id}`)
    return res
}

export const getCommentsApi = async(restaurantId)=>{
    const res = await instance.get(`/v1/api/restaurant/user/comment/${restaurantId}`)
    return res
}

export const createCommentApi=async(data)=>{
    const res= await instance.post('/v1/api/restaurant/user/comment',data)
    return res
}

export const deleteCommentApi=async(commentId)=>{
    const res= await instance.delete(`/v1/api/restaurant/user/comment/${commentId}`)
    return res
}

export const ratingApi=async(data)=>{
    const res= await instance.post(`/v1/api/restaurant/user/rating`, data)
    return res
}