import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "../components/IndexView"
import AdminView from "../components/admin/AdminView"
import RegisterView from "../components/user/RegisterView"
import LoginView from "../components/LoginView"
import Users from "../components/admin/Users"
import Roles from "../components/admin/Roles"
import Posts from "../components/admin/Posts"
import Statistic from "../components/admin/Statistic"
import Comments from "../components/admin/Comments"
import Authorities from "../components/admin/Authorities"
import Advertisements from "../components/admin/Advertisements"
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
import ChatRoomView from "../components/message/ChatRoomView"
import TestEdit from "../components/test/TestEdit"
import TestDOMPurify from "../components/test/TestDOMPurify"

let routes = [
  //用户端
  { path: '/', component: IndexView},
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView},
  { path: '/forum/:forumId', component: ForumView},
  { path: '/post/edit', component: PostEdit},
  { path: '/post/:postId', component: PostView},
  { path: '/post/search', component: PostSearchView},
  { path: '/chat/:userId', component: ConversationView},
  { path: '/conversations', component: ConversationListView},
  { path: '/messages', component: MessageListView},
  { path: '/user/:userId', component: UserSpace},
  { path: '/chatroom', component: ChatRoomView},

  //后台管理
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
      { path: 'authorities', component: Authorities},
      { path: 'advertisements', component: Advertisements},
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