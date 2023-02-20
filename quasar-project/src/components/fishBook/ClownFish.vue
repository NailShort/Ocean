<template>
  <q-card class="my-card">
    <div class="img">
      <router-link :to="'/fish/' + _id">
      <img :src="image"/>
    </router-link>
      <div class="text absolute-bottom text-subtitle2 text-center">
        <router-link :to="'/fish/' + _id">
          <p class="name">{{ name }}<br><span class="egname">{{ egname }}</span></p>
        </router-link>
    </div>
    </div>

</q-card>
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
  egname: {
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

</script>

<style lang="scss" scoped>
.my-card{
  box-shadow: none;
  margin: 5px;
  padding-bottom: 100px;
  .img{
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: black;
    img{
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
      border-radius: 50%;
      box-shadow: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .text{
      position: absolute;
      height: 50px;
      bottom: -60px;
      font-size: 20px;
      a{
        text-decoration: none;
      }
      .name{
        color: black;
      }
      .egname{
        text-decoration: none;
        font-size: 10px;
        color: black;
        line-height: 1;
      }
    }
  }
}

@media (min-width:600px) {
}

@media (min-width:1500px) {
}
</style>
