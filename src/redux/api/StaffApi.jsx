import axios from "axios"
import { API_BASE_URL } from "../../settings/config"

export const getProfileApi = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${API_BASE_URL}/v1/api/clients/getMyProfile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}