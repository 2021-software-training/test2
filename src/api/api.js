import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.coindesk.com/v1/bpi/currentprice.json',
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

// export function login (useInfo) {
//     return request({
//         method: 'post',
//
//     })
// }