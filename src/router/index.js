import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld"
import AdminView from "../components/admin/AdminView"
import Register from "../components/user/RegisterView"
import LoginView from "../components/admin/LoginView"

let routes = [
    { path: '/', component: HelloWorld},
    { path: '/register', component: Register},

    //后台管理
    { path: '/backend/login', component: LoginView},
    { path: '/admin', component: AdminView}
];

let router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;