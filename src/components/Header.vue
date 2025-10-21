<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- 左侧 Logo -->
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <el-icon size="28"><Notebook /></el-icon>
          </div>
          <div class="logo-text">
            <h1>个人博客</h1>
            <p class="logo-subtitle">分享技术 · 记录生活</p>
          </div>
        </router-link>

        <!-- 中间导航菜单 -->
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </router-link>
          
          <router-link v-if="authStore.user" to="/create" class="nav-item">
            <el-icon><EditPen /></el-icon>
            <span>写文章</span>
          </router-link>
          
          <router-link to="/about" class="nav-item">
            <el-icon><InfoFilled /></el-icon>
            <span>关于</span>
          </router-link>
        </nav>

        <!-- 右侧用户区域 -->
        <div class="header-actions">
          <template v-if="authStore.user">
            <!-- 写文章按钮 -->
<!--            <router-link to="/create" class="create-btn-link">
              <el-button type="primary" :icon="EditPen" size="small" class="create-btn">
                写文章
              </el-button>
            </router-link> -->
            
            <!-- 用户信息 -->
            <el-dropdown class="user-dropdown">
              <div class="user-profile">
                <el-avatar 
                  :size="36" 
                  :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${authStore.user.username}`"
                  class="user-avatar"
                />
                <div class="user-info">
                  <span class="username">{{ authStore.user.username }}</span>
                </div>
                <el-icon class="dropdown-icon"><arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-menu">
                  <el-dropdown-item @click="$router.push('/profile')">
                    <el-icon><User /></el-icon>
                    <span>个人中心</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/my-posts')">
                    <el-icon><Document /></el-icon>
                    <span>我的文章</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>
                    <span>退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          
          <template v-else>
            <div class="auth-section">
              <router-link to="/login" class="login-btn">
                <el-icon><User /></el-icon>
                <span>登录</span>
              </router-link>
              <router-link to="/register" class="register-btn">
                <el-button type="primary" size="small">
                  注册
                </el-button>
              </router-link>
            </div>
          </template>

          <!-- 移动端菜单按钮 -->
          <div class="mobile-menu-btn" @click="showMobileMenu = !showMobileMenu">
            <el-icon size="20"><Menu /></el-icon>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="showMobileMenu" class="mobile-menu">
        <router-link to="/" class="mobile-nav-item" @click="showMobileMenu = false">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </router-link>
        
        <router-link v-if="authStore.user" to="/create" class="mobile-nav-item" @click="showMobileMenu = false">
          <el-icon><EditPen /></el-icon>
          <span>写文章</span>
        </router-link>
        
        <router-link to="/about" class="mobile-nav-item" @click="showMobileMenu = false">
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </router-link>
        
        <template v-if="authStore.user">
          <router-link to="/profile" class="mobile-nav-item" @click="showMobileMenu = false">
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </router-link>
          <router-link to="/my-posts" class="mobile-nav-item" @click="showMobileMenu = false">
            <el-icon><Document /></el-icon>
            <span>我的文章</span>
          </router-link>
          <div class="mobile-nav-item logout-item" @click="handleMobileLogout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出登录</span>
          </div>
        </template>
        
        <template v-else>
          <router-link to="/login" class="mobile-nav-item" @click="showMobileMenu = false">
            <el-icon><User /></el-icon>
            <span>登录</span>
          </router-link>
          <router-link to="/register" class="mobile-nav-item" @click="showMobileMenu = false">
            <el-icon><EditPen /></el-icon>
            <span>注册</span>
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { 
  ArrowDown, 
  Notebook, 
  House, 
  EditPen, 
  User, 
  SwitchButton,
  Menu,
  InfoFilled,
  Document
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const authStore = useAuthStore()
const showMobileMenu = ref(false)

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    authStore.logout()
    ElMessage.success('已退出登录')
    showMobileMenu.value = false
  } catch {
    // 用户取消
  }
}

const handleMobileLogout = async () => {
  await handleLogout()
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  width: 100%;
}

/* Logo 样式 */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  display: flex;
  align-items: center;
  color: #409eff;
}

.logo-text h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
}

.logo-subtitle {
  font-size: 11px;
  opacity: 0.8;
  margin: 0;
  font-weight: 300;
  white-space: nowrap;
}

/* 中间导航菜单 */
.nav-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

.nav-item.router-link-active {
  background: rgba(64, 158, 255, 0.2);
  color: white;
}

/* 右侧操作区域 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* 写文章按钮 */
.create-btn-link {
  text-decoration: none;
}

.create-btn {
  background: linear-gradient(135deg, #409eff, #337ecc);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.create-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 用户下拉菜单 */
.user-dropdown {
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.user-avatar {
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 600;
  font-size: 14px;
  color: white;
  white-space: nowrap;
}

.dropdown-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease;
}

.user-profile:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 8px;
}

/* 登录注册区域 */
.auth-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.register-btn {
  text-decoration: none;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.mobile-nav-item:hover {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

.mobile-nav-item.logout-item {
  color: #f56c6c;
}

.mobile-nav-item.logout-item:hover {
  background: rgba(245, 108, 108, 0.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .header-content {
    gap: 24px;
  }
  
  .nav-menu {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .header {
    height: 64px;
  }

  .header-content {
    grid-template-columns: auto 1fr auto;
    gap: 16px;
  }

  .nav-menu {
    display: none;
  }

  .header-actions {
    gap: 12px;
  }

  .user-info {
    display: none;
  }

  .auth-section {
    gap: 8px;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .logo-text h1 {
    font-size: 18px;
  }

  .logo-subtitle {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .header-content {
    gap: 12px;
  }
  
  .create-btn-link {
    display: none;
  }
  
  .logo-text h1 {
    font-size: 16px;
  }
  
  .logo-subtitle {
    display: none;
  }
}
</style>