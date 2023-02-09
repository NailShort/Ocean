<template>
  <div id="index">
    <div class="carousel">
      <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="../../../images/fish1.jpg" />
      <q-carousel-slide :name="2" img-src="../../../images/fish2.jpg" />
      <q-carousel-slide :name="3" img-src="../../../images/fish3.jpg" />
    </q-carousel>
    <div class="sh"></div>
    <div class="wave"></div>
    </div>

    <!-- 熱門文章 -------------------------------------------------------------->
    <div class="card column items-center justify-center">
      <div class="text">
        <h3>熱門文章</h3>
        <span>Hot Articles</span>
      </div>
      <!-- 卡片 -->
      <div class="row justify-center" >
      <div class="cards justify-center" style="width: 300px;" v-for="product in products" :key="product._id">
        <ProductCard v-bind="product" ></ProductCard>
      </div>
    </div>
      <!-- 文章按鈕 -------------------------------------------------------------->
      <div class="btn">
        <div class="box1">
          <a href="#">海水魚類</a>
        </div>
        <div class="box1">
          <a href="#">珊瑚軟體</a>
        </div>
        <div class="box1">
          <a href="#">硬體設備</a>
        </div>
        <div class="box1">
          <a href="#">二手分享</a>
        </div>
      </div>
    </div>

    <!-- 魚種圖鑑 ------------------------------------------------------------->
    <div class="fish">
      <div class="sea"></div>
      <div class="wave"></div>
      <div class="text">
        <h3>魚種圖鑑</h3>
        <span>Fish Data</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { api } from 'app/plugins/axios'
import Swal from 'sweetalert2'
import ProductCard from '../../components/ProductCard.vue'

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

const slide = ref(1)
// const slide02 = ref(1)
const autoplay = ref(true)

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
*{
  font-family: 'Noto Sans TC', sans-serif;
}

#index{
  height: auto;
  padding-top: 0px;
  position: relative;
}
// 輪播圖 -------------------------------------------------------------
.carousel{
  display: flex;
  height: auto;
  background: linear-gradient(rgba(30,180,210,1),rgba(15,85,165,1));
  position: relative;
  .q-carousel{
    height: 100vh;
    width: 1500px;
    margin: auto;
  }
  .sh{
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 200px;
    background: linear-gradient(rgba(30,180,210,0),rgba(15,85,165,0.9),rgba(255,255,255,1));
  }
  .wave{
    width: 100%;
    height: 100px;
    background: url(https://sunshinecity.jp/themes/aquarium@sunshine/resource/common/images/bg/bg_contents_cmn_pc_01.png) center repeat-x;
    position: absolute;
    bottom: -10px;
  }
}

// 熱門文章 --------------------------------------------------------------
.card{
  width: 100%;
  background: white;
  display: flex;
  position: relative;
  .text{
    text-align: center;
    h3{
      font-size: 40px;
      font-weight: 500;
      margin: 0;
    }
    span{
      font-size: 20px;
    }
  }
  .btn{
    display: flex;
    margin-bottom: 100px;
  }
  .box1{
    width: 100px;
    height: 50px;
    border: 1px solid rgba(15,85,165,1);
    background: white;
    border-radius: 30px;
    line-height: 50px;
    text-align: center;
    margin: 0 10px 0 10px;
  }
  a{
    text-decoration: none;
    color: rgb(15,85,165);
    display: block;
    border-radius: 30px;
    font-size: 14px;
    letter-spacing:1px;
    &:hover{
      background: rgb(15,85,165);
      color: white;
    }
  }
  .cards{
    width: 80%;
    margin: 5px 0 20px 0;
    .q-card{
      margin: 10px;
    }
  }
}

// 魚種圖鑑 --------------------------------------------------------------
.fish{
  background: url(../../../images/bg-1.jpg) no-repeat center/cover;
  height: 100vh;
  position: relative;
  .text{
    padding-top: 100px;
    text-align: center;
    h3{
      font-size: 40px;
      font-weight: 500;
      margin: 0;
    }
    span{
      font-size: 20px;
    }
  }
  .sea{
    position: absolute;
    top: -5px;
    height: 100px;
    width: 100vw;
    background: linear-gradient(rgb(124, 245, 252),rgba(255,255,255,0));

  }
  .wave{
    position: absolute;
    top: -50px;
    width: 100vw;
    height: 50px;
    background: url(../../../images/wave.png) center repeat-x;
  }
}

@media (min-width:600px) {
.card{
  .cards{
    .q-card{
      margin: 12px;
    }
  }
}
}

@media (min-width:1024px) {
.card{
  .cards{
    .q-card{
      margin: 20px;
    }
  }
}
}

</style>
