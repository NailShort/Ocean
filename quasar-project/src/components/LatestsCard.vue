<template>
    <q-card class="my-card">
      <div class="img">
        <img :src="image">
      </div>
      <div class="contant">
        <div class="line"></div>
      <div class="text">
        <q-card-section>
          <router-link :to="'/latest/' + _id">
          <div class="text-h6 title">{{ name }}</div>
        </router-link>
          <div class="text-subtitle2 time">{{ time }}</div>
        </q-card-section>
        <div class="des">
          <q-card-section class="q-pt-none">
            {{ description }}
          </q-card-section>
        </div>
      </div>
      <div class="btn flex justify-center items-center" >
        <q-btn
          v-for="size in sizes" :key="`btn_size_rd_${size}`"
          :to="'/latest/' + _id"
          outline
          rounded
          color="primary"
          :size="size"
          label="View Moore"
        />
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

const sizes = ['xs']

</script>

<style lang="scss" scoped>

.q-card{
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  .contant{
    padding: 5px;
    position: relative;
    .line{
      width: 50px;
      height: 2px;
      background: rgba(225,85,25,0.5);
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .img{
    width: 250px;
    height: 150px;
    display: table-cell;
    vertical-align: middle;
    background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,1)),url(../../images/latests-bg.png)no-repeat center/cover;
    img{
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
    }
  }
  .text{
    text-align: center;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    .title{
      font-weight: 600;
      font-size: 25px;
      color: black;
    }
    a{
      text-decoration: none;
    }
    .time{
      font-size: 12px;
      color: gray;
    }
    .des{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .btn{
    height: 50px;

  }
}

@media (min-width:819px) {
    .q-card{
      box-shadow: 0 1px 10px rgb(0 0 0 / 20%), 0 2px 15px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
      .img{
        width: 300px;
        height: 200px;
      }
      .text{
        height: 150px;
      }
      .btn{
        height: 50px;
      }
    }
  }
  @media (min-width:1024px) {
    .q-card{
      box-shadow: 0 1px 20px rgb(0 0 0 / 20%), 0 2px 25px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
      .img{
        width: 350px;
        height: 250px;
      }
      .text{
        height: 150px;
      }
      .btn{
        height: 50px;
      }
    }
  }
</style>
