<template>
  <div class="app-layout">
    <!-- 全局动态气泡动效 -->
    <BubbleEffect />
    <!-- 左右全局装饰挂件 -->
    <div class="about-bg-widget left-widget">
      <svg width="80" height="220" viewBox="0 0 80 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="60" rx="36" ry="56" fill="#e3f0ff"/>
        <circle cx="30" cy="180" r="18" fill="#c6e2ff"/>
        <ellipse cx="60" cy="200" rx="10" ry="6" fill="#b3cfff"/>
      </svg>
    </div>
    <div class="about-bg-widget right-widget">
      <svg width="90" height="240" viewBox="0 0 90 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="80" rx="38" ry="60" fill="#ffe3e3"/>
        <circle cx="60" cy="200" r="20" fill="#ffd6d6"/>
        <ellipse cx="30" cy="210" rx="12" ry="8" fill="#ffc1c1"/>
      </svg>
    </div>
    <!-- 全局导航栏 -->
    <Header />
    <!-- 主体内容区 -->
    <main class="main-content">
      <el-backtop :bottom="77">
        <div style="
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        border-radius: 10px;
        text-align: center;
        color: #1989fa;
      "
        >
          <span style="width: 100%" class="iconfont icon-huojian"></span>
        </div>
      </el-backtop>
      <router-view />
    </main>
    <!-- 全局页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let originTitle = document.title;

function handleVisibilityChange() {
  if (document.hidden) {
    document.title = '道友,请留步!';
  } else {
    document.title = '道友,欢迎回来!';
    setTimeout(() => {
      document.title = originTitle;
    }, 3000);
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import BubbleEffect from './components/BubbleEffect.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
}
.about-bg-widget {
  position: fixed;
  top: 60px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.left-widget {
  left: 0;
}
.right-widget {
  right: 0;
}
@media (max-width: 900px) {
  .about-bg-widget {
    display: none;
  }
}
</style>
