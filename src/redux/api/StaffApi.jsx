import instance from "../../config"

export const getProfileApi = async () => {
    try {
        const res = await instance.get(`/v1/api/clients/getMyProfile`)
        return res
    } catch (error) {
        console.log(error)
    }
}