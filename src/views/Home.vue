<template>
  <div class="container">
    <div class="home">
      <h2 class="page-title">最新文章</h2>
      
      <div v-loading="postsStore.loading">
        <div v-if="postsStore.posts.length === 0" class="empty">
          <el-empty description="暂无文章" />
        </div>
        
        <div v-else class="posts-list">
          <div 
            v-for="post in postsStore.posts" 
            :key="post.id" 
            class="post-card card"
            @click="$router.push(`/post/${post.id}`)"
          >
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-content">{{ getExcerpt(post.content) }}</p>
            <div class="post-meta">
              <span class="author">
                <el-avatar :size="24" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.username || 'user'}`" />
                {{ post.user?.username || '未知用户' }}
              </span>
              <span class="date">{{ formatDate(post.created_at) }}</span>
              <span class="comments">
                <el-icon><ChatDotRound /></el-icon>
                {{ post.comment_count }} 评论
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePostsStore } from '@/store/posts'
import { ChatDotRound } from '@element-plus/icons-vue'

const postsStore = usePostsStore()
const showDebug = ref(true) // 开发时设为true，生产时设为false

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

const getExcerpt = (content) => {
  // 移除HTML标签
  const textContent = content?.replace(/<[^>]*>/g, '') || ''
  return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent
}

// 获取评论数量
const getCommentCount = (post) => {
  console.log('📊 检查文章评论数据:', {
    id: post.id,
    title: post.title,
    comments: post.comment_count,
    allKeys: Object.keys(post)
  })
  
  // 检查不同的评论字段
  if (Array.isArray(post.comments)) {
    console.log(`✅ 使用 post.comments: ${post.comments.length}`)
    return post.comments.length
  }
  
  console.log('❌ 未找到评论数组')
  return 0
}

onMounted(() => {
  console.log('🚀 开始获取文章列表...')
  postsStore.fetchPosts().then(() => {
    console.log('📋 文章列表获取完成:', postsStore.posts)
    
    // 检查每篇文章的评论数据
    postsStore.posts.forEach((post, index) => {
      console.log(`📄 文章 ${index + 1}:`, {
        id: post.id,
        title: post.title,
        hasComments: Array.isArray(post.comments),
        hasCommentsCapital: Array.isArray(post.Comments),
        commentsCount: Array.isArray(post.comments) ? post.comments.length : 
                      Array.isArray(post.Comments) ? post.Comments.length : 0
      })
    })
  })
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;
  color: white;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.post-title {
  color: #303133;
  margin-bottom: 12px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
}

.post-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.author {
  display: flex;
  align-items: center;
  gap: 6px;
}

.comments {
  display: flex;
  align-items: center;
  gap: 4px;
}

.empty {
  padding: 60px 0;
}

/* 调试信息样式 */
.debug-info {
  margin-top: 16px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  font-size: 12px;
  color: #1890ff;
}

.debug-info p {
  margin: 0 0 8px 0;
  font-weight: 600;
}

.debug-info ul {
  margin: 0;
  padding-left: 16px;
}

.debug-info li {
  margin: 2px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .debug-info {
    display: none; /* 移动端隐藏调试信息 */
  }
}
</style>