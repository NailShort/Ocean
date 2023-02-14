<template>

<div class="card" :to="'/products/' + _id">
  <!-- 分類 -->
  <div class="category">{{ category }}</div>
  <!-- 圖片 -->
  <div class="img">
    <router-link :to="'/products/' + _id">
      <img :src="image">
    </router-link>
  </div>
  <!-- 文字 -->
  <div class="text">
    <router-link class="name" :to="'/products/' + _id">{{ name }}</router-link>
    <span class="des">{{ description }}</span>
  </div>
  <!-- like -->
  <q-btn class="like" round  icon="favorite_border" @click="editLike({_id, quantity: 1})"/>

</div>

</template>

<script setup>
import { useUserStore } from 'src/stores/user'

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

const user = useUserStore()
const { editLike } = user
</script>

<style lang="scss" scoped>
  .card{
    position: relative;
    .category{
      position: absolute;
      top: 15px;
      left: 15px;
      width: 70px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      background: white;
      border-radius:20px;

    }
    .img{
      width:400px;
      height:250px;
      display: table-cell;
      vertical-align: middle;
      background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,1)), url(../../images/footer.jpg)no-repeat center/cover;
      border-radius: 20px;
      img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }
    .text{
        position: absolute;
        bottom: 0;
        height: 80px;
        width: 100%;
        border-radius: 0 0 20px 20px;
        padding: 5px 20px;
        background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
        color: white;
        .name{
          color: white;
          text-decoration: none;
          font-size: 20px;
          display: block;
        }
        .des{
          display: block;
          overflow: hidden;
          height: 40px;
          width: 100%;
          font-size: 10px;
          color: lightgray;
        }
    }
    .like{
      position: absolute;
      top: 15px;
      right: 15px;
      color: white;
    }
  }
</style>
