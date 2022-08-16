import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "../components/IndexView"
import AdminView from "../components/admin/AdminView"
import Register from "../components/user/RegisterView"
import LoginView from "../components/admin/LoginView"
import Users from "../components/admin/Users"
import Roles from "../components/admin/Roles"
import UserEdit from "../components/admin/UserEdit"
import PostEdit from "../components/post/PostEdit"
import PostView from "../components/post/PostView"
import ForumView from "../components/forum/ForumView"
import Forums from "../components/admin/Forums"
import UserSpace from "../components/user/UserSpace"
import PostsOfUser from "../components/user/PostsOfUser"
import CommentsOfUser from "../components/user/CommentsOfUser"
import FavoriteList from "../components/user/FavoriteList"
import FollowingList from "../components/user/FollowingList"
import PostSearchView from "../components/post/PostSearchView"

import TestEdit from "../components/test/TestEdit"
import TestDOMPurify from "../components/test/TestDOMPurify"

let routes = [
  //用户端
  { path: '/', component: IndexView},
  { path: '/register', component: Register},
  { path: '/forum/:forumId', component: ForumView},
  { path: '/post/edit', component: PostEdit},
  { path: '/post/:postId', component: PostView},
  { path: '/post/search', component: PostSearchView},
  { path: '/user', component: UserSpace,
    children:
    [
      { path: ":userId/posts", component: PostsOfUser, props: true},
      { path: ":userId/comments", component: CommentsOfUser, props: true},
      { path: ":userId/favorites", component: FavoriteList, props: true},
      { path: ":userId/following", component: FollowingList, props: true}
    ]
  },

  //后台管理
  { path: '/admin/login', component: LoginView},
  { path: '/admin',
    component: AdminView,
    children: 
    [
      { path: 'users', component: Users},
      { path: 'users/:userId/edit', component: UserEdit},
      { path: 'roles', component: Roles},
      { path: 'forum', component: Forums}
    ]
  },

  { path: '/test-edit', component: TestEdit},
  { path: '/test-dompurify', component: TestDOMPurify}
];

let router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;