<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">登录</h2>
      <el-form :model="form" label-width="70px" @submit.prevent>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <router-link class="link" to="/register">没有账号？去注册</router-link>
      <router-link class="link" to="/forgot">忘记密码？</router-link>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const form = reactive({
  email: '',
  password: ''
})
const router = useRouter()
const userStore = useUserStore()

async function handleLogin() {
  try {
    const res = await axios.post('/login', {
      email: form.email,
      password: form.password
    })
    localStorage.setItem('token', res.data.token)
    ElMessage.success('登录成功')
    await fetchProfile()
    router.push('/') // 登录成功后跳转首页
  } catch (e) {
    ElMessage.error(e.response?.data?.error || '登录失败')
  }
}

// 获取用户信息
async function fetchProfile() {
  try {
    const res = await axios.get('/profile')
    userStore.setUser(res.data.user) // 更新 pinia 全局用户状态
  } catch (e) {
    userStore.clearUser()
  }
}

// 退出登录
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  color: var(--text-color);
  transition: background 0.2s, color 0.2s;
}
.login-card {
  width: 360px;
  padding: 32px 24px 24px 24px;
  border-radius: 12px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  transition: color 0.2s;
}
[data-theme="dark"] .title {
  color: #fff;
}
.link {
  display: block;
  margin-top: 18px;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
}
.link:hover {
  text-decoration: underline;
}
</style> 