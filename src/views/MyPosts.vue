<template>
  <div class="container">
    <div class="my-posts-page">
      <!-- 页面头部 -->
      <div class="page-header">
        <h1 class="page-title">我的文章</h1>
        <p class="page-subtitle">管理您发布的所有文章</p>
        <el-button 
          type="primary" 
          :icon="EditPen" 
          size="large" 
          @click="$router.push('/create')"
          class="create-btn"
        >
          写新文章
        </el-button>
      </div>

      <!-- 统计信息 -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ totalPosts }}</div>
            <div class="stat-label">总文章数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <el-icon><ChatDotRound /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ totalComments }}</div>
            <div class="stat-label">总评论数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <el-icon><View /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ totalViews }}</div>
            <div class="stat-label">总浏览量</div>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="posts-section">
        <div class="section-header">
          <h2 class="section-title">文章列表</h2>
          <div class="section-actions">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索文章标题..."
              :prefix-icon="Search"
              style="width: 200px"
              clearable
            />
            <el-select v-model="sortBy" placeholder="排序方式" style="width: 120px">
              <el-option label="最新发布" value="newest" />
              <el-option label="最早发布" value="oldest" />
              <el-option label="评论最多" value="comments" />
            </el-select>
          </div>
        </div>

        <div v-loading="loading" class="posts-container">
          <div v-if="filteredPosts.length === 0" class="empty-state">
            <el-empty description="您还没有发布过文章">
              <el-button type="primary" @click="$router.push('/create')">
                开始写作
              </el-button>
            </el-empty>
          </div>

          <div v-else class="posts-list">
            <div
              v-for="post in filteredPosts"
              :key="post.id"
              class="post-item"
            >
              <div class="post-main" @click="$router.push(`/post/${post.id}`)">
                <div class="post-header">
                  <h3 class="post-title">{{ post.title }}</h3>
                  <el-tag 
                    v-if="isNewPost(post)" 
                    type="success" 
                    size="small"
                  >
                    最新
                  </el-tag>
                </div>
                <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
                <div class="post-meta">
                  <div class="meta-left">
                    <span class="date">{{ formatDate(post.created_at) }}</span>
                    <span class="comments">
                      <el-icon><ChatDotRound /></el-icon>
                      {{ post.comment_count || 0 }} 评论
                    </span>
                    <span class="views">
                      <el-icon><View /></el-icon>
                      {{ post.view_count || 0 }} 浏览
                    </span>
                  </div>
                  <div class="meta-right">
                    <span class="status" :class="getStatusClass(post)">
                      {{ getStatusText(post) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="post-actions">
                <el-button
                  type="primary"
                  link
                  :icon="Edit"
                  @click="$router.push(`/edit/${post.id}`)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  link
                  :icon="Delete"
                  @click="handleDeletePost(post)"
                >
                  删除
                </el-button>
                <el-button
                  type="info"
                  link
                  :icon="DocumentCopy"
                  @click="handleCopyLink(post)"
                >
                  复制链接
                </el-button>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="filteredPosts.length > 0" class="pagination">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 20, 50]"
              :total="filteredPosts.length"
              layout="total, sizes, prev, pager, next, jumper"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  EditPen, 
  Document, 
  ChatDotRound, 
  View, 
  Search, 
  Edit, 
  Delete, 
  DocumentCopy 
} from '@element-plus/icons-vue'

const router = useRouter()
const postsStore = usePostsStore()
const authStore = useAuthStore()

const loading = ref(false)
const searchKeyword = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = ref(10)

// 计算用户发布的文章
const userPosts = computed(() => {
  if (!authStore.user) return []
  return postsStore.posts.filter(post => post.user_id === authStore.user.id)
})

// 过滤和排序文章
const filteredPosts = computed(() => {
  let posts = userPosts.value
  
  // 搜索过滤
  if (searchKeyword.value) {
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  
  // 排序
  switch (sortBy.value) {
    case 'oldest':
      posts = [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'comments':
      posts = [...posts].sort((a, b) => (b.comment_count || 0) - (a.comment_count || 0))
      break
    case 'newest':
    default:
      posts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return posts.slice(start, end)
})

// 统计信息
const totalPosts = computed(() => userPosts.value.length)
const totalComments = computed(() => 
  userPosts.value.reduce((total, post) => total + (post.comment_count || 0), 0)
)
const totalViews = computed(() => 
  userPosts.value.reduce((total, post) => total + (post.view_count || 0), 0)
)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getExcerpt = (content) => {
  const textContent = content?.replace(/<[^>]*>/g, '') || ''
  return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent
}

const isNewPost = (post) => {
  const postDate = new Date(post.created_at)
  const now = new Date()
  const diffDays = (now - postDate) / (1000 * 60 * 60 * 24)
  return diffDays < 7 // 7天内发布的算新文章
}

const getStatusClass = (post) => {
  // 这里可以根据文章状态返回不同的class
  return 'status-published'
}

const getStatusText = (post) => {
  // 这里可以根据文章状态返回不同的文本
  return '已发布'
}

const handleDeletePost = async (post) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除文章 "${post.title}" 吗？此操作不可撤销。`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    
    await postsStore.deletePost(post.id)
    ElMessage.success('文章删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

const handleCopyLink = (post) => {
  const link = `${window.location.origin}/post/${post.id}`
  navigator.clipboard.writeText(link).then(() => {
    ElMessage.success('文章链接已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

const fetchData = async () => {
  loading.value = true
  try {
    await postsStore.fetchPosts()
  } catch (error) {
    ElMessage.error('加载文章失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.my-posts-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

.create-btn {
  background: linear-gradient(135deg, #409eff, #337ecc);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
}

.create-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #409eff, #67c23a);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon .el-icon {
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #303133;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  color: #909399;
  font-size: 0.9rem;
}

/* 文章列表 */
.posts-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  color: #303133;
  margin: 0;
}

.section-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.posts-container {
  min-height: 400px;
}

.empty-state {
  padding: 60px 0;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;
}

.post-item:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.post-main {
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.post-title {
  color: #303133;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-excerpt {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #909399;
}

.meta-left {
  display: flex;
  gap: 16px;
  align-items: center;
}

.meta-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date, .comments, .views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-published {
  background: #f0f9ff;
  color: #409eff;
  border: 1px solid #91d5ff;
}

.post-actions {
  display: flex;
  gap: 8px;
  margin-left: 20px;
  flex-shrink: 0;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .my-posts-page {
    padding: 16px 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .posts-section {
    padding: 20px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .section-actions {
    justify-content: space-between;
  }
  
  .post-item {
    flex-direction: column;
    gap: 16px;
  }
  
  .post-actions {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .meta-right {
    align-self: flex-end;
  }
}
</style>