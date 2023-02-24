import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from '../../plugins/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const like = ref(0)
  const role = ref(0)
  const image = ref('')
  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === 1
  })
  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${account.value}?colors=000000,F0A818,304878,181848,F0A818`
  })

  const login = async (form) => {
    try {
      const { data } = await api.post('/users/login', form)
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      like.value = data.result.like
      role.value = data.result.role
      image.value = data.result.image
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登入成功'
      })
      router.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      account.value = ''
      role.value = 0
      cart.value = 0
      like.value = 0
      router.push('/')
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登出成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getUser = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      like.value = data.result.like
      role.value = data.result.role
      image.value = data.result.image
    } catch (error) {
      logout()
    }
  }

  const editLike = async ({ _id, quantity }) => {
    if (token.value.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '請先登入'
      })
      router.push('/login')
      return
    }
    try {
      const { data } = await apiAuth.post('/users/like', { p_id: _id, quantity: parseInt(quantity) })
      like.value = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '已完成'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const editImage = async (fd) => {
    try {
      const { data } = await apiAuth.patch('/users/eduser', fd)
      image.value = data.result.image
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    login,
    logout,
    getUser,
    isLogin,
    isAdmin,
    avatar,
    editLike,
    editImage,
    image
  }
}, {
  persist: {
    key: 'Ocean',
    paths: ['token']
  }
})

// const form = reactive({
//   _id: '',
//   name: '',
//   password: '',
//   image: undefined,
//   email: '',

//   loading: false,
//   dialog: false
// })

// (async () => {
//   try {
//     const { data } = await apiAuth.get('/users/me')
//     // users.push(...data.result)
//     form._id = data.result._id
//     form.name = data.result.name || '尚未修改名稱'
//     form.image = data.result.image || '../../../images/尚無照片-01.jpg'
//     form.email = data.result.email

//     form.loading = false
//     form.dialog = false
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: error?.response?.data?.message || '發生錯誤'
//     })
//   }
// })()
