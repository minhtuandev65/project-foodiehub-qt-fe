import instance from "../../config"

export const getListRestaurant=async()=>{
    const res = await instance.get('/v1/api/admin/getListRestaurant')
    return res
}

export const acceptRestaurant=async(id)=>{
    const res = await instance.put(`/v1/api/admin/acceptCreateRestaurant/${id}/accept`)
    return res
}