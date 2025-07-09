<template>
  <div class="forgot-container">
    <el-card class="forgot-card">
      <h2 class="title">找回密码</h2>
      <el-form :model="form" label-width="70px" @submit.prevent>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" placeholder="请输入注册邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="handleForgot">发送重置邮件</el-button>
        </el-form-item>
      </el-form>
      <router-link class="link" to="/login">返回登录</router-link>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  email: ''
})

function handleForgot() {
  if (!form.email) {
    ElMessage.error('请输入邮箱')
    return
  }
  // TODO: 调用后端接口发送重置邮件
  ElMessage.success('如果该邮箱已注册，重置邮件已发送')
}
</script>

<style scoped>
.forgot-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}
.forgot-card {
  width: 360px;
  padding: 32px 24px 24px 24px;
  border-radius: 12px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
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