import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: 'https://solo-sphere-iota.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            if (error.status === 401 || error.status === 403) {
                signOutUser()
                navigate('/login')
            }
            return Promise.reject(error)
        })
    }, [])
    return axiosInstance
}

export default useAxiosSecure;