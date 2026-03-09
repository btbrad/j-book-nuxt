<template>
  <article class="article-card">
    <div class="article-content">
      <h3 class="article-title">{{ title }}</h3>
      <p class="article-excerpt">{{ excerpt }}</p>
      <div class="article-meta">
        <span class="article-views">{{ views }}</span>
        <span class="article-author">{{ author }}</span>
        <span class="article-stats">
          <span class="comments">{{ comments }}</span>
          <span class="likes">{{ likes }}</span>
        </span>
      </div>
    </div>
    <div class="article-image"></div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  excerpt?: string
  views?: string
  author?: string
  comments?: string | number
  likes?: string | number
}

withDefaults(defineProps<Props>(), {
  title: '学会这招，轻松拿捏Docker!',
  excerpt: 'Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中...',
  views: '136.0',
  author: '干物妹小埋',
  comments: '10',
  likes: '23'
})
</script>

<style scoped>
/* Article Card */
.article-card {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.article-card:hover {
  background-color: #fcfcfc;
}

.article-content {
  flex: 1;
  padding-right: 20px;
}

.article-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.article-excerpt {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.article-views {
  color: #ea6f5a;
  font-weight: 500;
}

.article-author {
  color: #999;
}

.article-stats {
  display: flex;
  gap: 8px;
  color: #999;
}

.article-image {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  background-color: #e8e8e8;
  flex-shrink: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"><rect fill="%23e8e8e8" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">图片</text></svg>');
  background-size: cover;
}

@media (max-width: 768px) {
  .article-image {
    display: none;
  }
}
</style>
