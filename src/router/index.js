// appfront/src/api/index.js
import Vue from 'vue'
// import Axios from 'axios'
import VueRouter from "vue-router";

const Home = () => import('../views/home/home');
const Test = () => import('../views/testVue/testVue');
const Login = () => import('../views/login/login');
const Register = () => import('../views/register/register');
const Menu = () => import('../views/menu/menu');
const Edit = () => import('../views/edit/edit')

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: '/home'       // 重定向到 /home
    },

    {
        path: '/home',
        component: Home
    },

    {
        path: '/test',
        component: Test
    },

    {
        path: '/login',
        component: Login
    },

    {
        path: '/menu',
        component: Menu
    },

    {
        path: '/register',
        component: Register
    },

    {
        path: '/edit',
        component: Edit
    },

];

const router = new VueRouter({
    routes,
    mode: 'history'         // history模式，一般都用这个模式
    }
);

export default router
// const axiosInstance = Axios.create({
//     withCredentials: true
// })

// // 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
// axiosInstance.interceptors.request.use((config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest'
//     const regex = /.*csrftoken=([^;.]*).*$/
//     config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
//     return config
// })
//
// axiosInstance.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
//
// Vue.prototype.axios = axiosInstance

// export default axiosInstance