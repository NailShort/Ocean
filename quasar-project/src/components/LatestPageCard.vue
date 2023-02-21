<template>
  <!-- 最新消息頁-卡片 -->
<div class="card row" :to="'/latest/' + _id">
  <!-- 圖片 -->
  <div class="img col-12 col-sm-5 row justify-center items-center">
    <div class="bg"></div>
    <router-link :to="'/latest/' + _id">
      <img :src="image">
    </router-link>
  </div>
  <!-- 文字 -->
  <div class="text col-12 col-sm-7">
    <p class="time">{{ time }}</p>
    <router-link class="name" :to="'/latest/' + _id">
      <p class="p-name">{{ name }}</p>
    </router-link>
    <p class="des">{{ description }}</p>
  </div>

</div>

</template>

<script setup>

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
  time: {
    type: String,
    default: ''
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
  }
})

</script>

<style lang="scss" scoped>
  .card{
    border: 1px solid rgba(0,0,0,0.1);
    padding: 10px;
    position: relative;
    width: 100%;
    .img{
      position: relative;
      height: 200px;
      display: table-cell;
      vertical-align: middle;
      position: relative;
      .bg{
        position: absolute;
        z-index: -5;
        width: 100%;
        height: 100%;
        background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,1)),url(../../images/latests-bg.png)no-repeat center/cover;
      }
      img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .text{
      padding: 10px;
      .time{
        margin: 0;
        color: rgba(100,100,100,0.5);
        font-weight: 700;
      }
      .category{
        padding-left: 5px;
        margin: 0;
        color: rgb(15,85,165);
        border-left: 2px solid rgb(15,85,165);
      }
      .name{
        color: black;
        text-decoration: none;
        .p-name{
          font-size: 20px;
          padding: 5px 0;
          margin: 0 0 5px 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .des{
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: gray;
      }
    }
    .like{
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }

  @media (min-width:600px) {
    .card{
      .img{
        height: 200px;
      }
      .text{
        .des{
        -webkit-line-clamp: 4;
      }
      }
    }
  }
</style>
