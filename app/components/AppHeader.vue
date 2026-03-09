<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <span class="logo-icon">📖</span>
        <span class="logo-text">简书</span>
      </div>

      <nav class="nav">
        <a href="#" class="nav-item">
          <span class="nav-icon">●</span>
          发现
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">🔔</span>
          关注
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">👑</span>
          会员
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">💻</span>
          IT技术
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">💬</span>
          消息
        </a>
      </nav>

      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="搜索" />
      </div>

      <div class="user-actions">
        <div class="avatar"></div>
        <button class="write-btn">
          <span class="pen-icon">✏️</span>
          写文章
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 100;
}

.header-content {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #ea6f5a;
  cursor: pointer;
}

.logo-icon {
  font-size: 28px;
}

.nav {
  display: flex;
  gap: 24px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #ea6f5a;
}

.nav-icon {
  font-size: 18px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 0 16px;
  width: 180px;
  height: 36px;
}

.search-icon {
  color: #999;
  margin-right: 8px;
  font-size: 14px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #96c3e7;
  cursor: pointer;
}

.write-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #ea6f5a;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.write-btn:hover {
  background-color: #d65a48;
}

.pen-icon {
  font-size: 14px;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .search-box {
    width: 140px;
  }
}
</style>
