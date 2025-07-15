// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')


console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

import { createApp } from 'vue'
import App from '../app.vue'
import router from '../router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from 'axios'
import { createPinia } from 'pinia'
import '../assets/stylesheets/theme.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局 axios 请求拦截器，自动带 token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 全局 axios 响应拦截器，处理未登录/过期
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      // 可选：自动跳转到登录页
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

document.addEventListener('DOMContentLoaded', () => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.mount('#app')
})

