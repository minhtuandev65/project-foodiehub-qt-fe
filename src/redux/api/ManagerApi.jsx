import instance from '../../config/index'

export const getListRestaurant=async()=>{
    const res = instance.get('/v1/api/clients/manager/restaurant/getListRestaurant')
    return res
}

export const createNewRestaurant=async(value)=>{
    const res = instance.post('/v1/api/clients/manager/restaurant/createNewRestaurant', value)
    return res
}

export const editRestaurant= async(id, values)=>{
    const res = instance.put(`/v1/api/clients/manager/restaurant/${id}/update`, values)
    return res
}
export const detailRestaurant=async(id)=>{
    const res = instance.get(`/v1/api/clients/manager/restaurant/getDetailRestaurant/${id}/detail`)
    return res
}
