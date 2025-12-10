import instance from "../../config"

export const getListRestaurant=async()=>{
    const res = await instance.get('/v1/api/restaurant/admin/restaurants')
    return res
}

export const acceptRestaurant=async(id)=>{
    const res = await instance.put(`/v1/api/admin/acceptCreateRestaurant/${id}/accept`)
    return res
}

export const getStaffApi= async()=>{
    const res = await instance.get('/v1/api/user/admin/list')
    return res
}

export const getUserDetailApi= async(userId)=>{
    const res = await instance.get(`/v1/api/user/admin/${userId}`)
    return res
}

export const lockUserApi= async(userId)=>{
    const res = await instance.patch(`/v1/api/user/admin/${userId}/activate`)
    return res
}