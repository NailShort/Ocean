<template>
  <!-- 文章討論頁 -->
  <div id="article">
    <div class=" btn row justify-center items-center">
      <q-btn v-for="fish,index in articleCategory" flat color="primary" :key="index" :label="fish" @click="fishActive=fish" />
    </div>

    <div class="art row warp justify-center items-center" v-for="product in ac" :key="product._id">
      <ArticleCard v-bind="product"></ArticleCard>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { api } from 'app/plugins/axios'
import ArticleCard from '../../components/ArticleCard.vue'
import Swal from 'sweetalert2'

const products = reactive([])

// 分類篩選 -------
const articleCategory = ['所有文章', '海水魚類', '珊瑚軟體', '硬體設備', '二手分享']
const fishActive = ref(articleCategory[0])

const ac = computed(() => {
  return products.filter((fish1) => {
    if (fishActive.value === articleCategory[0]) {
      return fish1
    } else {
      return fish1.category === fishActive.value
    }
  })
});

(async () => {
  try {
    const { data } = await api.get('/products')
    products.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

defineProps({
  /* eslint-disable */
    _id: {
      type: String,
      default: ''
    },
    /* eslint-enable */
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
  #article{
    padding: 150px 10px;
    .btn{
      margin-bottom: 50px;
      .q-btn{
        margin: 0px;
        padding: 0 15px 0 15px;
        border-right: 1px solid rgba(0,0,0,0.1);
        border-left: 1px solid rgba(0,0,0,0.1);
        border-radius: 0;
      }
    }
    .art{
      margin-top: 20px;
    }
  }

  @media (min-width:819px) {
    #article{
      max-width:800px;
      margin: auto;
    }
  }

</style>
