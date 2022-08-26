import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "../components/IndexView"
import AdminView from "../components/admin/AdminView"
import Register from "../components/user/RegisterView"
import LoginView from "../components/admin/LoginView"
import Users from "../components/admin/Users"
import Roles from "../components/admin/Roles"
import Posts from "../components/admin/Posts"
import Statistic from "../components/admin/Statistic"
import Comments from "../components/admin/Comments"
import UserEdit from "../components/admin/UserEdit"
import PostEdit from "../components/post/PostEdit"
import PostView from "../components/post/PostView"
import ForumView from "../components/forum/ForumView"
import Forums from "../components/admin/Forums"
import UserSpace from "../components/user/UserSpace"
import PostSearchView from "../components/post/PostSearchView"
import ConversationView from "../components/message/ConversationView"
import ConversationListView from "../components/message/ConversationListView"
import MessageListView from "../components/message/MessageListView"
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
  { path: '/chat/:userId', component: ConversationView},
  { path: '/conversations', component: ConversationListView},
  { path: '/messages', component: MessageListView},
  { path: '/user', component: UserSpace},

  //后台管理
  { path: '/admin/login', component: LoginView},
  { path: '/admin',
    component: AdminView,
    children: 
    [
      { path: 'users', component: Users},
      { path: 'users/:userId/edit', component: UserEdit},
      { path: 'roles', component: Roles},
      { path: 'forum', component: Forums},
      { path: 'posts', component: Posts},
      { path: 'comments', component: Comments},
      { path: 'statistic', component: Statistic},
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