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
    <div class="text">
      <h1>OCEAN</h1>
      <p>coral reef fish</p>
    </div>
    <div class="btn">
      <q-btn style="background: white; color: rgb(15,85,165)" label="文章討論" />
      <q-btn outline style="color: white;" label="魚種圖鑑" />
    </div>
    </div>

    <!-- 熱門文章 -------------------------------------------------------------->
    <div class="card row items-center justify-center wrap">
      <div class="text col-12">
        <h3>熱門文章</h3>
        <span>Hot Articles</span>
      </div>

      <!-- 文章按鈕 -->
        <div class="btn col-12 justify-center items-center">
          <q-btn class="col-12" v-for="fish,index in articleCategory" outline rounded color="primary" :key="index" :label="fish" @click="fishActive=fish" />
        </div>

      <!-- 卡片 -->
      <div class="sw col12" style="width: 70%; background: transparent;">
        <SwiperCard :fishActive="fishActive"></SwiperCard>
      </div>

    </div>

      <!-- <div class="col-12 row justify-center" >
      <div class="cards justify-center" style="width: 300px;" v-for="product in products" :key="product._id">
        <ProductCard v-bind="product" ></ProductCard>
      </div>
    </div> -->

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
          <q-btn class="btn" no-caps outline rounded color="white" label="View More" icon-right="double_arrow" />
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
      <q-parallax src="../../../images/par-bg.jpg" style="height: 600px;">
        <div class="text col-12">
        <h3>最新消息</h3>
        <span>Latest News</span>
      </div>
    </q-parallax>
    </div>
    <div class="par-white">
      <div class="news row justify-evenly">
        <LatestsSwiper></LatestsSwiper>
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
import { ref } from 'vue'
// import ProductCard from '../../components/ProductCard.vue'
import SwiperCard from '../../components/SwiperCard.vue'
import FishSwiper from '../../components/FishSwiper.vue'
import LatestsSwiper from '../../components/LatestsSwiper.vue'

const slide = ref(1)
// const slide02 = ref(1)
const autoplay = ref(true)

// Btn - 分類陣列
const articleCategory = ['所有文章', '海水魚類', '珊瑚軟體', '硬體設備', '二手分享']

const fishActive = ref(articleCategory[0])

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
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
    height: 80vh;
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
  .text{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'Noto Sans TC', sans-serif;
    text-align: center;
    line-height: 0px;
    // border: 1px solid white;
    h1{
      font-size: 15vw;
      font-weight: 900;
      color: white;
      margin: 0;
      text-shadow: 0 0 30px rgba(15,85,165,0.9);
    }
    p{
      font-size: 7vw;
      font-weight: 900;
      color: transparent;
      margin: 0;
      color: transparent;
      -webkit-text-stroke: 0.5px #fff;
      text-shadow: 0 0 15px rgba(15,85,165,0.9);
    }
  }
  .btn{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-align: center;
    q-btn{
      display: flex;
    }
    button{
      margin: 10px;
      box-shadow: 0 0 15px rgba(15,85,165,0.9);
    }
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
    margin-top: 20px;
    margin-bottom: 100px;
    .swiper-pagination {
        top: 10px;
    }
  }
  .btn{
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
    margin-top: 10px;
    .q-btn{
      margin: 3px;
      padding: 5px;
    }
  }
}

// 魚種圖鑑 --------------------------------------------------------------
.fish{
  background: url(../../../images/bg-1.jpg) no-repeat center/cover;
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
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
        // color: rgba(255,255,255,0.);
        line-height: 1.5rem;
      }
    }
  }
}

// parallax 視差
.parallax{
  position: relative;
  .text{
    background:linear-gradient(rgb(15,85,165)30%,rgba(255,255,255,0)60%);
    padding: 100px 20px 0 20px;
    text-shadow: 0px 5px 5px rgba(0,0,0,0.9),0 0 10px rgba(15,85,165,0.9);
    text-align: center;
    color:white;
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
    z-index: 50;
    top: -75px;
    height: 150px;
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
    top: -400px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 500px;
  }
  .sponsor{
    padding: 200px 0 50px 0;
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
  .carousel{
    .q-carousel{
      height: 80vh;
    }
    .text{
      top: 30%;
      left: 50%;
      line-height: 50px;
    }
    .btn{
      top: 42%;
    }
  }
  .card{
    .btn{
      .q-btn{
        margin: 0 5px;
        padding: 5px 10px;
      }
    }
    .sw{
      margin-top: 30px;
      margin-bottom: 130px;
    }
  }

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
  .carousel{
    .q-carousel{
      height: 100vh;
    }
    .text{
      top: 50%;
      left: 50%;
      line-height: 100px;
    }
    .btn{
      top: 65%;
    }
  }

  .card{
    .btn{
      .q-btn{
        margin: 0 10px;
        padding: 8px 16px;
      }
    }
    .sw{
      margin-top: 40px;
      margin-bottom: 150px;
    }
  }
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
  .carousel{
    .text{
      top: 60%;
      left: 35%;
      text-align: left;
      line-height: 150px;
      h1{
        font-size: 160px;
      }
      p{
        font-size: 70px;
        text-indent: 1rem;
      }
    }
    .btn{
      text-align: left;
      width: 500px;
      left: 34%;
      top: 73%;
    }
  }
.card{
  .sw{
    height: 450px;
    margin-top: 50px;
    margin-bottom: 200px;
  }
  .btn{
    margin-top: 30px ;
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
