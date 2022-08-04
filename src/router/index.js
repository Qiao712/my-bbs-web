import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "../components/IndexView"
import AdminView from "../components/admin/AdminView"
import Register from "../components/user/RegisterView"
import LoginView from "../components/admin/LoginView"
import Users from "../components/admin/Users"
import Roles from "../components/admin/Roles"
import UserEdit from "../components/admin/UserEdit"

let routes = [
    { path: '/', component: IndexView},
    { path: '/register', component: Register},

    //后台管理
    { path: '/admin/login', component: LoginView},
    { path: '/admin',
      component: AdminView,
      children: 
      [
        { path: 'users', component: Users},
        { path: 'users/:userId/edit', component: UserEdit},
        { path: 'roles', component: Roles},
      ]
    }
];

let router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;