<template>
  <div class="container">
    <div class="create-post">
      <h2 class="page-title">写文章</h2>
      
      <div class="post-form card">
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
                :loading="loading"
                @click="handleSubmit"
              >
                发布文章
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/store/posts'
import { ElMessage } from 'element-plus'

const router = useRouter()
const postsStore = usePostsStore()
const formRef = ref()

const loading = ref(false)
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

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    await postsStore.createPost(form)
    ElMessage.success('文章发布成功')
    router.push('/')
  } catch (error) {
    console.error('发布失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;
  color: #303133;
  text-align: center;
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