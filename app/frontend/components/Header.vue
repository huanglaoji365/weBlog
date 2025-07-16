<template>
  <header class="custom-navbar">
    <div class="navbar-left">
      <span class="logo-text">weBlog</span>
    </div>
    <div class="navbar-inner">
      <el-tabs
        v-model="activeTab"
        @tab-click="handleTabClick"
        class="navbar-center"
        tab-position="top"
        stretch
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :label="item.label"
          :name="item.path"
        />
      </el-tabs>
    </div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
const route = useRoute()
const tabList = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/blog' },
  { label: '实战', path: '/work' },
  { label: '标签', path: '/tags' },
  { label: '分类', path: '/category' },
  { label: '关于', path: '/about' },
]
const activeTab = ref(route.path)

watch(() => route.path, (newPath) => {
  activeTab.value = newPath
})

function handleTabClick(tab) {
  if (tab.props.name !== route.path) {
    router.push(tab.props.name)
  }
}

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
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 120px;
}
.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  letter-spacing: 1.5px;
  margin-right: 20px;
}
.navbar-center {
  display: flex;
  align-items: center;
  min-width: 500px;
}
.el-tabs.navbar-center {
  --el-tabs-header-height: 48px;
  --el-tabs-header-bg-color: #f7fafd;
  --el-tabs-active-color: var(--primary-color);
  --el-tabs-header-font-size: 16px;
  --el-tabs-header-font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.03);
  padding: 0 12px;
  margin: 0;
  height: 48px;
}
.el-tabs__item {
  padding: 0 24px !important;
}
.el-tabs__item.is-active {
  color: var(--primary-color) !important;
  font-weight: 600;
  background: var(--background-color);
}
.el-tabs__item:hover {
  background: #eaf4ff;
  color: var(--primary-color);
}
.el-tabs__header {
  border-bottom: none !important;
  box-shadow: none !important;
}
:deep(.el-tabs__header) {
  border-bottom: none !important;
  box-shadow: none !important;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none !important;
}
:deep(.el-tabs__item) {
  font-size: 16px !important;
  font-weight: bold !important;
}
@media (max-width: 900px) {
  .navbar-inner { margin-left: 60px; }
  .logo-text { font-size: 16px; margin-right: 10px; }
  .el-tabs.navbar-center { --el-tabs-header-font-size: 14px; }
}
@media (max-width: 600px) {
  .navbar-inner { margin-left: 4px; }
  .logo-text { font-size: 14px; margin-right: 6px; }
  .el-tabs.navbar-center { --el-tabs-header-font-size: 12px; }
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
</style>