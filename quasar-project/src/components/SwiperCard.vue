<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="10"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="product in products" :key="product._id">
        <ProductCard v-bind="product"></ProductCard>
    </swiper-slide>
  </swiper>
</template>

<!-- script -->
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-cards'

// import required modules
import { Pagination } from 'swiper'

import ProductCard from './ProductCard.vue'
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import Swal from 'sweetalert2'

const products = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/products')
    products.push(...data.result)
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
    ProductCard
  },
  setup () {
    return {
      modules: [Pagination],
      products
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: transparent;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
