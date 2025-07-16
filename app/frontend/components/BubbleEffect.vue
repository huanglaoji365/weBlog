<template>
  <div class="bubble-effect">
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="bubbleStyle(bubble)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const BUBBLE_COUNT = 48
const bubbles = ref([])

// 左右两侧各占 15%，中间 70% 不显示气泡
function randomSideLeft() {
  // 0-15% 或 85-100%
  const side = Math.random() < 0.5
  if (side) {
    return Math.random() * 15 // 0~15
  } else {
    return 85 + Math.random() * 15 // 85~100
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min
}

function createBubble(id) {
  return {
    id,
    left: randomSideLeft(), // 只在两侧
    size: random(18, 56),
    delay: random(0, 10),
    duration: random(8, 18),
    opacity: random(0.32, 0.62),
    color: [
      'rgba(58,122,254,0.45)',
      'rgba(255,99,132,0.38)',
      'rgba(54,162,235,0.42)',
      'rgba(255,206,86,0.38)',
      'rgba(75,192,192,0.40)',
      'rgba(153,102,255,0.38)',
      'rgba(30,60,180,0.48)',
      'rgba(255,140,0,0.42)'
    ][Math.floor(Math.random()*8)]
  }
}

onMounted(() => {
  bubbles.value = Array.from({ length: BUBBLE_COUNT }, (_, i) => createBubble(i))
})

function bubbleStyle(b) {
  return {
    left: b.left + '%',
    width: b.size + 'px',
    height: b.size + 'px',
    animationDelay: b.delay + 's',
    animationDuration: b.duration + 's',
    opacity: b.opacity,
    background: b.color
  }
}
</script>

<style scoped>
.bubble-effect {
  pointer-events: none;
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 1;
  overflow: hidden;
}
.bubble {
  position: absolute;
  bottom: -60px;
  border-radius: 50%;
  filter: blur(0.5px);
  animation: float-bubble linear infinite;
}
@keyframes float-bubble {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.2;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-92vh) scale(1.18);
    opacity: 0;
  }
}
@media (max-width: 900px) {
  .bubble-effect {
    display: none;
  }
}
</style> 