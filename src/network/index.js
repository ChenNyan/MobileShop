import axios from "axios";
export const request = (config)=>{
    const inst = axios.create({
        baseURL:'/api/v4',
        timeout:10000,
    })
    inst.interceptors.response.use(config =>{
        return config
    })
    inst.interceptors.response.use(data => {
        return data.data
    })
    return inst(config)
}