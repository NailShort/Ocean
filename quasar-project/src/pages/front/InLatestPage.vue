<template>
  <div id="latest">
    <!-- 路徑 -->
    <div class="route col-12 row items-center justify-start">
      <q-btn to="/" flat style="color: black" label="首頁" />
      <span>></span>
      <q-btn to="/latest" flat style="color: black" label="最新消息"/>
      <span>></span>
      <q-btn flat :disable="!progress" style="color: gray" :label=latest.name />
    </div>
    <!-- 內容 -->
    <div class="contant row warp">
      <!-- 照片 -->
      <div class="img col-12">
        <img :src="latest.image">
      </div>
      <!-- 標題 -->
      <div class="col-12 row items-center justify-center">
        <p class="title col-12">{{ latest.name }}</p>
        <p class="time">{{ latest.time }}</p>
      </div>
      <div class="line"></div>
      <!-- 內文 -->
      <div class="des col-10">
        <p class="pre">{{ latest.description }}</p>
      </div>
    </div>

    <!-- 回頂部 -->
    <div class="top col-12 row items-center justify-end">
      <q-btn ref="myButton" @click="scrollToTop" flat style="color: rgb(15,85,165);" icon="navigation"  />
    </div>

    <!-- <div class="overlay" :model-value="product.sell">
      <h1>以下架</h1>
      <q-btn @click="router.go(-1)" style="background: goldenrod; color: white" label="回上頁" />
    </div> -->
  </div>

</template>

<script setup>
import { reactive } from 'vue'
import { api } from '../../../plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import { Swal } from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const latest = reactive({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: ''
});

(async () => {
  try {
    const { data } = await api.get('/latests/' + route.params.id)
    latest._id = data.result._id
    latest.name = data.result.name
    latest.time = data.result.time
    latest.description = data.result.description
    latest.image = data.result.image
    latest.sell = data.result.sell

    document.title = 'Ocean | 最新消息 | ' + latest.name
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品失敗'
    })
    router.go(-1)
  }
})()

</script>

<script>
export default {
  methods: {
    scrollToTop () {
      const el = document.body // 获取按钮元素
      el.scrollIntoView({ behavior: 'smooth' }) // 滚动到顶部
    }
  }
}
</script>

<style lang="scss" scoped>

#latest{
  background: #eee;
  min-height: 80vh;
  padding-top: 100px;
  padding-bottom: 50px;
  .contant{
    background: white;
    .img{
      width: 100%;
      height: 250px;
      position: relative;
      margin: 0 0 20px 0;
      background: black;
      img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .title{
      font-size: 6vw;
      text-align: center;
      margin: 0;
      flex-wrap: 700;
    }
    .time{
      color: gray;
    }
    .line{
      height: 1px;
      width: 95%;
      background: rgba(0,0,0,0.2);
      margin: auto;
    }
    .des{
      padding-bottom: 30px;
      margin: auto;
      .pre{
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 30px 0;
        width: 90%;
        margin: auto;
        white-space: pre-wrap;
      }
    }
  }
  .top{
    max-width: 800px;
    margin: auto;
    margin-top: 30px;
  }
}

@media (min-width:600px) {
  #latest{
    .route{
      max-width:800px;
      margin: auto;
    }
    .contant{
      max-width:800px;
      margin: auto;
      .img{
        height: 500px;
      }
      .title{
        font-size: 40px;
      }
    }
  }
}

</style>
