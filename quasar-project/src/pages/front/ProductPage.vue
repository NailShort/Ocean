<template>
  <!-- 文章內頁 -->
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
          <img class="user-img" :src="avatar">
          <span class="user-name">{{ product.userid }}</span>
          {{ product.time }}
          <q-btn class="like" icon="favorite_border" label="Like" @click="editLike({_id, quantity: 1})"/>
        </p>
      </div>
      <!-- 內文 -->
      <div class="des col-10">
        <p class="pre">{{ product.description }}</p>
      </div>
      <!-- 點擊回覆 -->
      <div class="reply-btn col-10">
        <q-btn label="回覆文章" color="primary" @click="openDialog(-1)" />
        <q-dialog v-model="form.dialog" persistent>
          <q-card style="width: 100%;">

            <q-form  @submit="submit">
              <q-card-section>
                <div class="text-h6">請輸入內容</div>
              </q-card-section>
              <q-card-section class="q-pt-none">

                <!-- 內文 -->
                <q-input class="col-12" style="padding: 10px;"
                  v-model="form.description"
                  filled
                  clearable
                  type="textarea"
                  color="red-12"
                  label="內文"
                  hint="輸入內文"
                  :shadow-text="textareaShadowText"
                  @keydown="processTextareaFill"
                  @focus="processTextareaFill"
                />

              <!-- 照片 -->
              <q-file outlined v-model="form.image" class="col-12" style="padding: 10px; margin-top: 10px;">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              </q-card-section>
              <q-card-actions align="right" class="text-primary">
                <q-btn :disabled="form.loading" type="submit" color="primary" label="送出" />
                <q-btn :disabled="form.loading" @click="form.dialog = false" label="取消" color="primary" flat class="q-ml-sm" />
              </q-card-actions>

            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <!-- 回覆內容 -->
    <!-- <div class="reply col-12 row items-center justify-center">
      <div class="re-user col-3 row items-center justify-center">
        <div class="line"></div>
        <img src="../../../images/fishbook/小丑.png" alt="">
        <div class="re-name">user name</div>
      </div>
      <div class="re-des col-9">
        <p class="time">2023-02-20</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis atque, aliquam dolorum earum modi nostrum tenetur odio minima qui ipsa quas asperiores officiis, obcaecati rerum et dolore? Pariatur, impedit eius asperiores voluptatibus atque molestiae quia molestias accusantium quisquam maxime officia beatae commodi sapiente repellat cupiditate nam, at magni. Commodi sapiente fugit voluptas, nisi rerum dignissimos! Distinctio non sapiente consequuntur ab assumenda reiciendis, soluta hic labore dolorem, tempore magnam iste eum temporibus harum ea. Veniam nulla quisquam deleniti aliquam suscipit at.</p>
      </div>
    </div> -->
    <div class="col-12 row justify-center items-center" v-for="reply in replys" :key="reply._id">
      <ReplyCard v-bind="reply"></ReplyCard>
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
import { reactive, computed } from 'vue'
import { api, apiAuth } from '../../../plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useUserStore } from '../../stores/user'
import ReplyCard from '../../components/ReplyCard.vue'

const user = useUserStore()

const route = useRoute()
const router = useRouter()

const { editLike } = user

const avatar = computed(() => {
  return `https://source.boringavatars.com/beam/256/${product.userid}?colors=000000,F0A818,304878,181848,F0A818`
})

// 發表回覆 -------------------------------------------------------------

const replys = reactive([])
const form = reactive({
  _id: '',
  name: '',
  time: '',
  description: '',
  image: undefined,

  loading: false,
  dialog: false,
  idx: -1
})

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.description = ''
    form.image = undefined

    form.loading = false
    form.idx = -1
  } else {
    form._id = replys[idx]._id
    form.description = replys[idx].description
    form.image = undefined

    form.loading = false
    form.idx = idx
  }
  form.dialog = true
}

const submit = async () => {
  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('description', form.description)
  fd.append('image', form.image)
  fd.append('proid', product._id)

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/replys', fd)
      console.log(data.result)
      replys.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/replys/' + form._id, fd)
      replys[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.dialog = false
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  form.loading = false
}

// --------------------------------------------------------------

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
  category: '',
  userid: ''
})

// const submitLike = () => {
//   editLike({ _id: product._id, quantity: quantity.value })
// }

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

const getReplysData = async () => {
  try {
    const { data } = await api.get('/replys/' + product._id)
    replys.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
}

(async () => {
  await getProductData()
  await getReplysData()
})()

// const { data } = await api.get('/replys/' + product._id)
// console.log(product._id)
// replys.push(...data.result)
// (async () => {
//   try {
//     const { data } = await api.get('/replys/' + product._id)
//     console.log(product._id)
//     replys.push(...data.result)
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: error?.response?.data?.message || '發生錯誤'
//     })
//   }
// })()

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
    .des{
      padding-bottom: 30px;
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
    .reply-btn{
      text-align: right;
      padding-bottom: 50px;
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
  .top{
    max-width: 800px;
    margin: auto;
    margin-top: 30px;
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
