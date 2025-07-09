<template>
  <footer class="footer">
    &copy; 2025 weBlog
    <a class="footer-link" href="https://github.com/" target="_blank">GitHub</a>
    <span style="margin: 0 6px;">|</span>
    <a class="footer-link" href="mailto:contact@weblog.com">联系我</a>
  </footer>
</template>

<script setup>
// 无需逻辑
</script>

<style scoped>
.footer {
  text-align: center;
  color: #888;
  padding: 24px 0 16px 0;
  background: linear-gradient(90deg, #f5f6fa 0%, #eaf4ff 100%);
  border-top: 1.5px solid #e0e6ed;
  font-size: 15px;
  letter-spacing: 1.2px;
  font-weight: 500;
  box-shadow: 0 -2px 8px rgba(64,158,255,0.04);
  transition: background 0.3s;
  position: relative;
}
.footer .footer-link {
  color: #409eff;
  margin: 0 8px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.footer .footer-link:hover {
  color: #337ecc;
  text-decoration: underline;
}
</style> 