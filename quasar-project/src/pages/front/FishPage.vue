<template>
  <!-- 魚種圖鑑頁 -->
  <div id="fish">
    <div class="bg"></div>
    <div class="contant row wrap items-center justify-center">
      <div class="col-12">
        <p>魚種圖鑑</p>
      </div>
      <!-- 路徑 -->
      <div class="route col-12 row items-center justify-start">
        <q-btn to="/" flat style="color: black" label="首頁" />
        <span>></span>
        <q-btn flat :disable="!progress" style="color: gray" label="魚種圖鑑" />
      </div>
      <!-- 分類 -->
      <!--  ['小丑魚', '雀鯛', '倒吊', '小型神仙', '大型神仙', '蝶魚', '砲彈', '箱魨', '魨魚', '青蛙', '隆頭魚', '草莓魚', '海金魚', '蝦虎', '䲁魚' , '海馬', '鯊魚', ] -->
      <div class="book row items-center justify-center">
        <!-- 小丑 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <router-link to="/clownfish"><div  class="card clown"></div></router-link>
        <q-btn to="/clownfish" flat style="color: black" label="小丑魚" />
      </div>
      <!-- 雀鯛 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish1"></div>
        <q-btn to="/tangfish" flat style="color: black" label="雀鯛" />
      </div>
      <!-- 倒吊 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish2"></div>
        <q-btn to="/tangfish" flat style="color: black" label="倒吊" />
      </div>
      <!-- 小神 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish3"></div>
        <q-btn to="/" flat style="color: black" label="小型神仙" />
      </div>
      <!-- 大神 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish4"></div>
        <q-btn to="/" flat style="color: black" label="大型神仙" />
      </div>
      <!-- 鰈魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish5"></div>
        <q-btn to="/" flat style="color: black" label="蝶魚" />
      </div>
      <!-- 砲彈 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish6"></div>
        <q-btn to="/" flat style="color: black" label="砲彈" />
      </div>
      <!-- 箱魨 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish3"></div>
        <q-btn to="/" flat style="color: black" label="箱魨" />
      </div>
      <!-- 魨魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div  class="card clown"></div>
        <q-btn to="/" flat style="color: black" label="魨魚" />
      </div>
      <!-- 青蛙 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish1"></div>
        <q-btn to="/" flat style="color: black" label="青蛙" />
      </div>
      <!-- 隆頭魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish2"></div>
        <q-btn to="/" flat style="color: black" label="隆頭魚" />
      </div>
      <!-- 草莓魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish3"></div>
        <q-btn to="/" flat style="color: black" label="草莓魚" />
      </div>
      <!-- 海金魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div  class="card clown"></div>
        <q-btn to="/" flat style="color: black" label="海金魚" />
      </div>
      <!-- 蝦虎 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish1"></div>
        <q-btn to="/" flat style="color: black" label="蝦虎" />
      </div>
      <!-- 䲁魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish2"></div>
        <q-btn to="/" flat style="color: black" label="䲁魚" />
      </div>
      <!-- 海馬 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish3"></div>
        <q-btn to="/" flat style="color: black" label="海馬" />
      </div>
      <!-- 鯊魚 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="">
        <div class="card fish3"></div>
        <q-btn to="/" flat style="color: black" label="鯊魚" />
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#fish{
  position: relative;
  .bg{
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 50%;
    background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,1)),url(../../images/latests-bg.png)no-repeat center/cover;
    background: white;
  }
  .contant{
    width: 80%;
    margin: auto;
    padding: 150px 30px;
    max-width: 1024px;
    .book{
      padding-top: 50px;
      width: 100%;
      text-align: center;
      .card{
      width: 230px;
      height: 230px;
      border-radius: 50%;
      margin: auto;
      }
      .q-btn{
        margin-bottom: 20px;
      }
      .clown{
          background: url(../../../images/fishbook/小丑.png) no-repeat center/cover;
      }
      .fish1{
        background: url(../../../images/fishbook/雀鯛.png) no-repeat center/cover;
      }
      .fish2{
        background: url(../../../images/fishbook/倒吊.png) no-repeat center/cover;
      }
      .fish3{
        background: url(../../../images/fishbook/小神.png) no-repeat center/cover;
      }
      .fish4{
        background: url(../../../images/fishbook/大神.png) no-repeat center/cover;
      }
      .fish5{
        background: url(../../../images/fishbook/鰈魚.png) no-repeat center/cover;
      }
      .fish6{
        background: url(../../../images/fishbook/砲彈.png) no-repeat center/cover;
      }
      .fish7{
        background: url(../../../images/fishbook/cf.png) no-repeat center/cover;
      }
    }
  }
}
</style>
