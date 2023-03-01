<template>
  <!-- 首頁-文章卡片 -->
      <q-card class="card-product">
        <div class="category">{{ category }}</div>

        <div class="img">
          <img :src="image">
        </div>

        <!-- like -->
        <q-btn class="like" round  icon="favorite_border" @click="editLike({_id, quantity: 1})"/>

        <!-- 白區內容 -->
        <q-item class="contant wrap row items-start justify-center">
          <!-- 頭 -->
          <q-item-section class="head col-2" avatar>
            <q-avatar>
              <img v-if="userid" :src="userid.image || `https://source.boringavatars.com/beam/256/${userid.name}?colors=000000,F0A818,304878,181848,F0A818`">
            </q-avatar>
          </q-item-section>

          <!-- 文字 -->
          <q-item-section class="text col-10">
            <q-item-label>
              <router-link class="name" :to="'/products/' + _id">
                {{ name }}
              </router-link>
            </q-item-label>
            <q-item-label class="time col-12">{{ time }}</q-item-label>
          </q-item-section>

          <q-item-label class="dess" caption>
            <p class="des">{{ description }}</p>
          </q-item-label>
        </q-item>
      </q-card>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const user = useUserStore()
// const { avatar } = storeToRefs(user)

defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: ''
  },
  userid: {
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
  },
  category: {
    type: String,
    default: ''
  }
})

const { editLike } = user
</script>

<style lang="scss" scoped>
.card-product{
  position: relative;
  width: 350px;
  height: 90%;
  margin: 10px 0;
  .img{
    width: 100%;
    height: 200px;
    background:linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0)),url(../../images/latests-bg.png)no-repeat center/cover;
    background: #000;
    position: relative;
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

  .category{
    background: rgb(15,85,165);
    color: white;
    position: absolute;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    z-index: 1;
  }
  .contant{
    position: relative;
    height: 100px;
  }
  .head{
    justify-content: start;
    align-items: center;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .like{
    position: absolute;
    top: 3%;
    right: 3%;
    background:rgb(225,85,25);
    color: white;
    width: 10px;
  }
  .text{
    text-align: left;
    .name{
      text-decoration: none;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .time{
      font-size: 14px;
      color: rgba(100,100,100,0.5);
    }
  }
  .dess{
    position: absolute;
    top: 60px;
    margin: 0 20px;
    text-align: left;
    border-top: 1px solid rgba(100,100,100,0.2);
    .des{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0;
      padding-top: 7px;
    }
  }
}

@media (min-width:1024px) {
  .card-product{
    .img{
      height: 250px;
    }
    .dess{
      .des{
        -webkit-line-clamp: 5;
      }
    }
    }
  }

</style>
