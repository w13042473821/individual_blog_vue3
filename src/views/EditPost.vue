<template>
  <div class="container">
    <div class="edit-post">
      <h2 class="page-title">编辑文章</h2>
      
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>
      
      <div v-else-if="!post" class="not-found">
        <el-result icon="error" title="文章不存在" sub-title="无法找到要编辑的文章">
          <template #extra>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
          </template>
        </el-result>
      </div>
      
      <div v-else-if="!isAuthor" class="not-authorized">
        <el-result icon="warning" title="无权限" sub-title="您没有权限编辑此文章">
          <template #extra>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
          </template>
        </el-result>
      </div>
      
      <div v-else class="post-form card">
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          @submit.prevent="handleSubmit"
        >
          <el-form-item prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入文章标题"
              size="large"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          
          <el-form-item prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="15"
              placeholder="请输入文章内容"
              resize="none"
            />
          </el-form-item>
          
          <el-form-item>
            <div class="form-actions">
              <el-button @click="$router.back()">取消</el-button>
              <el-button
                type="primary"
                :loading="submitting"
                @click="handleSubmit"
              >
                更新文章
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const authStore = useAuthStore()
const formRef = ref()

const loading = ref(true)
const submitting = ref(false)
const post = ref(null)

const form = reactive({
  title: '',
  content: ''
})

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 3, max: 100, message: '标题长度在 3 到 100 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
    { min: 10, message: '文章内容不能少于10个字符', trigger: 'blur' }
  ]
}

const isAuthor = computed(() => {
  return authStore.user && post.value && authStore.user.id === post.value.user_id
})

const fetchPost = async () => {
  loading.value = true
  try {
    const id = route.params.id
    post.value = await postsStore.fetchPost(id)
    
    // 填充表单
    if (post.value) {
      form.title = post.value.title
      form.content = post.value.content
    }
  } catch (error) {
    console.error('获取文章失败:', error)
    ElMessage.error('文章不存在')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    submitting.value = true
    
    await postsStore.updatePost(post.value.id, form)
    ElMessage.success('文章更新成功')
    router.push(`/post/${post.value.id}`)
  } catch (error) {
    console.error('更新失败:', error)
    ElMessage.error('更新失败，请重试')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped>
.edit-post {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;
  color: #303133;
  text-align: center;
}

.loading-container {
  padding: 40px;
}

.not-found,
.not-authorized {
  padding: 60px 0;
}

.post-form {
  padding: 30px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>