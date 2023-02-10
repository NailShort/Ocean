<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="mySwiper"
  >

    <swiper-slide v-for="fish in fishs" :key="fish._id">
        <FishCard v-bind="fish"></FishCard>
    </swiper-slide>

  </swiper>

</template>

<!-- script -->
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper'

import FishCard from './FishCard.vue'
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import Swal from 'sweetalert2'

const fishs = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/fishs')
    fishs.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

export default {
  components: {
    Swiper,
    SwiperSlide,
    FishCard
  },
  setup () {
    return {
      modules: [EffectCards],
      fishs
    }
  }
}
</script>

<style lang="scss" scoped>
#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

body {
  background: #fff;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

html,
body {
  position: relative;
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper {
  width: 250px;
  height: 250px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.swiper-slide{
  background: white;
}

// .swiper-slide:nth-child(1n) {
//   background-color: rgb(206, 17, 17);
// }

// .swiper-slide:nth-child(2n) {
//   background-color: rgb(0, 140, 255);
// }

// .swiper-slide:nth-child(3n) {
//   background-color: rgb(10, 184, 111);
// }

// .swiper-slide:nth-child(4n) {
//   background-color: rgb(211, 122, 7);
// }

// .swiper-slide:nth-child(5n) {
//   background-color: rgb(118, 163, 12);
// }

// .swiper-slide:nth-child(6n) {
//   background-color: rgb(180, 10, 47);
// }

// .swiper-slide:nth-child(7n) {
//   background-color: rgb(35, 99, 19);
// }

// .swiper-slide:nth-child(8n) {
//   background-color: rgb(0, 68, 255);
// }

// .swiper-slide:nth-child(9n) {
//   background-color: rgb(218, 12, 218);
// }

// .swiper-slide:nth-child(10n) {
//   background-color: rgb(54, 94, 77);
// }

@media (min-width:600px) {
  .swiper {
  width: 300px;
  height: 300px;
}
}

@media (min-width:1500px) {
  .swiper {
  width: 400px;
  height: 400px;
}
}

</style>
