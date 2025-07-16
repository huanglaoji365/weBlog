<template>
  <el-carousel
      :interval="interval"
      arrow="hover"
      height="320px"
      indicator-position="outside"
      :autoplay="true"
      class="custom-carousel"
  >
    <el-carousel-item
        v-for="(img, idx) in images"
        :key="idx"
    >
      <img v-lazy="img" alt="轮播图" class="carousel-img"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import {ElCarousel, ElCarouselItem} from 'element-plus'
import 'element-plus/dist/index.css'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 3000
  }
})
</script>

<style scoped>
.custom-carousel {
  width: 700px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow:
    0 8px 40px 0 rgba(0, 0, 0, 0.18),
    0 1.5px 6px 0 rgba(0, 0, 0, 0.10);
  background: var(--background-color);
}

.carousel-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow:
    0 6px 24px 0 rgba(0, 0, 0, 0.18),
    0 1.5px 6px 0 rgba(0, 0, 0, 0.10);
  transition: box-shadow 0.3s;
}

.carousel-img:hover {
  box-shadow:
    0 12px 32px 0 rgba(0, 0, 0, 0.25),
    0 2px 8px 0 rgba(0, 0, 0, 0.12);
}

@media (max-width: 600px) {
  .custom-carousel {
    max-width: 98vw;
    border-radius: 10px;
  }

  .carousel-img {
    border-radius: 8px;
    height: 180px;
  }
}

:deep(.el-carousel__indicators--outside) {
  max-width: 300px; /* 指示器最大宽度，可根据需要调整 */
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  height: 0; /* 指示器高度，可根据需要调整 */
  min-height: unset;
  align-items: center;
}

:deep(.el-carousel__indicator) {
  height: 8px;   /* 指示点高度 */
  width: 24px;   /* 指示点宽度 */
  margin: 0 4px; /* 指示点间距 */
}
</style>