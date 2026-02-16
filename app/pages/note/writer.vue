<template>
  <div class="h-screen w-screen flex bg-gray-50">
    <!-- 最左侧：文集列表 -->
    <aside class="w-48 bg-zinc-800 flex flex-col shrink-0">
      <!-- Logo -->
      <div class="h-14 flex items-center justify-between px-4 border-b border-zinc-700">
        <h1 class="text-white text-lg font-semibold">MyBlog</h1>
        <NuxtLink to="/">
          <a-button type="text" size="small" class="text-zinc-400 hover:text-white">
            <template #icon>
              <IconAntDesignHomeOutlined />
            </template>
          </a-button>
        </NuxtLink>
      </div>

      <!-- 搜索框 -->
      <!-- <div class="px-3 py-3">
        <a-input-search
          placeholder="搜索文集"
          size="small"
          class="search-input"
        />
      </div> -->

      <!-- 新建文集按钮 -->
      <div class="px-3 mb-2">
        <a-button
          block
          size="small"
          class="flex items-center justify-center gap-1"
          @click="showCreateNotebookModal = true"
        >
          <IconAntDesignPlusOutlined class="text-sm" />
          新建文集
        </a-button>
      </div>

      <!-- 文集列表 -->
      <nav class="flex-1 px-2 overflow-y-auto space-y-0.5">
        <div
          v-for="collection in notebookData.data.list"
          :key="collection.id"
          class="group flex items-center justify-between px-3 py-2.5 text-zinc-300 hover:bg-zinc-700/50 rounded cursor-pointer transition-colors text-sm"
          :class="selectedCollection?.id === collection.id ? 'bg-zinc-700/50 border-l-2 border-orange-500' : ''"
          @click="selectCollection(collection)"
        >
          <div class="flex items-center gap-2 truncate">
            <IconAntDesignFolderOutlined class="text-sm shrink-0" />
            <span class="truncate">{{ collection.name }}</span>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <!-- <span class="text-xs text-zinc-500">{{ collection.count }}</span> -->
            <IconAntDesignSettingOutlined
              class="text-xs opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity"
              @click.stop
            />
          </div>
        </div>
      </nav>

      <!-- 底部用户信息 -->
      <div class="p-3 border-t border-zinc-700">
        <div class="flex items-center gap-2">
          <a-avatar size="small" class="bg-orange-500">U</a-avatar>
          <span class="text-zinc-400 text-sm truncate">用户名</span>
        </div>
      </div>
    </aside>

    <!-- 中间：文章列表 + 编辑器 -->
    <main class="flex-1 flex flex-col bg-white min-w-0">
      <!-- 顶部工具栏 -->
      <div class="h-14 border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div class="flex items-center gap-3">
          <a-button type="text" size="small" class="text-orange-500">
            <template #icon>
              <IconAntDesignPlusOutlined />
            </template>
            新建文章
          </a-button>
          <a-divider type="vertical" class="h-6" />
          <span class="text-gray-700 text-sm">{{ selectedCollection?.name || '选择文集' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <a-button size="small">
            <template #icon>
              <IconAntDesignSaveOutlined />
            </template>
            保存
          </a-button>
          <a-button size="small" type="primary">发布</a-button>
        </div>
      </div>

      <!-- 文章列表和编辑器切换区域 -->
      <div class="flex-1 flex overflow-hidden">
        <!-- 文章列表 -->
        <div class="w-64 border-r border-gray-200 flex flex-col shrink-0">
          <div class="h-10 border-b border-gray-100 flex items-center justify-between px-3 bg-gray-50">
            <span class="text-sm font-medium text-gray-700">文章列表</span>
            <span class="text-xs text-gray-500">{{ articles.length }} 篇</span>
          </div>
          <div class="flex-1 overflow-y-auto">
            <div
              v-for="article in articles"
              :key="article.id"
              class="group p-3 border-b border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors"
              :class="selectedArticle?.id === article.id ? 'bg-orange-50 border-l-2 border-l-orange-500' : ''"
              @click="selectArticle(article)"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="text-sm font-medium text-gray-800 truncate flex-1">{{ article.title }}</h3>
                <IconAntDesignSettingOutlined
                  class="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-orange-500 transition-all shrink-0"
                  @click.stop
                />
              </div>
              <p class="text-xs text-gray-500 line-clamp-2 mb-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ article.date }}</span>
                <span>{{ article.wordCount }} 字</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 编辑器区域 -->
        <div class="flex-1 flex flex-col min-w-0">
          <!-- 编辑器工具栏 -->
          <div class="h-11 border-b border-gray-200 flex items-center px-3 gap-0.5 shrink-0">
            <a-tooltip v-for="tool in editorTools" :key="tool.icon" :title="tool.title">
              <a-button type="text" size="small" class="w-9 h-9">
                <component :is="tool.icon" class="text-base" />
              </a-button>
            </a-tooltip>
          </div>

          <!-- 编辑器内容区 -->
          <div class="flex-1 overflow-y-auto p-5">
            <a-textarea
              v-if="selectedArticle"
              v-model:value="content"
              class="editor-textarea"
              :auto-size="{ minRows: 20 }"
              placeholder="开始写作..."
            />
            <div v-else class="h-full flex items-center justify-center text-gray-400">
              <div class="text-center">
                <IconAntDesignFileTextOutlined class="text-4xl mb-3 opacity-50" />
                <p>选择一篇文章开始编辑</p>
              </div>
            </div>
          </div>

          <!-- 底部状态栏 -->
          <div class="h-8 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500 shrink-0">
            <div class="flex items-center gap-4">
              <span>Words: {{ wordCount }}</span>
              <span>Lines: {{ lineCount }}</span>
            </div>
            <div class="flex items-center gap-3">
              <a-checkbox size="small">滚动同步</a-checkbox>
              <a-button type="text" size="small">回到顶部</a-button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 右侧预览区 -->
    <aside class="w-80 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0">
      <div class="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
        <span class="font-medium text-gray-700">预览</span>
        <a-button type="text" size="small" class="text-gray-500">
          <template #icon>
            <IconAntDesignFullscreenOutlined />
          </template>
        </a-button>
      </div>

      <div class="flex-1 overflow-y-auto p-5">
        <article v-if="selectedArticle" class="prose prose-sm max-w-none">
          <h2 class="text-xl font-bold mb-4">{{ selectedArticle.title }}</h2>

          <p class="text-gray-700 mb-4 leading-relaxed">
            使用以下命令创建一个新的 Nuxt 3 项目：
          </p>

          <div class="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono mb-4 overflow-x-auto">
            npx nuxi init &lt;project-name&gt;
          </div>

          <p class="text-gray-700 mb-4 leading-relaxed">
            进入项目目录并安装依赖：
          </p>

          <div class="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono mb-4 overflow-x-auto">
            <div>cd &lt;project-name&gt;</div>
            <div>npm install</div>
          </div>

          <h3 class="text-lg font-semibold mb-3">配置 Ant Design Vue</h3>

          <p class="text-gray-700 mb-4 leading-relaxed">
            安装 Ant Design Vue：
          </p>

          <div class="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono mb-4 overflow-x-auto">
            <div>npm install --save ant-design-vue</div>
          </div>

          <p class="text-gray-700 mb-3 leading-relaxed">
            在 <code class="bg-gray-200 px-1.5 py-0.5 rounded text-sm">nuxt.config.ts</code> 中配置：
          </p>
        </article>
        <div v-else class="h-full flex items-center justify-center text-gray-400">
          <div class="text-center">
            <IconAntDesignEyeOutlined class="text-4xl mb-3 opacity-50" />
            <p>选择文章预览内容</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- 新建文集弹窗 -->
    <a-modal
      v-model:open="showCreateNotebookModal"
      title="新建文集"
      :ok-text="'确定'"
      :cancel-text="'取消'"
      @ok="handleCreateNotebook"
      @cancel="handleCancelCreateNotebook"
    >
      <div class="py-4">
        <a-form-item label="文集名称" :colon="false">
          <a-input
            v-model:value="notebookName"
            placeholder="请输入文集名称"
            @pressEnter="handleCreateNotebook"
          />
        </a-form-item>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
interface CollectionData {
  id: number
  name: string
  created_at: string
  updated_at: string
  uid: number
}

const { $message } = useNuxtApp()

// 图标名称配置
const editorTools = [
  { icon: 'IconAntDesignFontSizeOutlined', title: '标题' },
  { icon: 'IconAntDesignBoldOutlined', title: '加粗' },
  { icon: 'IconAntDesignItalicOutlined', title: '斜体' },
  { icon: 'IconAntDesignOrderedListOutlined', title: '有序列表' },
  { icon: 'IconAntDesignUnorderedListOutlined', title: '无序列表' },
  { icon: 'IconAntDesignLinkOutlined', title: '链接' },
  { icon: 'IconAntDesignPictureOutlined', title: '图片' },
  { icon: 'IconAntDesignCodeOutlined', title: '代码' },
  { icon: 'IconAntDesignTableOutlined', title: '表格' },
  { icon: 'IconAntDesignSyncOutlined', title: '同步' },
  { icon: 'IconAntDesignFullscreenOutlined', title: '全屏' },
]
/**
 * 文集
 */
// 选中的文集
const selectedCollection = ref<CollectionData>()

// 获取文集
const { data: notebookData, refresh }: any = await notebookFetch({
  method: 'GET',
})
if (notebookData.value.code === 1) {
  throw createError({ statusCode: 500, statusMessage: '服务器报错！' })
}

if (!selectedCollection.value && notebookData.value.data.list.length > 0) {
  selectedCollection.value = notebookData.value.data.list[0]
}

// 选择文集
const selectCollection = (collection: CollectionData) => {
  selectedCollection.value = collection
}

// 新建文集弹窗
const showCreateNotebookModal = ref(false)
const notebookName = ref('')

// 创建文集
const handleCreateNotebook = async () => {
  if (!notebookName.value.trim()) {
    $message.warning('请输入文集名称')
    return
  }

  try {
    const { data: postData }: any = await notebookFetch({
      method: 'POST',
      body: { name: notebookName.value },
      server: false
    })

    if (postData.value.code === 0) {
      $message.success('文集创建成功')
      // 刷新文集列表
      await refresh()
      // 关闭弹窗并清空输入
      showCreateNotebookModal.value = false
      notebookName.value = ''
    } else {
      $message.error(postData.value.msg || '创建失败')
    }
  } catch (error) {
    $message.error('创建失败，请重试')
  }
}

// 取消创建文集
const handleCancelCreateNotebook = () => {
  showCreateNotebookModal.value = false
  notebookName.value = ''
}

// 文章数据
const articles = ref([
  {
    id: 1,
    title: '安装 Nuxt 3',
    excerpt: '详细介绍如何从零开始安装和配置 Nuxt 3 项目...',
    date: '2023-03-20',
    wordCount: 172,
  },
  {
    id: 2,
    title: 'Vue 3 组合式 API 入门',
    excerpt: '学习 Vue 3 的组合式 API，提升代码复用性...',
    date: '2023-03-18',
    wordCount: 256,
  },
  {
    id: 3,
    title: 'Tailwind CSS 实用技巧',
    excerpt: '掌握 Tailwind CSS 的核心概念和实用技巧...',
    date: '2023-03-15',
    wordCount: 189,
  },
  {
    id: 4,
    title: 'TypeScript 类型推断',
    excerpt: '深入理解 TypeScript 的类型推断机制...',
    date: '2023-03-12',
    wordCount: 342,
  },
  {
    id: 5,
    title: '前端性能优化指南',
    excerpt: '分享前端性能优化的最佳实践...',
    date: '2023-03-10',
    wordCount: 421,
  },
])

// 选中的文集和文章
const selectedArticle = ref(articles.value[0])

// 编辑器内容
const content = ref(`### 安装 Nuxt 3

使用以下命令创建一个新的 Nuxt 3 项目：

\`\`\`bash
npx nuxi init <project-name>
\`\`\`

### 配置 Ant Design Vue

安装 Ant Design Vue：

\`\`\`bash
npm install --save ant-design-vue
\`\`\`
`)

// 选择文章
const selectArticle = (article: any) => {
  selectedArticle.value = article
}

// 统计字数和行数
const wordCount = computed(() => {
  return content.value.trim().split(/\s+/).filter(Boolean).length
})

const lineCount = computed(() => {
  return content.value.split('\n').length
})
</script>

<style scoped>
.search-input :deep(.ant-input) {
  background: #3f3f3f;
  border: 1px solid #555;
  color: #e5e5e5;
}

.search-input :deep(.ant-input::placeholder) {
  color: #999;
}

.search-input :deep(.ant-input:focus) {
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
}

.editor-textarea :deep(.ant-input) {
  border: none;
  box-shadow: none;
  resize: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.8;
}

.editor-textarea :deep(.ant-input:focus) {
  box-shadow: none;
}

.prose code {
  @apply bg-gray-100 px-1.5 py-0.5 rounded text-sm text-orange-600;
}

.prose pre {
  @apply bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
