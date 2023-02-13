<template>
  <q-layout view="hhh lpR fff">

    <q-header class="" height-hint="98">
      <q-toolbar>
        <q-btn class="menu" dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <a href="#">
            <q-avatar>
              <img src="https://cdn-icons-png.flaticon.com/128/3313/3313341.png">
            </q-avatar>
          <span>Ocean</span>
          </a>
        <!-- 登入按鈕 -->
        <div class="login">
            <q-btn-group push>
            <q-btn v-if="!isLogin" push label="會員登入" icon="login" to="/login" />
            <q-btn v-if="!isLogin" push label="註冊會員" icon="how_to_reg" to="/register" />
            <q-btn v-if="isLogin" push label="會員專區" icon="account_circle" to="/member">
              <q-badge color="secondary" floating >{{ like }}0</q-badge>
            </q-btn>

            <q-btn :content="cart" push label="訂單" icon="mail"  />
            <q-btn v-if="isLogin && isAdmin" push label="管理" icon="settings" to="/admin" />
            <q-btn v-if="isLogin" push label="登出" icon="logout"  @click="logout" />
            </q-btn-group>
        </div>

            <!-- 會員按鈕 -->
        <div class="member">
          <q-fab
            v-model="fab1"
            label="Actions"
            label-position="top"
            external-label
            icon="keyboard_arrow_left"
            direction="left"
            padding="xs"
          >
          <q-fab-action v-if="!isLogin" icon="how_to_reg" label="註冊帳號" to="/register"  />
          <q-fab-action v-if="!isLogin" icon="login" label="會員登入" to="/login" />
          <q-fab-action v-if="isLogin" icon="logout" @click="logout" />
          <q-fab-action icon="mail" label="" />
          <q-btn v-if="isLogin" round icon="account_circle" label="" to="/member" >
            <q-badge color="secondary" floating>{{ like }}0</q-badge>
          </q-btn>
          <q-fab-action v-if="isLogin && isAdmin"   icon="settings" label="" to="/admin" />

          </q-fab>
        </div>

        </q-toolbar-title>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="首頁" />
        <q-route-tab to="/article" label="文章討論" />
        <q-route-tab to="/" label="魚種圖鑑" />
        <q-route-tab to="/" label="最新消息" />
        <q-route-tab to="/" label="聯絡我們" />
      </q-tabs>
    </q-header>

    <!-- 側邊欄 -------------------------------------------->
    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-list bordered class="rounded-borders">

        <div class="btn">
          <a href="#">
            <div class="icon"></div>
            <div class="text">首頁</div>
          </a>
        </div>

        <q-expansion-item default-opened :content-inset-level="0.5" expand-separator icon="schedule" label="文章討論">
          <q-card>
            <q-card-section>
              <a href="#">海水魚類</a>
            </q-card-section>
            <q-card-section>
              <a href="#">珊瑚軟體</a>
            </q-card-section>
            <q-card-section>
              <a href="#">硬體設備</a>
            </q-card-section>
            <q-card-section>
              <a href="#">二手分享</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item default-opened :content-inset-level="0.5" expand-separator icon="schedule" label="魚種圖鑑">
          <q-card>
            <q-card-section>
              <a href="#">小丑類</a>
            </q-card-section>
            <q-card-section>
              <a href="#">神仙類</a>
            </q-card-section>
            <q-card-section>
              <a href="#">倒吊類</a>
            </q-card-section>
            <q-card-section>
              <a href="#">砲彈類</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <div class="btn">
          <a href="#">
            <div class="icon"></div>
            <div class="text">最新消息</div>
          </a>
        </div>

        <div class="btn">
          <a href="#">
            <div class="icon"></div>
            <div class="text">聯絡我們</div>
          </a>
        </div>

    </q-list>
    </q-drawer>

    <q-page-container style="padding-top: 0px;padding-bottom: 0px;">
      <router-view />
    </q-page-container>

    <q-footer class="text-white row warp">
      <div class="left row col-12 col-sm-9 flex flex-center">
        <div class="map left-box col-12 col-sm-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7394503702526!2d121.41731178916736!3d25.04291476457007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bec9ad74b1%3A0xa639904a89f26435!2z5Yue5YuV6YOo5Yue5YuV5Yqb55m85bGV572y5YyX5Z-65a6c6Iqx6YeR6aas5YiG572y5rOw5bGx6IG35qWt6KiT57e05aC0!5e0!3m2!1szh-TW!2stw!4v1676271720534!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="left-box col-12 col-sm-6">
          <ul class="row warp">
            <li class="col-3 col-sm-12 col-md-6 col-lg-3 q-pb-md"><a href="">文章討論</a></li>
            <li class="col-3 col-sm-12 col-md-6 col-lg-3 q-pb-md"><a href="">魚種圖鑑</a></li>
            <li class="col-3 col-sm-12 col-md-6 col-lg-3 q-pb-md"><a href="">最新消息</a></li>
            <li class="col-3 col-sm-12 col-md-6 col-lg-3 q-pb-md"><a href="">聯絡我們</a></li>
          </ul>
        </div>
      </div>

      <div class="right col-12 col-sm-3 flex flex-center">
        <div class="line"></div>
        <div class="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/3313/3313341.png">
          <span>Ocean</span>
        </div>
      </div>

    </q-footer>

  </q-layout>
</template>

<!-- script ------------------------------------------------------------->

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const { isLogin, isAdmin, like } = storeToRefs(user)
const { logout } = user

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const fab1 = ref(false)

</script>

<!-- style -------------------------------------------------------------->
<style lang="scss" scoped>
.q-header{
    background: linear-gradient(rgba(30,180,210,1)50%,rgba(30,180,210,0));
    height: 100px;
    // display: none;
}
.q-header .q-toolbar__title{
  position: relative;
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
  a{
    color: white;
    text-decoration: none;
  }
  .login{
    width: 421px;
    display: none;
    position: absolute;
    right: 210px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    a{
      text-align: center;
    }
  }
  .member{
    position: absolute;
    top: 0;
    right:3% ;
  }
}

.q-header .q-toolbar{
  background:rgb(30,180,210);
}

.q-header .q-toolbar a{
  color: rgb(30,180,210);
}

.q-header .q-toolbar span{
  color: white;
  padding-left: 10px;
}

.q-header .q-tabs{
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  display: none;
}

.q-header .q-btn{
  background: white;
  color: rgb(30,180,210);
}
// 側邊欄 ---------------------------------------------------------
.btn {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 48px;
  a{
    height: 48px;
    display: block;
    text-decoration: none;
    background: white;
    transition: 0.5s;

    &:hover{
      background: rgb(230, 230, 230);
    }
    .icon{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: red;
      position: absolute;
      top: 50%;
      left: 4%;
      transform: translateY(-50%);
    }
    .text{
      position: absolute;
      top: 50%;
      left: 24%;
      transform: translateY(-50%);
      color: black;
    }
  }
}
.q-card{
  .q-card__section{
    padding: 0;
  }
  a{
    height: 48px;
    display: block;
    transition: 0.5s;
    text-decoration: none;
    color: black;
    line-height: 48px;
    &:hover{
      background: linear-gradient(270deg,rgb(230,230,230),rgb(255,255,255));
    }
  }
}

// footer --------------------------------------------------------
.q-footer{
  background:linear-gradient(rgba(15,85,165,0.6), rgba(15,85,165,1)), url(../../images/footer.jpg) no-repeat center/cover;
  position: relative;
  .left{
    padding: 0 20px 0 20px;
    // border: 1px solid yellow;
    .left-box{
      padding: 10px;
      ul{
        list-style: none;
        a{
          display: block;
          text-decoration: none;
          font-size: 18px;
          color: white;
        }
      }
    }
    .map{
      height: 220px;
      iframe{
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .right{
    position: relative;
    // border: 1px solid red;
    .line{
      position: absolute;
      height: 1px;
      width: 80%;
      background: rgb(207, 207, 207);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .logo{
      width: 100px;
      height: 100px;
      text-align: center;
      font-size: 20px;
      line-height: 20px;
      margin: 20px 0 20px 0;
      img{
        width: 80px;
        height: 80px;
      }
    }
  }
}

@media (min-width:600px) {
  .q-footer{
    height: 250px;
  .right{
    .line{
      position: absolute;
      height: 80%;
      width: 1px;
      background: rgb(207, 207, 207);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .logo{
      width: 100px;
      height: 100px;
      text-align: center;
      font-size: 20px;
      line-height: 20px;
      img{
        width: 80px;
        height: 80px;
      }
    }
  }
}
}

@media (min-width:1024px) {
  .q-header{
    display: block;
    .q-tabs{
      display: block;
    }
  }
  .q-toolbar .menu{
    display: none;
  }

  .q-header{
    background: linear-gradient(rgba(30,180,210,1)50%,rgba(30,180,210,0));
    height: 100px;
    // display: none;
}
  .q-header .q-toolbar__title{
    .login{
      display: block;
      right: 0;
    }
  }

  .q-header .q-tabs{
  left: 35%;
}
  .member{
    display: none;
  }
}

@media (min-width:1500px) {
  .q-header .q-tabs{
  left: 50%;
}
}
</style>
