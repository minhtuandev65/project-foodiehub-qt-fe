import instance from '../../config/index'

export const getListRestaurant=async()=>{
    const res = instance.get('/v1/api/restaurant/manager/list')
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
    const res = instance.get(`/v1/api/restaurant/manager/${id}/detail`)
    return res
}

export const getListTable=async(restaurantId)=>{
    const res = instance.get('/v1/api/restaurant/manager/list')
    return res
}

export const getRestaurantDetailApi= async(id)=>{
    const res =await instance.get(`/v1/api/restaurant/manager/${id}/detail`)
    return res 
}

export const createTableApi=async(values)=>{
    const {restaurantId}= values
    const res =await instance.post(`/v1/api/table/restaurant/${restaurantId}/createNewTable`, values)
    return res 
}