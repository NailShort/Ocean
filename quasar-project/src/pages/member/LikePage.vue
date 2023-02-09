<template>
  <div id="Like">
    <div class="content">
      <div class="row">
        <h1 h1>最愛文章</h1>
        <div class="col-10">
          <table>
            <thead>
              <tr>
                <th>圖片</th>
                <th>名稱</th>
                <th>日期</th>
                <th>數量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, idx) in like" :key="product._id" :class="{'bg-red': !product.p_id.sell}">
                <td>
                  <img :aspect-ratio="1" :width="200" :src="product.p_id.image">
                </td>
                <td>{{ product.p_id.name }}</td>
                <td>{{ product.p_id.price }}</td>
                <td>
                  <q-btn color="primary" @click="updateLike(idx, -1)" label="-"/>
                  | &nbsp;{{ product.quantity }}&nbsp;
                  <q-btn color="primary" @click="updateLike(idx, 1)" label="+"/>
                </td>
                <td>{{ product.quantity * product.p_id.price }}</td>
                <td>
                  <q-btn color="red" @click="updateLike(idx, product.quantity*-1)" label="刪除"/>
                </td>
              </tr>
              <tr v-if="like.length === 0">
                <td colspan="6">沒有商品</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-10">
          <p>總金額 {{ totalPrice }}</p>
          <q-btn color="green" :disabled="!canCheckout" @click="onCheckoutBtnClick" label="結帳"/>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../../../plugins/axios'
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = useUserStore()
const { editLike, checkout } = user

const like = reactive([])

const updateLike = async (idx, quantity) => {
  await editLike({ _id: like[idx].p_id._id, quantity })
  like[idx].quantity += quantity
  if (like[idx].quantity <= 0) {
    like.splice(idx, 1)
  }
}

const onCheckoutBtnClick = async () => {
  await checkout()
  router.push('/orders')
}

const totalPrice = computed(() => {
  return like.reduce((total, current) => {
    return total + (current.p_id.price * current.quantity)
  }, 0)
})

const canCheckout = computed(() => {
  return like.length > 0 && like.some(product => {
    return !product.p_id.sell
  })
});

(async () => {
  try {
    const { data } = await apiAuth.get('/users/like')
    like.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得購物車失敗'
    })
  }
})()
</script>

<style lang="scss" scoped>
#Like{
  background: rgb(225,85,25);
  height: 887px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 860px;
    width: 98%;
    overflow: auto;
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
