<template>
  <header class="custom-navbar">
    <div class="navbar-left">
      <span class="logo-text">weBlog</span>
    </div>
    <!-- <div class="navbar-inner">
      <nav class="navbar-center">
        <router-link to="/">首页</router-link>
        <router-link to="/blog">博客</router-link>
        <router-link to="/about">关于</router-link>
      </nav>
    </div> -->
    <div class="navbar-right">
      <el-button
        class="theme-toggle-btn"
        size="small"
        @click="toggleTheme"
        circle
        :icon="themeIcon"
        style="margin-right: 10px;"
      />
      <router-link v-if="!userStore.user" to="/login" class="login-btn">登录</router-link>
      <router-link v-if="!userStore.user" to="/register" class="register-btn">注册</router-link>
      <el-dropdown v-if="userStore.user" trigger="hover">
        <span class="user-menu">
          <el-avatar v-if="userStore.user.avatar" :src="userStore.user.avatar" size="small" />
          <el-avatar v-else size="small">{{ (userStore.user.email || userStore.user.phone || '?')[0].toUpperCase() }}</el-avatar>
          <span class="user-name">{{ userStore.user.email || userStore.user.phone }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goProfile">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/user'
import { Sunny, Moon } from '@element-plus/icons-vue'

const theme = ref(localStorage.getItem('theme') || 'light')
const themeIcon = computed(() => theme.value === 'dark' ? Sunny : Moon)

function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme.value)
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.style.setProperty('--el-color-primary', '#337ecc')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.setProperty('--el-color-primary', '#409eff')
  }
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  applyTheme()
}

onMounted(() => {
  applyTheme()
})

const userStore = useUserStore()
const router = useRouter()

const showSearch = ref(false)
const searchKeyword = ref('')

function doSearch() {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  router.push({ path: '/blog', query: { search: searchKeyword.value.trim() } })
  showSearch.value = false
}

function logout() {
  localStorage.removeItem('token')
  userStore.clearUser()
  ElMessage.success('已退出登录')
  router.push('/login')
}
function goProfile() {
  router.push('/profile')
}
</script>

<style scoped>
.custom-navbar {
  width: 100%;
  background: var(--background-color);
  color: var(--text-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.2s;
  height: 60px;
}
.navbar-left {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 32px;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 32px;
  padding-right: 120px; /* 给右侧按钮留出空间 */
  box-sizing: border-box;
}
.logo-img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.08);
  background: #f7fafd;
}
.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  letter-spacing: 1.5px;
  margin-right: 18px;
}
.navbar-center {
  display: flex;
  align-items: center;
  gap: 0;
  background: #f7fafd;
  border-radius: 8px;
  padding: 2px 6px;
  height: 40px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.03);
  margin: 0 auto;
}
.navbar-center a {
  position: relative;
  color: #333;
  font-size: 16px;
  text-decoration: none;
  padding: 0 28px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 6px 6px 0 0;
  transition: background 0.2s, color 0.2s;
  margin: 0 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.navbar-center a.router-link-exact-active,
.navbar-center a.active-tab {
  color: var(--primary-color);
  background: var(--background-color);
  font-weight: 600;
}
.navbar-center a.router-link-exact-active::after,
.navbar-center a.active-tab::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px 2px 0 0;
}
.navbar-center a:hover {
  background: #eaf4ff;
  color: var(--primary-color);
}
.navbar-center a:focus,
.navbar-center a:focus-visible,
.navbar-center a.router-link-exact-active:focus,
.navbar-center a.router-link-exact-active:focus-visible,
.navbar-center a:active,
.navbar-center a::-moz-focus-inner {
  outline: none !important;
  box-shadow: none !important;
  background: inherit !important;
}
.navbar-right {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 32px;
}
.search-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid #409eff;
  background: #fff;
  color: #409eff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  transition: background 0.2s, border 0.2s, color 0.2s;
  padding: 0;
  margin-right: 16px;
}
.search-btn:hover {
  background: #eaf4ff;
  border-color: #337ecc;
  color: #337ecc;
}
.navbar-right .login-btn {
  color: var(--primary-color);
  border: 1.5px solid var(--primary-color);
  background: var(--background-color);
  border-radius: 6px;
  padding: 4px 18px;
  margin-right: 10px;
  font-size: 15px;
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
}
.navbar-right .login-btn:focus,
.navbar-right .register-btn:focus {
  outline: none;
  box-shadow: none;
}
.navbar-right .login-btn:hover {
  background: #eaf4ff;
  color: #337ecc;
  border-color: #337ecc;
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.navbar-right .register-btn {
  color: #fff;
  background: var(--primary-color);
  border: 1.5px solid var(--primary-color);
  border-radius: 6px;
  padding: 4px 18px;
  font-size: 15px;
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
}
.navbar-right .register-btn:hover {
  background: #337ecc;
  border-color: #337ecc;
  color: #fff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.user-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  font-size: 15px;
  gap: 8px;
  font-weight: 500;
}
.user-name {
  margin: 0 4px;
  font-weight: 500;
}
.el-icon--right {
  font-size: 12px;
  margin-left: 2px;
  color: #bbb;
}
.theme-toggle-btn {
  background-color: var(--background-color);
  color: var(--text-color);
  border-color: var(--border-color);
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}
.theme-toggle-btn:hover {
  background-color: var(--hover-background-color);
  border-color: var(--hover-border-color);
  color: var(--hover-text-color);
}
@media (max-width: 900px) {
  .navbar-inner { padding-left: 10px; padding-right: 80px; }
  .navbar-right { padding-right: 10px; }
  .logo-text { font-size: 16px; }
}
@media (max-width: 600px) {
  .navbar-inner { flex-direction: column; height: auto; padding-left: 4px; padding-right: 4px; }
  .navbar-right { padding-right: 4px; }
  .logo-img { width: 28px; height: 28px; }
}
</style>