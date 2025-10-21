<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <h3>个人博客系统</h3>
          <p>分享技术，记录生活</p>
        </div>
        <div class="footer-links">
          <span>© 2025 个人博客 · Powered by Vue3 + Gin</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.footer-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
}

.footer-info p {
  opacity: 0.8;
  font-size: 14px;
}

.footer-links {
  opacity: 0.8;
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>