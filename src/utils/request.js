import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,  // api的base_url
    responseType: "json",
    withCredentials: false, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
})

// request拦截器
service.interceptors.request.use(config => {
    // console.log(config)

    if (config.baseURL === "" && config.url.indexOf("http") === -1){

        config.url = '/api' + config.url;
    }

    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use( response => {
    // console.log(response)
        /**
         * code为非0是抛错 
         */
        const res = response.data
        if (res.code !== '0') {

            Message({
                message: res.msg || '系统繁忙，请重试',
                type: 'error',
                duration: 5 * 1000
            })

            return Promise.reject('error')
            
        } else {
            return response.data
        }
    },
    error => {
        // console.log(error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })

        return Promise.reject(error)
    }
)

export default service
