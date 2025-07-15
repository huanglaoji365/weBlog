import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import Dashboard from '../pages/Dashboard.vue'
import Profile from '../pages/Profile.vue'
import Blog from '../pages/Blog.vue'
import About from '../pages/About.vue'
import Work from '../pages/Work.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/about', name: 'About', component: About },
  { path: '/work', name: 'Work', component: Work },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forgot', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAdmin: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局路由守卫：未登录自动跳转到登录页，非管理员不能访问后台管理
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  // 已登录用户访问 login/register 自动跳转首页
  if (token && (to.path === '/login' || to.path === '/register')) {
    next('/')
  } else if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && (!user || !(user.role == 1 || user.role === 'admin'))) {
    next('/')
  } else {
    next()
  }
})

export default router 