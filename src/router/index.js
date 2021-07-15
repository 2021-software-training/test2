// appfront/src/api/index.js
import Vue from 'vue'
// import Axios from 'axios'
import VueRouter from "vue-router";
const Home = () => import('../views/home/home');
const Test = () => import('../views/testVue/testVue');
const Login = () => import('../views/login/login');
const Register = () => import('../views/register/register');
const Menu = () => import('../views/menu/menu');
const WriteArticle = () => import('../views/writeArticle/writeArticle')
const AllArticle = () => import('../views/allArticle/allArticle')
// const History = () =>import('../views/history/history');
// const Science = () =>import('../views/science/science');
const Life = () => import('../views/life/life');
const Content = () => import('../views/content/content')
const PersonalKeep = () => import('../views/personalKeep/personalKeep');
const PersonalNotKeep = () => import('../views/personalNotKeep/personalNotKeep');
const PersonalPage = () => import('../views/personalPage/personalPage');
const ChangePassword = () => import('../views/changePassword/changePassword');
const ChangeHead = () => import('../views/changeHead/changeHead');
const MyArticle = () => import('../views/myArticle/myArticle');
const MyComment = () => import('../views/myComment/myComment');
const Voice = () => import('../views/voice/voice');
const EditUserInfo = () => import('../views/editUserInfo/editUserInfo');
const EditComment = () => import('../views/editComment/editComment');
const EmailCheck = () => import('../views/emailCheck/emailCheck');
const AllArticleTest = () => import('../views/allArticle/allArticleTest')
const DetailArticle = () =>import('../views/detailArticle/detailArticle');
const Comment = () => import('../views/comment/comment')
const GitTest = () => import('../views/testVue/gittest');

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: '/home'       // 重定向到 /home
    },{
        path: '/home',
        component: Home
    }, {
        path: '/test',
        component: Test
    },{
        path: '/login',
        component: Login
    },{
        path: '/menu',
        component: Menu
    },{
        path: '/register',
        component: Register
    },{
        path: '/writeArticle',
        component: WriteArticle
    },{
        path: '/allArticle/:type',
        component: AllArticle
    }, {
        path: '/allArticle',
        redirect: 'allArticle/All'
    },
    {
        path: '/life',
        component: Life
    }, {
        path: '/personalNotKeep',
        component: PersonalNotKeep
    }, {
        path: '/content',
        component: Content
    },
    {
        path: '/personalKeep',
        component: PersonalKeep
    }, {
        path: '/personalNotKeep',
        component: PersonalNotKeep
    }, {
        path: '/personalPage/:username',
        component: PersonalPage
    }, {
        path: '/changePassword',
        component: ChangePassword
    }, {
        path: '/changeHead',
        component: ChangeHead
    }, {
        path: '/myArticle',
        component: MyArticle
    }, {
        path: '/myComment',
        component: MyComment
    }, {
        path: '/voice',
        component: Voice
    }, {
        path: '/editUserInfo',
        component: EditUserInfo
    }, {
        path: '/editComment',
        component: EditComment
    }, {
        path: '/emailCheck',
        component: EmailCheck
    }, {
        path: '/gitTest',
        component: GitTest
    }, {
        path: '/allArticleTest',
        component: AllArticleTest
    }, {
        path: '/detailArticle/:articleID',
        name: 'detailArticle',
        component: DetailArticle
    }, {
        path: '/detailArticle/:articleID/comment/:page',
        component: Comment
    }

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