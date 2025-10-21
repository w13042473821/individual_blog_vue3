<template>
  <div class="container">
    <div class="post-detail">
      <div v-loading="loading">
        <div v-if="post" class="post-content card">
          <h1 class="post-title">{{ post.title }}</h1>
          
          <div class="post-meta">
            <div class="author-info">
              <el-avatar :size="40" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.username || 'user'}`" />
              <div class="author-details">
                <div class="username">{{ post.user?.username || '未知用户' }}</div>
                <div class="date">{{ formatDate(post.created_at) }}</div>
              </div>
            </div>
            
            <div v-if="isAuthor" class="post-actions">
              <el-button
                type="primary"
                link
                @click="$router.push(`/edit/${post.id}`)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                link
                @click="handleDelete"
              >
                删除
              </el-button>
            </div>
          </div>
          
          <div class="post-body">
            <div class="post-text" v-html="post.content"></div>
          </div>
        </div>
        
        <!-- 评论区域 -->
        <div class="comments-section card">
          <h3 class="comments-title">评论 ({{ comments.length }})</h3>
          
          <!-- 评论表单 -->
          <div v-if="authStore.user" class="comment-form">
            <el-input
              v-model="commentContent"
              type="textarea"
              :rows="3"
              placeholder="写下你的评论..."
              resize="none"
              @keydown.enter="handleComment"
            />
            <div class="comment-actions">
              <el-button
                type="primary"
                :loading="commentLoading"
                :disabled="!commentContent.trim()"
                @click="handleComment"
              >
                发表评论
              </el-button>
            </div>
          </div>
          <div v-else class="comment-login">
            <p>请 <router-link to="/login" class="link">登录</router-link> 后发表评论</p>
          </div>
          
          <!-- 评论列表 -->
          <div class="comments-list">
            <div v-if="comments.length === 0" class="empty-comments">
              <el-empty description="暂无评论" :image-size="80" />
            </div>
            
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-header">
                <el-avatar 
                  :size="32" 
                  :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${getCommentUsername(comment)}`" 
                />
                <div class="comment-author-info">
                  <div class="comment-author">{{ getCommentUsername(comment) }}</div>
                  <div class="comment-date">{{ formatDate(comment.created_at) }}</div>
                </div>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const authStore = useAuthStore()

const loading = ref(false)
const commentLoading = ref(false)
const post = ref(null)
const comments = ref([])
const commentContent = ref('')

const isAuthor = computed(() => {
  return authStore.user && post.value && authStore.user.id === post.value.user_id
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

// 安全获取评论用户名
const getCommentUsername = (comment) => {
  return comment.user?.username || '用户' + comment.user_id
}

const fetchPost = async () => {
  loading.value = true
  try {
    const id = route.params.id
    post.value = await postsStore.fetchPost(id)
    await fetchComments()
  } catch (error) {
    ElMessage.error('文章不存在')
    router.push('/')
  } finally {
    loading.value = false
  }
}

const fetchComments = async () => {
  try {
    console.log('🔍 正在获取评论，文章ID:', route.params.id)
    const response = await request.get(`/posts/${route.params.id}/comments`)
    console.log('📨 评论接口完整响应:', response)
    
    // 确保 comments 是数组
    comments.value = Array.isArray(response.comments) ? response.comments : []
    console.log('💬 处理后的评论数据:', comments.value)
    
    // 检查每条评论的用户信息
    comments.value.forEach((comment, index) => {
      console.log(`👤 评论 ${index + 1}:`, {
        id: comment.id,
        content: comment.content,
        user: comment.user,
        userId: comment.user_id,
        userObject: comment.User, // 检查不同可能的字段名
        createdAt: comment.created_at
      })
    })
    
  } catch (error) {
    console.error('❌ 获取评论失败:', error)
    ElMessage.error('获取评论失败')
    comments.value = []
  }
}

const handleComment = async () => {
  if (!commentContent.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  
  commentLoading.value = true
  try {
    console.log('📝 正在发表评论:', {
      content: commentContent.value,
      post_id: parseInt(route.params.id)
    })
    
    const response = await request.post('/comments', {
      content: commentContent.value,
      post_id: parseInt(route.params.id)
    })
    
    console.log('✅ 评论发表成功:', response)
    ElMessage.success('评论成功')
    commentContent.value = ''
    
    // 重新获取评论列表
    await fetchComments()
  } catch (error) {
    console.error('❌ 评论失败:', error)
    ElMessage.error('评论失败，请重试')
  } finally {
    commentLoading.value = false
  }
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await postsStore.deletePost(post.value.id)
    ElMessage.success('文章删除成功')
    router.push('/')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
}

.post-content {
  margin-bottom: 30px;
}

.post-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 20px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-details .username {
  font-weight: 500;
  color: #303133;
}

.author-details .date {
  font-size: 12px;
  color: #909399;
}

.post-body {
  line-height: 1.8;
}

.post-text {
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
}

/* 评论区域样式 */
.comments-section {
  padding: 30px;
}

.comments-title {
  margin-bottom: 20px;
  color: #303133;
  font-size: 1.5rem;
  font-weight: 600;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.comment-login {
  text-align: center;
  padding: 20px;
  color: #909399;
  background: #f5f7fa;
  border-radius: 6px;
  margin-bottom: 20px;
}

.link {
  color: #409eff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s ease;
}

.comment-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.comment-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.comment-author-info {
  flex: 1;
}

.comment-author {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.comment-date {
  font-size: 12px;
  color: #909399;
}

.comment-content {
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

.empty-comments {
  padding: 40px 0;
  text-align: center;
}

/* 富文本内容样式 */
:deep(.post-text) img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

:deep(.post-text) pre {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}

:deep(.post-text) code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

:deep(.post-text) blockquote {
  border-left: 4px solid #409eff;
  background: #f0f9ff;
  margin: 16px 0;
  padding: 12px 16px;
  color: #666;
}

:deep(.post-text) table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

:deep(.post-text) table th,
:deep(.post-text) table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

:deep(.post-text) table th {
  background: #f5f5f5;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-detail {
    max-width: 100%;
  }
  
  .post-content {
    padding: 20px;
  }
  
  .post-title {
    font-size: 24px;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .comments-section {
    padding: 20px;
  }
  
  .comment-item {
    padding: 16px;
  }
}
</style>