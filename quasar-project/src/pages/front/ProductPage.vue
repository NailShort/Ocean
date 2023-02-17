<template>
  <!-- 產品內頁 -->
  <div id="product">
    <div class="row">
      <div class="col-10">
        <h1>{{ product.name }}</h1>
      </div>
      <div class="col-10">
        <img :src="product.image">
      </div>
      <div class="col-10">
        <p>${{ product.price }}</p>
        <p class="pre">{{ product.description }}</p>
      </div>
      <div class="col-10">
      <q-form @submit="submitLike">
        <q-input
          filled
          v-model.number="quantity"
          type="number"
          label="數量"
          lazy-rules
          :rules="[rules.required, rules.number]"
        />
        <q-btn type="submit" color="primary" label="送出"/>
      </q-form>
    </div>
    </div>

    <!-- <div class="overlay" :model-value="product.sell">
      <h1>以下架</h1>
      <q-btn @click="router.go(-1)" style="background: goldenrod; color: white" label="回上頁" />
    </div> -->
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '../../../plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import { Swal } from 'sweetalert2'
import { useUserStore } from '../../stores/user'

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editLike } = user

const quantity = ref(0)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  number (value) {
    return value > 0 || '數量錯誤'
  }
}

const product = reactive({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: ''
})

const submitLike = () => {
  editLike({ _id: product._id, quantity: quantity.value })
}

(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.price = data.result.price
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
.pre{
  white-space: pre;
}
#product{
  display: flex;
  justify-content: center;
  position: relative;
  .row{
    justify-content: center;
    text-align: center;
  }
  .overlay{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

</style>
