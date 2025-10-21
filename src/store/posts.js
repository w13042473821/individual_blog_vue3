import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)

  const fetchPosts = async () => {
    loading.value = true
    try {
      const response = await request.get('/posts')
      posts.value = response.posts
    } finally {
      loading.value = false
    }
  }

  const fetchPost = async (id) => {
    const response = await request.get(`/posts/${id}`)
    currentPost.value = response.post
    return response.post
  }

  const createPost = async (postData) => {
    const response = await request.post('/posts', postData)
    posts.value.unshift(response.post)
    return response.post
  }

  const updatePost = async (id, postData) => {
    const response = await request.put(`/posts/${id}`, postData)
    const index = posts.value.findIndex(post => post.id === id)
    if (index !== -1) {
      posts.value[index] = response.post
    }
    if (currentPost.value && currentPost.value.id === id) {
      currentPost.value = response.post
    }
    return response.post
  }

  const deletePost = async (id) => {
    await request.delete(`/posts/${id}`)
    posts.value = posts.value.filter(post => post.id !== id)
  }

  return {
    posts,
    currentPost,
    loading,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
  }
})