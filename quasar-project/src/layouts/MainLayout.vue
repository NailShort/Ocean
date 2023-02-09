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
        <q-route-tab to="/" label="文章討論" />
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

    <q-footer class="text-white">
      <div class="left"></div>
      <div class="line"></div>
      <div class="right">
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
  background: rgb(15,85,165);
  height: 250px;
  position: relative;
}

.q-footer .left{
  width: 65%;
  height: 250px;
  float: left;
  // border: 1px solid white;
}

.q-footer .line{
  height: 200px;
  width: 1px;
  background: rgb(207, 207, 207);
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translateY(-50%);
}
.q-footer .right{
  width: 25%;
  height: 250px;
  float: right;
  // border: 1px solid white;
}

.q-footer .logo{
  width: 100px;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
}

.q-footer .logo img{
  width: 80px;
}
@media (min-width:555px) {

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
