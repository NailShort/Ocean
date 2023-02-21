<template>
  <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide v-for="latest in latests" :key="latest._id">
        <LatestCard v-bind="latest"></LatestCard>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import LatestCard from './LatestsCard.vue'
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import Swal from 'sweetalert2'
import { EffectCoverflow, Pagination } from 'swiper'

const latests = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/latests')
    latests.push(...data.result)
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
    LatestCard
  },
  setup () {
    return {
      modules: [EffectCoverflow, Pagination],
      latests
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

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 250px;
  height: 360px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

@media (min-width:819px) {
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 410px;
  }
}
@media (min-width:1024px) {
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    height: 460px;
  }
}

</style>
