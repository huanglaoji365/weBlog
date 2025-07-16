<template>
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
  <div class="about-container">
    <el-card class="about-card" shadow="hover">
      <el-image
        class="banner-image"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        fit="cover"
        alt="风景横幅"
        :preview-src-list="[ 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' ]"
        preview-teleported
      />
      <el-divider content-position="left">👤 关于博主</el-divider>
      <div class="section">
        <p>你好，我是 weBlog 的创建者，一名热爱编程与写作的全栈开发者。喜欢探索新技术，关注前端体验与后端架构，致力于用代码和文字表达思想。平时喜欢阅读、摄影、旅行，也热衷于开源与技术分享。</p>
        <p>理念：<strong>用技术赋能创作，让知识自由流动。</strong></p>
        <div class="gallery">
          <el-image
            v-for="(img, idx) in galleryImages"
            :key="idx"
            :src="img"
            fit="cover"
            class="gallery-img"
            :preview-src-list="galleryImages"
            :initial-index="idx"
            preview-teleported
          />
        </div>
      </div>
      <el-divider content-position="left">🌐 关于本站</el-divider>
      <div class="section">
        <p>weBlog 是一个专注于内容创作与分享的博客平台，旨在为开发者和内容创作者提供一个简洁、高效、自由的写作空间。本站支持多端访问，注重用户体验与数据安全，欢迎每一位热爱分享的朋友加入。</p>
        <ul>
          <li>支持 Markdown 编辑与实时预览</li>
          <li>响应式设计，移动端友好</li>
          <li>多标签分类，便于内容管理</li>
          <li>持续优化与开源共建</li>
        </ul>
      </div>
      <el-divider content-position="left">🛠️ 技术栈</el-divider>
      <div class="section">
        <div class="tech-tags">
          <el-tag type="primary" effect="dark">Ruby on Rails（后端）</el-tag>
          <el-tag type="success" effect="dark">Vue 3 + Vite（前端）</el-tag>
          <el-tag type="info" effect="dark">Element Plus（UI）</el-tag>
          <el-tag type="warning" effect="dark">MySql（数据库）</el-tag>
          <el-tag type="danger" effect="dark">Docker（部署）</el-tag>
        </div>
        <ul>
          <li>前端：Vue 3、Element Plus、Vite、ES6+</li>
          <li>后端：Ruby on Rails、JWT 鉴权</li>
          <li>数据库：MySql</li>
          <li>部署与运维：Docker、Nginx</li>
        </ul>
      </div>
      <el-divider content-position="left">📬 联系方式</el-divider>
      <div class="section">
        <ul class="contact-list">
          <li>
            <el-icon><i-ep-message /></el-icon>
            <el-link href="mailto:huanglaoji@111.com" type="primary" :underline="false">huanglaoji@111.com</el-link>
          </li>
          <li>
            <el-icon><i-ep-link /></el-icon>
            <el-link href="https://github.com/huanglaoji365/weBlog" type="success" target="_blank" :underline="false">GitHub 项目仓库</el-link>
          </li>
          <li>
            <el-icon><i-ep-chat-dot-round /></el-icon>
            <el-link href="https://t.me/your_telegram" type="info" target="_blank" :underline="false">Telegram</el-link>
          </li>
        </ul>
      </div>
      <el-divider content-position="left">📢 特别说明</el-divider>
      <div class="section">
        <ul>
          <li>本站内容仅代表作者个人观点，与任何组织或单位无关。</li>
          <li>部分内容和代码示例仅供学习与交流，转载请注明出处。</li>
          <li>感谢所有开源社区和技术文档的支持与帮助。</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElCard, ElDivider, ElTag, ElLink, ElIcon, ElImage } from 'element-plus'
import { Message, Link as EpLink, ChatDotRound } from '@element-plus/icons-vue'

const galleryImages = ref([
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
])
</script>

<style scoped>
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
.el-card{
  --el-card-border-radius: 0;
}
.about-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background: #f7f8fa;
}
.about-card {
  max-width: 700px;
  width: 100%;
}
.banner-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
}
h1 {
  font-size: 2.2rem;
  margin-bottom: 12px;
  color: #222;
  letter-spacing: 2px;
}
.section {
  margin-bottom: 18px;
}
.gallery {
  display: flex;
  gap: 12px;
  margin: 18px 0 0 0;
}
.gallery-img {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s;
}
.gallery-img:hover {
  transform: scale(1.05);
}
.desc {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 28px;
}
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.contact-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.contact-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
}
.el-icon {
  margin-right: 6px;
}
</style> 