<template>
  <!-- 魚種介紹 -->
  <div id="fish">
    <div class="row">
      <div class="col-10">
        <h1>{{ fish.name }}</h1>
      </div>
      <div class="col-10">
        <img :src="fish.image">
      </div>
      <div class="col-10">
        <p>${{ fish.time }}</p>
        <p class="pre">{{ fish.description }}</p>
      </div>
      <div class="col-10">
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

const route = useRoute()
const router = useRouter()

const quantity = ref(0)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

const fish = reactive({
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
    const { data } = await api.get('/fishs/' + route.params.id)
    fish._id = data.result._id
    fish.name = data.result.name
    fish.time = data.result.time
    fish.description = data.result.description
    fish.image = data.result.image
    fish.sell = data.result.sell

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
.pre{
  white-space: pre;
}
#fish{
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
