<template>
  <footer class="footer">
    &copy; 2025 weBlog
    <a class="footer-link" href="https://github.com/huanglaoji365/weBlog" target="_blank">GitHub</a>
    <span style="margin: 0 6px;">|</span>
    <a class="footer-link" href="mailto:huanglaoji@111.com">联系我</a>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  text-align: center;
  color: var(--text-color);
  padding: 24px 0 16px 0;
  background: var(--background-color);
  border-top: 1px solid var(--border-color, #f0f0f0);
  font-size: 15px;
  letter-spacing: 1.2px;
  font-weight: 500;
  box-shadow: 0 -2px 8px rgba(64,158,255,0.04);
  transition: background 0.2s, color 0.2s;
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