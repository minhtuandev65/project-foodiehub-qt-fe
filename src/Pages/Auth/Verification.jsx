import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../../settings/config'

function Verification() {
    const [searchParam] = useSearchParams()
    const navigate = useNavigate()

    const handleVerification = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/v1/api/auth/verifyEmail`, {
                email: searchParam.get('email'),
                token: searchParam.get('token')
            })
            if (res?.data?.message == 'Success') {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (searchParam.get('email') && searchParam.get('token')) {
            handleVerification()
        }
    }, [])
    return (
        <div></div>
    )
}

export default Verification