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
    const { page, limit } = filter
    const token = Cookies.get('access_token');
    const res = await instance.get(token ? '/v1/api/restaurant/user/list-logged-in' : '/v1/api/restaurant/user/list', {
        params: {
            page,
            limit
        }
    })
    return res
}

export const getRestaurantDetailApi = async (id) => {
    const res = await instance.get(`/v1/api/restaurant/user/${id}`)
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