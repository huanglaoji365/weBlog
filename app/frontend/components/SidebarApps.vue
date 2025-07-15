<template>
  <aside class="apps-side">
    <section class="apps-installed">
      <h2 class="apps-title">打龟日记</h2>
      <p class="apps-edit is-disable">星期天</p>
      <p class="apps-empty-text">
        锚地球<br>
        锚鱼佬<br>
        漂不动<br>
        护不湿 空军回家<br>
        <a href="https://admin.thebase.com/users/add" target="_blank">空军原因</a>
      </p>
      <p class="apps-login-btn">
        <a
          class="c-primary-btn c-primary-btn--full c-primary-btn--small"
          href="https://admin.thebase.com/users/login"
          target="_blank"
        >点我爆护！！！</a>
      </p>
    </section>
    <div class="apps-sorting-bg"></div>
  </aside>
</template>

<script setup>
// 暂无逻辑
</script>

<style>
.apps-side {
  width: 250px;
  background: var(--background-color);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border-radius: 16px;
  padding: 24px;
  height: 545px;
}
.apps-installed {
  padding: 0 24px;
}
.apps-title {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-color);
  letter-spacing: 0.5px;
}
.apps-edit {
  color: var(--text-color);
  font-size: 13px;
  margin-bottom: 20px;
  cursor: not-allowed;
  user-select: none;
}
.apps-empty-text {
  color: var(--text-color);
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 20px;
  word-break: break-all;
}
.apps-empty-text a {
  color: var(--primary-color);
  text-decoration: underline;
  font-weight: 500;
}
.apps-login-btn {
  margin-bottom: 24px;
}
.c-primary-btn {
  display: block;
  width: 100%;
  background: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,178,178,0.08);
  letter-spacing: 1px;
}
.c-primary-btn--small {
  font-size: 15px;
  padding: 8px 0;
}
.c-primary-btn--full {
  width: 100%;
}
.c-primary-btn:hover {
  background: var(--hover-background-color);
  box-shadow: 0 4px 16px rgba(0,178,178,0.12);
}
.apps-sorting-bg {
  width: 100%;
  height: 40px;
  background: transparent;
}
</style>