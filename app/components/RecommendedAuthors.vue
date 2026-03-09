<template>
  <div class="recommended-authors">
    <div class="authors-header">
      <h4>推荐作者</h4>
      <a href="#" class="refresh-link">换一批</a>
    </div>
    <div class="author-card" v-for="i in 5" :key="i">
      <div class="author-avatar"></div>
      <div class="author-info">
        <div class="author-name">小埋</div>
        <div class="author-stats">写了269.3k字 · 31.6k喜欢</div>
      </div>
      <button class="follow-btn">+ 关注</button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Recommended Authors */
.recommended-authors {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
}

.authors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.authors-header h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.refresh-link {
  color: #999;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.refresh-link:hover {
  color: #333;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.author-card:last-child {
  border-bottom: none;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #96c3e7;
  flex-shrink: 0;
}

.author-info {
  flex: 1;
  min-width: 0;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.author-stats {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.follow-btn {
  padding: 6px 14px;
  background-color: transparent;
  color: #27ae60;
  border: 1px solid #27ae60;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.follow-btn:hover {
  background-color: #27ae60;
  color: #fff;
}
</style>
