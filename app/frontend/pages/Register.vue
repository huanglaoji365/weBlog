<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="title">注册</h2>
      <el-form :model="form" label-width="80px" @submit.prevent>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" type="text" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" clearable />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" type="password" show-password placeholder="请再次输入密码" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别" style="width: 100%">
            <el-option label="未知" value="0" />
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
      <router-link class="link" to="/login">已有账号？去登录</router-link>
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
  phone: '',
  password: '',
  confirmPassword: '',
  gender: '0'
})
const router = useRouter()
const userStore = useUserStore()

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  try {
    const res = await axios.post('/register', {
      email: form.email,
      phone: form.phone,
      password: form.password,
      gender: form.gender
    })
    localStorage.setItem('token', res.data.token)
    ElMessage.success('注册成功')
    await fetchProfile()
    router.push('/login') // 注册成功后跳转到登录页
  } catch (e) {
    ElMessage.error(e.response?.data?.error || '注册失败')
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
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  color: var(--text-color);
  transition: background 0.2s, color 0.2s;
}
.register-card {
  width: 400px;
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
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
}
.link:hover {
  text-decoration: underline;
}
</style> 