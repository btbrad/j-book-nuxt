<template>
  <div class="homepage">
    <AppHeader />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Left Column - Article List -->
      <div class="left-column">
        <ArticleCard v-for="i in noteListData.data.list" :key="i.id" :info="i" />
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
const page = ref(1)
const pageSize = ref(8)
const loading = ref(false)

const { data: noteListData  }: any = await homeNotesFetch({
  method: 'GET',
  server: true,
  params: {
    page: page.value,
    pageSize: pageSize.value
  }
})
console.log('noteListData', noteListData)
if (noteListData.value.code === 1) {
  throw createError({
    statusCode: 500,
    statusMessage: '服务器报错！'
  })
}
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
