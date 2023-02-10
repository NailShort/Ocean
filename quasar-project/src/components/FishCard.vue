<template>
      <q-card class="my-card">
        <div class="img">
          <img :src="image"/>
          <div class="text absolute-bottom text-subtitle2 text-center">
          <p>{{ name }} <span style="font-size: 10px; color: lightyellow;">{{ egname }}</span></p>

          <p></p>
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
    border-radius: 15px;
    img{
      width: 230px;
      height: 230px;
      border-radius: 15px;
      box-shadow: none;
    }
    .text{
      position: absolute;
      height: 50px;
      bottom: 5px;
      background: rgba(0,0,0,0.5);
      border-radius: 0 0 15px 15px;
      line-height: 50px;
      font-size: 20px;
    }
  }

  @media (min-width:600px) {
    .img{
    width: 280px;
    height: 280px;
    border-radius: 20px;
    img{
      width: 280px;
      height: 280px;
      border-radius: 20px;
    }
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
    img{
      width: 380px;
      height: 380px;
      border-radius: 20px;
    }
    .text{
      bottom: 0px;
    }
  }
  }
</style>
