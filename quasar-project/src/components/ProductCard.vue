<template>
      <q-card class="card-product">
        <div class="category">{{ category }}</div>
        <img :src="image">

        <!-- like -->
        <q-btn class="like" round  icon="favorite_border" @click="editLike({_id, quantity: 1})"/>

        <!-- 白區內容 -->
        <q-item class="contant">
          <!-- 頭 -->
          <q-item-section class="head" avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <!-- 文字 -->
          <q-item-section class="text">
            <q-item-label class="name">
              <router-link :to="'/products/' + _id">{{ name }}</router-link>
            </q-item-label>

            <q-item-label class="price">${{ price }}</q-item-label>

            <q-item-label style="height: 30px;" caption><p class="pre">{{ description }}</p></q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
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
.card-product{
  position: relative;
  width: 350px;
  .head{
    position: absolute;
    top: 5%;
    left: 3%;
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
    position: absolute;
    height: 100px;
    width: 70%;
    right: 5%;
    text-align: left;
  }
}
.pre{
  white-space: pre;
  height: 30px;
  overflow: hidden;
}
.category{
  background: rgb(15,85,165);
  color: white;
  position: absolute;
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

.contant{
  height: 100px;
}

</style>
