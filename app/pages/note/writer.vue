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
          <div class="flex items-center gap-2 truncate flex-1 min-w-0">
            <IconAntDesignFolderOutlined class="text-sm shrink-0" />
            <span class="truncate">{{ collection.name }}</span>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <!-- <span class="text-xs text-zinc-500">{{ collection.count }}</span> -->
            <a-dropdown :trigger="['click']" @click.stop>
              <IconAntDesignSettingOutlined
                class="text-xs opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              />
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="handleEditNotebook(collection)">
                    <div class="flex items-center gap-2">
                      <IconAntDesignEditOutlined class="text-sm" />
                      <span>修改</span>
                    </div>
                  </a-menu-item>
                  <a-menu-item @click="handleDeleteNotebook(collection)">
                    <div class="flex items-center gap-2">
                      <IconAntDesignDeleteOutlined class="text-sm" />
                      <span>删除</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
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
          <a-button type="text" size="small" class="text-orange-500 flex items-center gap-1" @click="handleCreateNote">
            <IconAntDesignPlusOutlined />
            <span>新建文章</span>
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
                <a-dropdown :trigger="['click']" @click.stop>
                  <IconAntDesignSettingOutlined
                    class="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-orange-500 transition-all shrink-0"
                  />
                  <template #overlay>
                    <a-menu>
                      <a-menu-item @click="handlePublishArticle(article)">
                        <div class="flex items-center gap-2">
                          <IconAntDesignCloudUploadOutlined class="text-sm" />
                          <span>直接发布</span>
                        </div>
                      </a-menu-item>
                      <a-menu-item @click="handleMoveArticle(article)">
                        <div class="flex items-center gap-2">
                          <IconAntDesignFolderOutlined class="text-sm" />
                          <span>移动文章</span>
                        </div>
                      </a-menu-item>
                      <a-menu-item @click="handleDeleteArticle(article)">
                        <div class="flex items-center gap-2">
                          <IconAntDesignDeleteOutlined class="text-sm" />
                          <span>删除文章</span>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
              <!-- <p class="text-xs text-gray-500 line-clamp-2 mb-2">{{ article.excerpt }}</p> -->
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ article.created_at }}</span>
                <!-- <span>{{ article.wordCount }} 字</span> -->
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
              v-if="selectedArticle && noteData"
              v-model:value="noteData.content_md"
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

    <!-- 修改文集弹窗 -->
    <a-modal
      v-model:open="showEditNotebookModal"
      title="修改文集"
      :ok-text="'确认'"
      :cancel-text="'取消'"
      @ok="handleConfirmEditNotebook"
      @cancel="handleCancelEditNotebook"
    >
      <div class="py-4">
        <a-form-item label="文集名称" :colon="false">
          <a-input
            v-model:value="editNotebookName"
            placeholder="请输入文集名称"
            @pressEnter="handleConfirmEditNotebook"
          />
        </a-form-item>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'ant-design-vue'

interface CollectionData {
  id: number
  name: string
  created_at: string
  updated_at: string
  uid: number
}

interface NoteData {
  id: number
  title: string
  content_md: string
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
if (notebookData.value?.code === 1) {
  throw createError({ statusCode: 500, statusMessage: '服务器报错！' })
}

if (!selectedCollection.value && notebookData.value?.data?.list.length > 0) {
  selectedCollection.value = notebookData.value?.data?.list[0]
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

    if (postData.value?.code === 0) {
      $message.success('文集创建成功')
      // 刷新文集列表
      await refresh()
      // 关闭弹窗并清空输入
      showCreateNotebookModal.value = false
      notebookName.value = ''
    } else {
      $message.error(postData.value?.msg || '创建失败')
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

// 修改文集
const showEditNotebookModal = ref(false)
const editNotebookName = ref('')
const editingCollection = ref<CollectionData>()

// 点击修改文集
const handleEditNotebook = (collection: CollectionData) => {
  editingCollection.value = collection
  editNotebookName.value = collection.name
  showEditNotebookModal.value = true
}

// 确认修改文集
const handleConfirmEditNotebook = async () => {
  if (!editNotebookName.value.trim()) {
    $message.warning('请输入文集名称')
    return
  }

  if (!editingCollection.value) return

  try {
    const { data: putData }: any = await notebookFetch({
      method: 'PUT',
      body: {
        id: editingCollection.value.id,
        name: editNotebookName.value,
      },
      server: false
    })

    if (putData.value?.code === 0) {
      $message.success('文集修改成功')
      // 刷新文集列表
      await refresh()
      // 更新选中文集的名称
      if (selectedCollection.value?.id === editingCollection.value?.id) {
        selectedCollection.value.name = editNotebookName.value
      }
      // 关闭弹窗并清空输入
      showEditNotebookModal.value = false
      editNotebookName.value = ''
      editingCollection.value = undefined
    } else {
      $message.error(putData.value?.msg || '修改失败')
    }
  } catch (error) {
    $message.error('修改失败，请重试')
  }
}

// 取消修改文集
const handleCancelEditNotebook = () => {
  showEditNotebookModal.value = false
  editNotebookName.value = ''
  editingCollection.value = undefined
}

// 删除文集
const handleDeleteNotebook = (collection: CollectionData) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除此文集吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        const { data: deleteData }: any = await notebookFetch({
          method: 'DELETE',
          body: { id: collection.id },
          server: false
        })

        if (deleteData.value?.code === 0) {
          $message.success('文集删除成功')
          // 如果删除的是当前选中的文集，清空选中状态或选中第一个
          if (selectedCollection.value?.id === collection.id) {
            const remainingCollections = notebookData.value?.data?.list?.filter(
              (c: CollectionData) => c.id !== collection.id
            )
            selectedCollection.value = remainingCollections?.[0]
          }
          // 刷新文集列表
          await refresh()
        } else {
          $message.error(deleteData.value?.msg || '删除失败')
        }
      } catch (error) {
        $message.error('删除失败，请重试')
      }
    }
  })
}

/**
 * 文章
 */
const noteData = ref<NoteData>()
// 根据文章id获取文章内容
const getNote = async (isServer: boolean, noteId: number) => {
  if (isServer) {
    // SSR 时使用 useFetch
    const { data }: any = await noteFetch({
      method: "GET",
      server: true,
      params: {
        noteId
      }
    })
    if (data.value.code === 1) {
      throw createError({ statusCode: 500, statusMessage: '服务器报错！' })
    }
    noteData.value = data.value.data
  } else {
    // 客户端使用 $fetch
    try {
      const token = useCookie('accessToken').value
      const data: any = await $fetch('/api/note/note', {
        method: "GET",
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        params: {
          noteId
        }
      })
      if (data.code === 1) {
        $message.error('获取文章内容失败')
        return
      }
      noteData.value = data.data
    } catch (error) {
      $message.error('获取文章内容失败')
    }
  }
  console.log('noteData', noteData.value)
}


// 文章数据
const articles = ref<NoteData[]>([])
// 选中的文章
const selectedArticle = ref()
// 获取文集下的文章
const getNotes = async (isServer: boolean, notebookId: number) => {
  if (isServer) {
    // SSR 时使用 useFetch
    const { data }: any = await notesFetch({
      method: "GET",
      server: true,
      params: {
        notebookId
      }
    })
    if (data.value.code === 1) {
      throw createError({ statusCode: 500, statusMessage: '服务器报错！' })
    }
    articles.value = data.value.data.list
  } else {
    // 客户端使用 $fetch
    try {
      const token = useCookie('accessToken').value
      const data: any = await $fetch('/api/note/notes', {
        method: "GET",
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        params: {
          notebookId
        }
      })
      if (data.code === 1) {
        $message.error('获取文章列表失败')
        return
      }
      articles.value = data.data.list
    } catch (error) {
      $message.error('获取文章列表失败')
      return
    }
  }

  if (!selectedArticle.value && articles.value.length) {
    selectedArticle.value = articles.value[0]
    getNote(true, selectedArticle.value.id)
  }
}

if (selectedCollection.value?.id) {
  await getNotes(true, selectedCollection.value?.id!)
}

const handleCreateNote = async () => {
  try {
    const token = useCookie('accessToken').value
    const data: any = await $fetch('/api/note/note', {
      method: 'POST',
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      body: {
        notebookId: selectedCollection.value?.id,
      }
    })

    if (data.code === 1) {
      $message.error(data.msg)
      return
    }

    $message.success('文章创建成功')
    await getNotes(false, selectedCollection.value?.id!)
  } catch (error) {
    $message.error('创建失败，请重试')
  }
}

// 发布文章
const handlePublishArticle = (article: NoteData) => {
  $message.info('发布功能开发中...')
}

// 移动文章
const handleMoveArticle = (article: NoteData) => {
  $message.info('移动功能开发中...')
}

// 删除文章
const handleDeleteArticle = (article: NoteData) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该文章吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        const token = useCookie('accessToken').value
        const data: any = await $fetch('/api/note/note', {
          method: 'DELETE',
          baseURL: 'http://localhost:3000',
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          },
          body: {
            noteId: article.id
          }
        })

        if (data.code === 1) {
          $message.error(data.msg || '删除失败')
          return
        }

        $message.success('文章删除成功')
        // 如果删除的是当前选中的文章，清空选中状态或选中第一个
        if (selectedArticle.value?.id === article.id) {
          const remainingArticles = articles.value.filter(a => a.id !== article.id)
          selectedArticle.value = remainingArticles[0]
        }
        // 刷新文章列表
        await getNotes(false, selectedCollection.value?.id!)
      } catch (error) {
        $message.error('删除失败，请重试')
      }
    }
  })
}

// 编辑器内容
const content = ref()

// 选择文章
const selectArticle = async (article: any) => {
  selectedArticle.value = article
  // 加载文章内容
  await getNote(false, article.id)
}

// 统计字数和行数
const wordCount = computed(() => {
  return content.value?.trim().split(/\s+/).filter(Boolean).length
})

const lineCount = computed(() => {
  return content.value?.split('\n').length
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
