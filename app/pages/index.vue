<template>
  <div class="homepage">
    <AppHeader />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Left Column - Article List -->
      <div class="left-column">
        <ArticleCard v-for="i in 6" :key="i" />
      </div>

      <!-- Right Column - Sidebar -->
      <aside class="right-column">
        <!-- Promotional Blocks -->
        <PromoBlocks />

        <!-- Recommended Authors -->
        <RecommendedAuthors />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.homepage {
  min-height: 100vh;
  /* background-color: #f5f5f5; */
}

/* Main Content */
.main-content {
  max-width: 960px;
  margin: 76px auto 40px;
  display: flex;
  gap: 40px;
  padding: 0 20px;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.right-column {
  width: 280px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .main-content {
    max-width: 640px;
  }

  .right-column {
    display: none;
  }
}
</style>
