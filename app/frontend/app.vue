<template>
  <div>
    <h1>Hello from Vue 3 in Rails 7.2!</h1>
    <p>当前时间：{{ time }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const time = ref(new Date().toLocaleTimeString())
setInterval(() => {
  time.value = new Date().toLocaleTimeString()
})
</script>
