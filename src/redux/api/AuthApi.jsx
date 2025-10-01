import instance from "../../config"


export const login=async(values)=>{
    const res = await instance.post('/v1/api/auth/login',values)
    return res
}