<template>
      <q-card class="my-card">
        <div class="img">
          <router-link :to="'/fish/' + _id">
            <img :src="image"/>
          </router-link>
          <div class="text absolute-bottom text-subtitle2 text-center">
            <router-link :to="'/fish/' + _id">
              <p>{{ name }} <span style="font-size: 10px; color: lightyellow;">{{ egname }}</span></p>
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
  .img{
    position: relative;
    width: 230px;
    height: 230px;
    border-radius: 20px;
    background: black;
    a{
      border-radius: 20px;
    }
    img{
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
      border-radius: 15px;
      box-shadow: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .text{
      position: absolute;
      height: 50px;
      bottom: 5px;
      background: rgba(0,0,0,0.5);
      border-radius: 0 0 15px 15px;
      line-height: 50px;
      font-size: 20px;
      p{
        color: white;
      }
      a{
        text-decoration: none;
      }
    }
  }

  @media (min-width:600px) {
    .img{
    width: 280px;
    height: 280px;
    border-radius: 20px;
    .text{
      bottom: 0px;
    }
  }
  }

  @media (min-width:1500px) {
    .img{
    width: 380px;
    height: 380px;
    border-radius: 20px;
    .text{
      bottom: 0px;
    }
  }
  }
</style>
