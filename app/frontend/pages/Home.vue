<template>
  <div class="apps-layout">
    <div class="apps-main-content">
      <main class="main-content">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <SidebarApps />
        </div>
        <div class="main-center">
          <Swiper :images="images" :interval="3000" />
          <NewsBar />
          <BlogList />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Swiper from '../components/Swiper.vue'
import SidebarApps from '../components/SidebarApps.vue'
import NewsBar from '../components/NewsBar.vue'
import BlogList from '../components/BlogList.vue'

const images = [
  'https://picsum.photos/id/1018/600/300',
  'https://picsum.photos/id/1015/600/300',
  'https://picsum.photos/id/1019/600/300'
]
</script>

<style lang="scss">
.apps-layout {
  display: flex;
  min-width: 1035px;
  min-height: 100vh;
  background: var(--background-color);
  padding-top: 30px;
  padding-bottom: 100px;
  justify-content: center; /* 新增：让内容居中 */
}
.apps-main-content {
  flex: 1;
  min-width: 0;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  max-width: 1000px; /* 新增：最大宽度 */
  width: 100%;      /* 新增：宽度自适应 */
}
.main-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* 顶部对齐 */
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 两个组件间隔10px */
}
.main-center {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
</style>