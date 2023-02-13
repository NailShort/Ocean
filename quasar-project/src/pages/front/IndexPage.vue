<template>
  <div id="index">
    <!-- top 按鈕 -->
    <q-btn class="top-btn" icon="assistant_navigation" label="TOP"  stack glossy color="primary" to="/"/>
    <!-- 輪播圖 ------------------------------------------------------------------->
    <div class="carousel">
      <q-carousel
      swipeable
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
    <div class="card row items-center justify-center wrap">
      <div class="text col-12">
        <h3>熱門文章</h3>
        <span>Hot Articles</span>
      </div>
      <!-- 卡片 -->
      <div class="sw col12" style="width: 70%; background: transparent;">
        <SwiperCard></SwiperCard>
      </div>

      <!-- <div class="col-12 row justify-center" >
      <div class="cards justify-center" style="width: 300px;" v-for="product in products" :key="product._id">
        <ProductCard v-bind="product" ></ProductCard>
      </div>
    </div> -->
      <!-- 文章按鈕 -->
      <div class="btn col-12 justify-center items-start">
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
      <!-- <div class="text">
        <h3>魚種圖鑑</h3>
        <span>Fish Data</span>
      </div> -->
      <!-- 內容 -->
      <div class="contant column items-center justify-center">
        <!-- 文字 -->
        <div class="left col">
          <p class="title">常見觀賞魚圖鑑</p>
          <p class="slogin">
            海水缸魚類新手入門指南<br>
            玩家參考寶典！</p>
          <p class="l-text">
            針對台灣原生與進口的觀賞海水魚，分享魚類分布海域、食性、成體大小等...<br>
            提供照片辨認，及魚友的分享。是鑑賞海水魚時的絕佳工具書。<br>
            不是喜歡就放，必須了解海水魚以挑選能和平相處的魚種，才能避免各種風險。
          </p>
          <q-btn class="btn" no-caps outline rounded color="primary" label="View More" icon-right="double_arrow" />
        </div>
        <!-- 圖片 -->
        <div class="right col-8 items-center justify-center">
          <FishSwiper></FishSwiper>
        </div>

      </div>
    </div>

    <!-- 視差、贊助 ----------------------------------------------------------->
    <div class="parallax row justify-between">
      <div class="sea"></div>
      <q-parallax src="../../../images/par-bg.jpg">
    </q-parallax>
    </div>
    <div class="par-white">
      <div class="news row justify-evenly">
        <NewsSwiper></NewsSwiper>
      </div>
      <div class="sponsor row warp justify-between">

        <div class="box col-12 col-sm-6 col-lg-3">
          <a href="https://www.ph84.idv.tw/forum/" target="_blank">
            <div class="img">
              <img src="../../../images/PH8.4.png" style="width: 100%; height: 100%;">
            </div>
          </a>
        </div>

        <div class="box col-12 col-sm-6 col-lg-3">
          <a href="https://redseafish.com/" target="_blank">
            <div class="img">
              <img src="../../../images/RedSea.png" style="width: 100%; height: 100%;">
            </div>
          </a>
        </div>

        <div class="box col-12 col-sm-6 col-lg-3">
          <a href="https://www.cmfish.com/index.php" target="_blank">
            <div class="img">
              <img src="../../../images/海友網.png" style="width: 100%; height: 100%;">
            </div>
          </a>
        </div>

        <div class="box col-12 col-sm-6 col-lg-3">
          <a href="https://www.hikari-tw.com/" target="_blank">
            <div class="img">
              <img src="../../../images/高夠力.png" style="width: 100%; height: 100%;">
            </div>
          </a>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { api } from 'app/plugins/axios'
import Swal from 'sweetalert2'
// import ProductCard from '../../components/ProductCard.vue'
import SwiperCard from '../../components/SwiperCard.vue'
import FishSwiper from '../../components/FishSwiper.vue'
import NewsSwiper from '../../components/NewsSwiper.vue'

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

.top-btn{
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 6000;
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
    width: 100%;
    margin: auto;
  }
  .sh{
    position: absolute;
    bottom: -5px;
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
  background: url(../../../images/文章bg-01.png)no-repeat center/cover;
  display: flex;
  position: relative;
  .text{
    text-align: center;
    color:rgb(75,175,195);
    h3{
      font-size: 40px;
      font-weight: 500;
      margin: 0;
    }
    span{
      font-size: 20px;
    }
  }
  .sw{
    height: 500px;
  }
  .btn{
    display: flex;
    margin-bottom: 100px;
    margin-top: 30px;
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
}

// 魚種圖鑑 --------------------------------------------------------------
.fish{
  background: url(../../../images/bg-1.jpg) no-repeat center/cover;
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  .text{
    padding-top: 100px;
    text-align: center;
    color:rgb(75,175,195);
    text-shadow: 0 0px 10px white;
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
    width: 100%;
    background: linear-gradient(rgb(124, 245, 252),rgba(255,255,255,0));
  }
  .wave{
    position: absolute;
    top: -50px;
    width: 100%;
    height: 50px;
    background: url(../../../images/wave.png) center repeat-x;
  }
  .contant{
    width: 80%;
    height: 100%;
    margin: auto;

    .left{
      // border: 1px solid white;
      margin-bottom: 80px;
      .title{
        color: rgb(15,85,165);
        font-size: 20px;
        border-left: 5px solid rgb(15,85,165);
        text-indent: 1rem;
      }
      .slogin{
        color: white;
        font-weight: 700;
        font-size: 30px;
        text-shadow: 0 5px 5px rgb(30,180,210);
      }
      .l-text{
        color: rgb(15,85,165);
        line-height: 1.5rem;
      }
    }
  }
}

// parallax 視差
.parallax{
  position: relative;
  .sea{
    position: absolute;
    z-index: 50;
    top: -100px;
    height: 200px;
    width: 100%;
    background: linear-gradient(rgba(255,255,255,0),rgb(20, 155, 195),rgba(255,255,255,0));
  }
}
.par-white{
  width: 100%;
  background: white;
  position: relative;
  .news{
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 500px;
  }
  .sponsor{
    padding: 300px 0 50px 0;
    margin: auto;
    width: 70%;
    .img{
      padding: 5px 10px 5px 10px;
      border-radius: 5px;
      img{
        box-shadow: 0 3px 5px rgba(0,0,0,0.3);
        border-radius: 5px;
      }
    }
  }
}

@media (min-width:600px) {
  .fish{
    .contant{
      .left{
        .slogin{
          font-size: 40px;
        }
      }
    }
  }
}

@media (min-width:819px) {
  .fish{
    .contant{
      .left{
        .title{
          font-size: 20px;
        }
        .slogin{
          font-size: 45px;
        }
      }
    }
  }
}

@media (min-width:1024px) {
.card{
  height: 100vh;
  .sw{
    height: 450px;
  }
  .btn{
    margin-top: 0;
  }
}
}

@media (min-width:1500px) {
.carousel{
  .q-carousel{
    width: 80%;
  }
}
.fish{
  height: 100vh;
  .contant{
    width: 65%;
    flex-direction: row;
    .left{
      .title{
        font-size: 30px;
      }
      .l-text{
        font-size: 20px;
        padding-right: 100px;
        line-height: 2rem;
      }
    }
  }
}
}

</style>
