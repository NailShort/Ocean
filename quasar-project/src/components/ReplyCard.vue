<template>
    <div :to="'/replys/' + _id" class="reply col-12 row items-center justify-center">
      <!-- 左側使用者 -->
      <div class="re-user col-3 items-center justify-center">
        <img class="user-img col-12" :src="avatar">
        <div class="re-name col-12">{{ userid }}</div>
      </div>
      <!-- 右側內容 -->
      <div class="re-des col-9">
        <div class="line"></div>
        <p class="time">{{ time }}</p>
        <img :src="image">
        <p>{{ description }}</p>
      </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../plugins/axios'

const avatar = computed(() => {
  return `https://source.boringavatars.com/beam/256/${product.userid}?colors=000000,F0A818,304878,181848,F0A818`
})

const route = useRoute()
const router = useRouter()

const product = reactive({
  _id: '',
  name: '',
  time: '',
  description: '',
  image: '',
  sell: true,
  category: '',
  userid: ''
})

const getProductData = async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.time = data.result.time
    product.description = data.result.description
    product.image = data.result.image
    product.sell = data.result.sell
    product.category = data.result.category
    product.userid = data.result.userid

    document.title = '購物網 | 商品 | ' + product.name
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品失敗'
    })
    router.go(-1)
  }
}

(async () => {
  await getProductData()
})()

defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: ''
  },
  userid: {
    type: String,
    default: ''
  },
  userid: {
    type: String,
    default: ''
  },
  time: {
    type: Date,
    default: Date.now
  },
  /* eslint-enable */
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.reply{
    margin-top: 30px;
    margin-bottom: 50px;
    background: white;
    .re-user{
      padding: 10px;
      text-align: center;

        .user-img{
          width: 70px;
          height: 70px;
          margin-bottom: 10px;
        }
      }
    }
    .re-des{
      padding: 10px 30px;
      position: relative;
      .line{
        position: absolute;
        width: 1px;
        height: 95%;
        background: rgba(0,0,0,0.1);
        left: 0;
      }
      .time{
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
      img{
        width: 100%;
      }
    }
</style>
