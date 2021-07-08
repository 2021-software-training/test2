import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000
    })

    instance.interceptors.request.use(config => {
        return config;
    }, error => {
        console.log(error);
    })

    // 拦截响应
    instance.interceptors.response.use(res => {
        return res.data
    }, error => {
        console.log(error);
    })

    // 发送真正的网络请求
    return instance(config);
}

export function requestPost (userInfo) {
    return request({
        method: 'post',
        url:    'currentprice.json',
        data:   userInfo
    });
}

export function requestGet (userInfo) {
    return request({
        method: 'get',
        url:    'currentprice.json',
        data:   userInfo
    });
}