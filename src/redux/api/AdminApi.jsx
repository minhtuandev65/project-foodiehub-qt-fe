import axios from "axios"
import Cookies from "js-cookie";
import instance, { API_BASE_URL_USED } from "../../config"

export const getListRestaurant = async () => {
    const res = await instance.get('/v1/api/restaurant/admin/restaurants')
    return res
}

export const acceptRestaurant = async (id) => {
    const res = await instance.put(`/v1/api/admin/acceptCreateRestaurant/${id}/accept`)
    return res
}

export const getStaffApi = async () => {
    const res = await instance.get('/v1/api/user/admin/list')
    return res
}

export const getUserDetailApi = async (userId) => {
    const res = await instance.get(`/v1/api/user/admin/${userId}`)
    return res
}

export const lockUserApi = async (userId) => {
    const res = await instance.patch(`/v1/api/user/admin/${userId}/lock`)
    return res
}


export const unLockUserApi = async (userId) => {
    const res = await instance.patch(`/v1/api/user/admin/${userId}/activate`)
    return res
}

export const changeRoleApi = async (data) => {
     const token = Cookies.get("access_token");
    const res = await axios.put(`${API_BASE_URL_USED}/v1/api/admin/assignRoleToUser`,data,
         {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            },
        }
    )
    return res
}
