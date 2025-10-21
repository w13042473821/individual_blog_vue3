<template>
  <div class="container">
    <div class="profile-page">
      <h2 class="page-title">个人中心</h2>
      
      <div class="profile-content">
        <!-- 用户信息卡片 -->
        <div class="user-info card">
          <div class="user-header">
            <el-avatar 
              :size="80" 
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${authStore.user?.username}`" 
            />
            <div class="user-details">
              <h3 class="username">{{ authStore.user?.username }}</h3>
              <p class="email">{{ authStore.user?.email }}</p>
              <p class="join-date">注册时间: {{ formatDate(authStore.user?.created_at) }}</p>
            </div>
          </div>
        </div>

        <!-- 我的文章 -->
        <div class="my-posts card">
          <div class="section-header">
            <h3>我的文章</h3>
            <el-button type="primary" @click="$router.push('/create')">
              <el-icon><Plus /></el-icon>
              写新文章
            </el-button>
          </div>

          <div v-loading="loading">
            <div v-if="userPosts.length === 0" class="empty-posts">
              <el-empty description="您还没有发布过文章">
                <el-button type="primary" @click="$router.push('/create')">
                  开始写作
                </el-button>
              </el-empty>
            </div>

            <div v-else class="posts-list">
              <div
                v-for="post in userPosts"
                :key="post.id"
                class="post-item"
              >
                <div class="post-main" @click="$router.push(`/post/${post.id}`)">
                  <h4 class="post-title">{{ post.title }}</h4>
                  <p class="post-excerpt">{{ post.content.substring(0, 100) }}...</p>
                  <div class="post-meta">
                    <span class="date">{{ formatDate(post.created_at) }}</span>
                    <span class="comments">
                      <el-icon><ChatDotRound /></el-icon>
                      {{ post.comment_count ? post.comment_count : 0 }} 评论
                    </span>
                  </div>
                </div>
                
                <div class="post-actions">
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
                    @click="handleDeletePost(post.id)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { usePostsStore } from '@/store/posts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ChatDotRound } from '@element-plus/icons-vue'

const authStore = useAuthStore()
const postsStore = usePostsStore()

const loading = ref(false)

// 计算用户发布的文章
const userPosts = computed(() => {
  if (!authStore.user) return []
  return postsStore.posts.filter(post => post.user_id === authStore.user.id)
})

const formatDate = (dateString) => {
  if (!dateString) return '暂无'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 删除文章
const handleDeletePost = async (postId) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？此操作不可恢复。', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await postsStore.deletePost(postId)
    ElMessage.success('文章删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await postsStore.fetchPosts()
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;
  color: #303133;
  text-align: center;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info {
  padding: 30px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-details .username {
  font-size: 24px;
  color: #303133;
  margin-bottom: 8px;
}

.user-details .email {
  color: #606266;
  margin-bottom: 8px;
}

.user-details .join-date {
  color: #909399;
  font-size: 14px;
}

.my-posts {
  padding: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  color: #303133;
  margin: 0;
}

.empty-posts {
  padding: 40px 0;
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
  padding: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  transition: all 0.3s;
}

.post-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.post-main {
  flex: 1;
  cursor: pointer;
}

.post-title {
  color: #303133;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.4;
}

.post-excerpt {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 12px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.post-meta .comments {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-actions {
  display: flex;
  gap: 8px;
  margin-left: 20px;
}

@media (max-width: 768px) {
  .user-header {
    flex-direction: column;
    text-align: center;
  }
  
  .post-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .post-actions {
    margin-left: 0;
    align-self: flex-end;
  }
}
</style>