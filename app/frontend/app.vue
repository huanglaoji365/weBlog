<template>
  <div class="app-layout">
    <!-- 全局导航栏 -->
    <Header />
    <!-- 主体内容区 -->
    <main class="main-content">
      <el-backtop :bottom="77">
        <div style="height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        border-radius: 10px;
        text-align: center;
        padding-top: 15px;
        color: #1989fa;
      "
        >
          <el-icon><ArrowUpBold /></el-icon>
        </div>
      </el-backtop>
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
