<template>
    <el-tag type="primary" effect="light" round>最近鱼获</el-tag>
    <div class="newsbar-cards">
      <el-card style="width: 225px;">
        <template #header> <div style="text-align: center">最近鱼获1</div> </template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="newsbar-img"
      />
      </el-card>
      <el-card style="width: 225px;">
        <template #header> <div style="text-align: center">最近鱼获2</div> </template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="newsbar-img"
      />
      </el-card>
      <el-card style="width: 225px;">
        <template #header> <div style="text-align: center">最近鱼获3</div> </template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="newsbar-img"
      />
      </el-card>
    </div>
</template>

<script setup>
// 这里可以添加更多逻辑
</script>

<style scoped>
.el-tag {
  width: 80px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: var(--text-color);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.newsbar-cards {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 12px;
}
.newsbar-img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
</style> 