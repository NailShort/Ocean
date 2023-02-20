<template>
  <!-- 產品內頁 -->
  <div id="product">
    <!-- 路徑 -->
    <div class="route col-12 row items-center justify-start">
        <q-btn to="/" flat style="color: black" label="首頁" />
        <span>></span>
        <q-btn to="/article" flat style="color: black" label="文章討論" />
        <span>></span>
        <q-btn :disable="!progress" flat style="color: gray" :label=product.name />
      </div>

    <div class="contant row warp items-center justify-center">
      <!-- 照片 -->
      <div class="col-12 row items-center justify-center">
        <div class="img">
          <img :src="product.image">
        </div>
      </div>
      <!-- 標題 -->
      <div class="col-12">
        <p class="title">{{ product.name }}</p>
        <p class="user row items-center justify-center">
          <img class="user-img" src="../../../images/fishbook/小丑.png">
          <span class="user-name">user name</span>
          ${{ product.time }}
          <q-btn class="like" icon="favorite_border" label="Like" @click="editLike({_id, quantity: 1})"/>
        </p>
      </div>
      <!-- 內文 -->
      <div class="des col-10">
        <p class="pre">{{ product.description }}</p>
      </div>
    </div>

    <div class="reply col-12 row items-center justify-center">
      <div class="re-user col-3 row items-center justify-center">
        <div class="line"></div>
        <img src="../../../images/fishbook/小丑.png" alt="">
        <div class="re-name">user name</div>
      </div>
      <div class="re-des col-9">
        <p class="time">2023-02-20</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis atque, aliquam dolorum earum modi nostrum tenetur odio minima qui ipsa quas asperiores officiis, obcaecati rerum et dolore? Pariatur, impedit eius asperiores voluptatibus atque molestiae quia molestias accusantium quisquam maxime officia beatae commodi sapiente repellat cupiditate nam, at magni. Commodi sapiente fugit voluptas, nisi rerum dignissimos! Distinctio non sapiente consequuntur ab assumenda reiciendis, soluta hic labore dolorem, tempore magnam iste eum temporibus harum ea. Veniam nulla quisquam deleniti aliquam suscipit at.</p>
      </div>
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
import { useUserStore } from 'src/stores/user'

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editLike } = user

// const quantity = ref(0)

// const rules = {
//   required (value) {
//     return !!value || '欄位必填'
//   },
//   number (value) {
//     return value > 0 || '數量錯誤'
//   }
// }

const product = reactive({
  _id: '',
  name: '',
  time: '',
  description: '',
  image: '',
  sell: true,
  category: ''
});

// const submitLike = () => {
//   editLike({ _id: product._id, quantity: quantity.value })
// }

(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.time = data.result.time
    product.description = data.result.description
    product.image = data.result.image
    product.sell = data.result.sell
    product.category = data.result.category

    document.title = '購物網 | 商品 | ' + product.name
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

#product{
  padding-top: 100px;
  background: #eee;
  padding-bottom: 50px;
  .contant{
    background: white;
    .title{
      font-size: 6vw;
      text-align: center;
      margin: 0;
      flex-wrap: 700;
    }
    .user{
      font-size: 14px;
      color: gray;
      text-align: center;
      .user-img{
        width: 50px;
        height: 50px;
      }
      .user-name{
        font-size: 20px;
        color: rgb(15,85,165);
        padding:0 20px 0 5px ;
      }
      .like{
        margin-left: 20px;
      }
    }
    .img{
      width: 100%;
      height: 250px;
      position: relative;
      margin: 0 0 20px 0;
      background: #eee;
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
    .des{
      padding-bottom: 50px;
      .pre{
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 30px 0;
        width: 90%;
        margin: auto;
        white-space: pre-wrap;
        text-indent: 2rem;
        &:first-letter{
          font-size:30px;
        }
      }
    }
  }
  .reply{
    margin-bottom: 50px;
    .re-user{
      padding: 10px;
      position: relative;
      .line{
        position: absolute;
        width: 1px;
        height: 95%;
        background: rgba(0,0,0,0.1);
        right: 0;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .re-des{
      padding: 10px 30px;
      .time{
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
    }
  }
}
@media (min-width:600px) {
  #product{
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
    .reply{
      max-width:800px;
      margin: auto;
      margin-top: 20px;
      background: white;
    }
  }
}

</style>
