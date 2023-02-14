<template>
  <div id="article">
    <div class=" btn row justify-center items-center">
      <div class="col-12 row  justify-center">
        <q-btn flat style="color: rgb(15,85,165)" label="最新文章" />
        <q-btn flat style="color: rgb(15,85,165)" label="海水魚類" />
        <q-btn flat style="color: rgb(15,85,165)" label="珊瑚軟體" />
        <q-btn flat style="color: rgb(15,85,165)" label="硬體設備" />
        <q-btn flat style="color: rgb(15,85,165)" label="二手分享" />
      </div>
    </div>

    <div class="art col-12 row justify-center items-center" v-for="product in products" :key="product._id">
      <ArticleCard v-bind="product"></ArticleCard>
    </div>

    <div class="art02 col-12 row justify-center items-center">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import ArticleCard from '../../components/ArticleCard.vue'
import Swal from 'sweetalert2'

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

const products = reactive([]);

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
</script>

<!-- q-table ----------------------------------------------------------------------->
<script>

const columns = [
  {
    name: 'name',
    required: true,
    label: '分類類別',
    align: 'left',
    field: row => row.category,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'image', align: 'center', label: '預覽照片', field: 'image', sortable: true },
  { name: 'fat', label: '主題名稱', field: 'name', sortable: true },
  { name: 'carbs', label: '文章內容', field: 'description' },
  { name: 'protein', label: '收藏', field: 'time' }
]

const rows = [
  {
    category: 'Frozen Yogurt',
    image: 159,
    name: 6.0,
    description: 24,
    time: 4.0
  }
]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}

</script>

<style lang="scss" scoped>
  #article{
    padding-top: 150px;
    padding-bottom: 150px;
    .btn{
      margin-bottom: 50px;
    }
    .art{
      margin-top: 20px;
    }
  }
  @media(max-width:600px){
    .art02{
      display:none;
    }
  }

  @media(min-width:600px){
    .art{
      display:none;
    }
  }
</style>
