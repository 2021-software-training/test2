import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        timeout: 5000,
        headers: {
            'Authorization':  window.sessionStorage.getItem('token')
        }
    })

    console.log("本次发送的token:", window.sessionStorage.getItem('token'))
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

export function login (userInfo) {
    return request({
        method: 'get',
        url:    '/api/login',
        data:   userInfo,
        params: {username: userInfo.username, password: userInfo.password}
    })
}

export function register (userInfo) {
    return request({
        method: 'get',
        url:    '/api/register',
        data:   userInfo,
        params: {
            username: userInfo.username,
            password: userInfo.password,
            email   : userInfo.email,
            age     : userInfo.age
        }
    })
}

export function showAllArticle(articleType) {
    return request({
        method: 'get',
        url:    '/mainPage/showAllArticle',
        params: {
            type: articleType
        }
    })
}

export function showUserArticle() {
    return request({
        method: 'get',
        url:    '/mainPage/showUserArticle',
    })
}

export function getUserInfo() {
    return request({
        method: 'get',
        url:    '/mainPage/getUserInfo',
    })
}

export function editUserInfo(userInfo) {
    return request({
        method: 'get',
        url:    '/mainPage/editUserInfo',
        params: {
            gender  :  userInfo.gender,
            email   :  userInfo.email,
            habits1 :  userInfo.habits1,
            habits2 :  userInfo.habits2,
            habits3 :  userInfo.habits3,
            signature: userInfo.signature
        }
    })
}

export function addLike(articleAndUserInfo) {
    articleAndUserInfo.articleID = undefined;
    return request({
        method: 'get',
        url:    '/mainPage/addLike',
        data:   articleAndUserInfo,
        params: {
            article:    articleAndUserInfo.articleID,
            username:   articleAndUserInfo.username
        }
    })
}





/*
* 请求拦截器
* 用于在每次请求之前在then或者catch之前拦截并进行处理
* 这里用于每次请求头中增加一个Authorization属性，属性值为Token，用于Token验证
* 官方文档：https://www.axios-http.cn/docs/interceptors
* */
axios.interceptors.request.use(config =>{
    console.log(config)
    // 为请求头对象添加Token验证的Authorization对象，就不用每次都在要传送的字段上加token了
    config.headers.Authorization = window.sessionStorage.getItem('token')
    console.log("添加了token", config.headers.Authorization)
    return config
}, function (error) {
    console.log("拦截器错误");
    return Promise.reject(error);
})
