<template>
  <div id="Like">
    <div class="content">
      <div class="row items-center justify-center">
        <div class="top col-12">
          <h4 class="title">最愛文章</h4>
        </div>

          <table class="col-12">
            <thead>
              <tr>
                <th>圖片</th>
                <th>名稱</th>
                <th>日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-if="like.length">
              <tr v-for="(product, idx) in like" :key="product._id" :class="{'bg-red': !product.p_id?.sell}">
                <td class="img">
                  <img :aspect-ratio="1" :width="200" :src="product.p_id?.image">
                </td>
                <td class="name">
                  <router-link :to="'/product/' + p_id">
                    {{ product.p_id?.name }}
                  </router-link>
                  </td>
                <td class="time">{{ product.p_id?.time }}</td>
                <td class="btn">
                  <q-btn color="red" @click="updateLike(idx, product.quantity*-1)" label="刪除"/>
                </td>
              </tr>
              <tr v-if="like.length === 0">
                <td colspan="6">沒有商品</td>
              </tr>
            </tbody>
          </table>

        </div>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../../../plugins/axios'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const { editLike } = user

const like = reactive([])

const updateLike = async (idx, quantity) => {
  await editLike({ _id: like[idx].p_id._id, quantity })
  like[idx].quantity += quantity
  if (like[idx].quantity <= 0) {
    like.splice(idx, 1)
  }
}

// const canCheckout = computed(() => {
//   return like.length > 0 && like.some(product => {
//     return !product.p_id.sell
//   })
// });

(async () => {
  try {
    const { data } = await apiAuth.get('/users/like')
    like.push(...data.result.filter(l => {
      return l.p_id
    }))
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
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 97%;
    width: 98%;
    overflow: auto;
    .top{
      max-width: 800px;
      height: 50px;
      line-height: 50px;
      margin-top: 50px;
      margin-bottom: 30px;
      .title{
        margin: 0;
        text-align: left;
        padding-left: 10px;
        margin-left: 20px;
        border-left: 5px solid rgb(225,85,25);
      }
    }
    table{
      border-collapse:collapse;
      max-width: 800px;
      th{
        background: rgb(225,85,25);
        height: 30px;
        color: white;
        padding: 0 10px;
        border-left: 1px solid white;
      }
      th:nth-child(4){
        text-align: center;
      }
      tr:nth-child(even){
        background-color:white;
      }
      .name{
        width: 35%;
        padding: 10px;
      }
      .time{
        width: 20%;
      }
      .btn{
        width: 15%;
        text-align: center;
        .q-btn{
          margin: 5px;
        }
      }
      .img{
        width: 30%;
        img{
          width: 100%;
          height: 100%;
        }
      }

    }
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
