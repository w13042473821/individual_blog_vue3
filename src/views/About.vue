<template>
  <div class="container">
    <div class="about-page">
      <!-- 页面头部 -->
      <div class="page-header">
        <h1 class="page-title">关于我们</h1>
        <p class="page-subtitle">分享技术见解，记录学习历程</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="about-content">
        <!-- 博客介绍卡片 -->
        <div class="intro-card card">
          <div class="intro-header">
            <div class="intro-icon">
              <el-icon size="48"><Notebook /></el-icon>
            </div>
            <div class="intro-text">
              <h2>个人博客系统</h2>
              <p>一个基于 Vue3 + Gin 的现代化博客平台</p>
            </div>
          </div>
          <div class="intro-features">
            <div class="feature-item">
              <el-icon color="#409EFF"><Check /></el-icon>
              <span>简洁优雅的界面设计</span>
            </div>
            <div class="feature-item">
              <el-icon color="#409EFF"><Check /></el-icon>
              <span>丰富的富文本编辑体验</span>
            </div>
            <div class="feature-item">
              <el-icon color="#409EFF"><Check /></el-icon>
              <span>实时评论互动功能</span>
            </div>
            <div class="feature-item">
              <el-icon color="#409EFF"><Check /></el-icon>
              <span>安全的用户认证系统</span>
            </div>
          </div>
        </div>

        <!-- 技术栈展示 -->
        <div class="tech-stack card">
          <h3 class="section-title">技术栈</h3>
          <div class="tech-grid">
            <div class="tech-category">
              <h4>前端技术</h4>
              <div class="tech-items">
                <div class="tech-item">
                  <el-tag type="primary" effect="dark">Vue 3</el-tag>
                  <span>现代化前端框架</span>
                </div>
                <div class="tech-item">
                  <el-tag type="success" effect="dark">Element Plus</el-tag>
                  <span>UI组件库</span>
                </div>
                <div class="tech-item">
                  <el-tag type="warning" effect="dark">Vite</el-tag>
                  <span>构建工具</span>
                </div>
                <div class="tech-item">
                  <el-tag type="info" effect="dark">Vue Router</el-tag>
                  <span>路由管理</span>
                </div>
                <div class="tech-item">
                  <el-tag type="danger" effect="dark">Pinia</el-tag>
                  <span>状态管理</span>
                </div>
              </div>
            </div>
            
            <div class="tech-category">
              <h4>后端技术</h4>
              <div class="tech-items">
                <div class="tech-item">
                  <el-tag type="primary" effect="dark">Golang</el-tag>
                  <span>后端语言</span>
                </div>
                <div class="tech-item">
                  <el-tag type="success" effect="dark">Gin</el-tag>
                  <span>Web框架</span>
                </div>
                <div class="tech-item">
                  <el-tag type="warning" effect="dark">GORM</el-tag>
                  <span>ORM库</span>
                </div>
                <div class="tech-item">
                  <el-tag type="info" effect="dark">MySQL</el-tag>
                  <span>数据库</span>
                </div>
                <div class="tech-item">
                  <el-tag type="danger" effect="dark">JWT</el-tag>
                  <span>身份认证</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能特性 -->
        <div class="features card">
          <h3 class="section-title">功能特性</h3>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon size="32"><User /></el-icon>
              </div>
              <h4>用户系统</h4>
              <p>完整的用户注册、登录、认证体系，支持JWT令牌管理</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon size="32"><EditPen /></el-icon>
              </div>
              <h4>文章管理</h4>
              <p>支持富文本编辑，Markdown渲染，文章CRUD操作</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon size="32"><ChatDotRound /></el-icon>
              </div>
              <h4>评论系统</h4>
              <p>实时评论功能，支持用户间的互动交流</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon size="32"><Lock /></el-icon>
              </div>
              <h4>权限控制</h4>
              <p>基于角色的权限管理，保护用户数据安全</p>
            </div>
          </div>
        </div>

        <!-- 开发团队 -->
        <div class="team card">
          <h3 class="section-title">开发团队</h3>
          <div class="team-members">
            <div class="team-member">
              <el-avatar :size="80" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=developer`" />
              <div class="member-info">
                <h4>开发者</h4>
                <p class="member-role">全栈工程师</p>
                <p class="member-desc">专注于Web开发技术，热爱开源项目</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="contact card">
          <h3 class="section-title">联系我们</h3>
          <div class="contact-info">
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <div class="contact-details">
                <span class="contact-label">邮箱</span>
                <span class="contact-value">xxxxxxxxx@xxx.com</span>
              </div>
            </div>
            <div class="contact-item">
              <el-icon><Link /></el-icon>
              <div class="contact-details">
                <span class="contact-label">GitHub</span>
                <a href="https://github.com" target="_blank" class="contact-link">项目仓库</a>
              </div>
            </div>
            <div class="contact-item">
              <el-icon><Document /></el-icon>
              <div class="contact-details">
                <span class="contact-label">文档</span>
                <a href="#" class="contact-link">使用指南</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="stats card">
          <h3 class="section-title">博客数据</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ stats.articles }}</div>
              <div class="stat-label">文章总数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ stats.comments }}</div>
              <div class="stat-label">评论数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ stats.users }}</div>
              <div class="stat-label">注册用户</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ stats.views }}</div>
              <div class="stat-label">总访问量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  Notebook, 
  Check, 
  User, 
  EditPen, 
  ChatDotRound, 
  Lock,
  Message,
  Link,
  Document
} from '@element-plus/icons-vue'
import request from '@/utils/request'

// 统计数据
const stats = ref({
  articles: 0,
  comments: 0,
  users: 0,
  views: 0
})

// 获取统计数据
const fetchStats = async () => {
  try {
    // 这里可以调用后端API获取真实数据
    // const response = await request.get('/stats')
    // stats.value = response.data
    
    // 模拟数据
    stats.value = {
      articles: 156,
      comments: 892,
      users: 42,
      views: 12543
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff 0%, #a8edea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 介绍卡片 */
.intro-card {
  padding: 40px;
  text-align: center;
}

.intro-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.intro-icon {
  color: #409EFF;
}

.intro-text h2 {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 8px;
}

.intro-text p {
  font-size: 1.1rem;
  color: #606266;
  margin: 0;
}

.intro-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-weight: 500;
  color: #303133;
}

/* 技术栈 */
.tech-stack {
  padding: 40px;
}

.section-title {
  font-size: 1.8rem;
  color: #303133;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #409EFF, #67C23A);
  border-radius: 2px;
}

.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.tech-category h4 {
  font-size: 1.3rem;
  color: #409EFF;
  margin-bottom: 20px;
  text-align: center;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  transform: translateX(8px);
  background: #e6f7ff;
}

.tech-item span {
  color: #606266;
  font-weight: 500;
}

/* 功能特性 */
.features {
  padding: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #409EFF;
  box-shadow: 0 10px 30px rgba(64, 158, 255, 0.1);
}

.feature-icon {
  color: #409EFF;
  margin-bottom: 16px;
}

.feature-card h4 {
  font-size: 1.2rem;
  color: #303133;
  margin-bottom: 12px;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

/* 团队信息 */
.team {
  padding: 40px;
}

.team-members {
  display: flex;
  justify-content: center;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  max-width: 400px;
}

.member-info h4 {
  font-size: 1.3rem;
  color: #303133;
  margin-bottom: 4px;
}

.member-role {
  color: #409EFF;
  font-weight: 600;
  margin-bottom: 8px;
}

.member-desc {
  color: #606266;
  margin: 0;
  line-height: 1.5;
}

/* 联系信息 */
.contact {
  padding: 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #e6f7ff;
  transform: translateX(8px);
}

.contact-item .el-icon {
  color: #409EFF;
  font-size: 20px;
}

.contact-details {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 0.9rem;
  color: #909399;
  margin-bottom: 2px;
}

.contact-value {
  font-weight: 600;
  color: #303133;
}

.contact-link {
  color: #409EFF;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #337ecc;
  text-decoration: underline;
}

/* 统计数据 */
.stats {
  padding: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .intro-header {
    flex-direction: column;
    text-align: center;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .team-member {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .intro-card,
  .tech-stack,
  .features,
  .team,
  .contact,
  .stats {
    padding: 30px 24px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .intro-features {
    grid-template-columns: 1fr;
  }
}
</style>