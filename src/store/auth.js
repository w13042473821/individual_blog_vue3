import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'
import request from '@/utils/request'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getToken())
  const user = ref(getUser())

  const login = async (loginData) => {
    const response = await request.post('/login', loginData)
    token.value = response.token
    user.value = response.user
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const register = async (registerData) => {
    const response = await request.post('/register', registerData)
    return response
  }

  const logout = () => {
    token.value = null
    user.value = null
    removeToken()
    removeUser()
  }

  const fetchUser = async () => {
    try {
      const response = await request.get('/user')
      user.value = response.user
      setUser(response.user)
    } catch (error) {
      logout()
      throw error
    }
  }

  return {
    token,
    user,
    login,
    register,
    logout,
    fetchUser
  }
})