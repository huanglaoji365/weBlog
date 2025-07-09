<template>
  <div class="app-layout">
    <!-- 全局导航栏 -->
    <Header />
    <!-- 主体内容区 -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- 全局页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>

</style>
