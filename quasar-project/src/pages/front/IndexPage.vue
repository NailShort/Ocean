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
    <div class="card column items-center">
      <div class="text">
        <h3>熱門文章</h3>
        <span>hot articles</span>
      </div>
      <!-- 卡片 -->
      <div class="cards q-pa-md row items-center justify-center q-gutter-md">
        <q-card class="my-card col-10 col-sm-5 col-lg-5">
          <img src="../../../images/fish1.jpg">
          <q-item>
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card col-10 col-sm-5 col-lg-5">
          <img src="../../../images/fish2.jpg">
          <q-item>
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card col-10 col-sm-5 col-lg-5">
          <img src="../../../images/fish3.jpg">
          <q-item>
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card col-10 col-sm-5 col-lg-5">
          <img src="../../../images/fish3.jpg">
          <q-item>
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-card>
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
        <h1>魚種圖鑑</h1>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

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
