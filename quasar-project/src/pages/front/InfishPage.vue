<template>
  <!-- 單一魚種介紹 -->
  <div id="fish">
    <!-- 路徑 -->
    <div class="route col-12 row items-center justify-start">
      <q-btn to="/" flat style="color: black" label="首頁" />
      <span>></span>
      <q-btn to="/fish" flat style="color: black" label="魚種圖鑑"/>
      <span>></span>
      <q-btn @click="router.go(-1)" flat style="color: black" :label=fish.category />
      <span>></span>
      <q-btn flat :disable="!progress" style="color: gray" :label=fish.name />
    </div>
    <div class="contant row warp">
      <!-- 圖片 -->
      <div class="img col-12 col-md-6">
        <img :src="fish.image">
      </div>
      <!-- 說明 -->
      <div class="text col-12 col-md-6">
        <p>中文名稱：{{ fish.name }}</p>
        <p>魚隻分類：{{ fish.category }}</p>
        <p>英文名稱：{{ fish.egname }}</p>
        <p>學術名稱：{{ fish.stname }}</p>
        <p>成體尺寸：{{ fish.size }} cm</p>
        <p>食物要求：{{ fish.food }}</p>
        <p>危險程度：{{ fish.danger }}</p>
        <p>主要產地：{{ fish.place }}</p>
      </div>
      <!-- 線 -->
      <div class="line"></div>
      <!-- 內文 -->
      <div class="des col-12">
        <p>{{ fish.description }}</p>
      </div>

      <!-- <div class="col-10">
      <q-form @submit="submitLike">
        <q-input
          filled
          v-model.number="quantity"
          type="number"
          label="數量"
          lazy-rules
          :rules="[rules.required]"
        />
        <q-btn type="submit" color="primary" label="送出"/>
      </q-form>
    </div> -->
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

// const quantity = ref(0)

// const rules = {
//   required (value) {
//     return !!value || '欄位必填'
//   }
// }

const fish = reactive({
  _id: '',
  name: '',
  egname: '',
  stname: '',
  danger: '',
  food: '',
  size: 0,
  place: '',
  description: '',
  image: '',
  sell: true,
  category: ''
});

(async () => {
  try {
    const { data } = await api.get('/fishs/' + route.params.id)
    fish._id = data.result._id
    fish.name = data.result.name
    fish.egname = data.result.egname
    fish.stname = data.result.stname
    fish.danger = data.result.danger
    fish.food = data.result.food
    fish.size = data.result.size
    fish.place = data.result.place
    fish.description = data.result.description
    fish.image = data.result.image
    fish.sell = data.result.sell
    fish.category = data.result.category

    document.title = 'Ocean | 最新消息 | ' + fish.name
    // document.querySelector('meta[property="og:title"]').setAttribute('content', product.name)
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

<style lang="scss" scoped>

#fish{
  background: #eee;
  min-height: 80vh;
  padding-top: 150px;
  padding-bottom: 150px;
  .route{
    width: 80%;
    margin: auto;
  }
  .contant{
    background: white;
    max-width: 80%;
    margin: auto;
    border: 10px solid white;
    .img{
      background: black;
      display: flex;
      img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }
    .text{
      padding: 30px;
    }
    .line{
      height: 1px;
      width: 95%;
      background: rgba(0,0,0,0.2);
      margin: auto;
      margin-top: 30px;
    }
    .des{
      padding: 30px;
      text-indent: 2rem;
      white-space: pre-wrap;
    }
  }
}
@media (min-width:1024px) {
  // #fish{
  //   .contant{
  //     max-width: 1024px;
  //   }
  // }
}

</style>
