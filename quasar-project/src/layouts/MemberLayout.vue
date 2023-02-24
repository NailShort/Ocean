<template>

  <q-layout view="hHh lpR lFf">

    <q-header class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          會員專區
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <div class="menu">
          <ul>
            <li class="head">
              <div class="content">
                <router-link to="/member">
                  <img :src="image">
                </router-link>
              <p> {{ account }}</p>
            </div>
            </li>

            <q-list>
              <q-item clickable v-ripple to="/member/mine">
                <q-item-section avatar>
                  <q-icon name="description" />
                </q-item-section>
                <q-item-section>我的文章</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/member/like">
                <q-item-section avatar>
                  <q-icon name="auto_stories" />
                </q-item-section>
                <q-item-section>最愛文章</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/">
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>首頁</q-item-section>
              </q-item>

            </q-list>
            <!-- <li>
              <span class="material-icons">description</span>文章討論管理
            </li>
            <li><a href="/admin/FishArchives">
              <span class="material-icons">auto_stories</span>魚種圖鑑管理
            </a></li>
            <li><a href="">
              <span class="material-icons">newspaper</span>最新消息管理
            </a></li>
            <li><a href="">
              <span class="material-icons">groups</span>會員資料管理
            </a></li>
            <li><a href="/">
              <span class="material-icons">home</span>首頁
            </a></li> -->
          </ul>

        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const { account, image } = storeToRefs(user)

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<style lang="scss" scoped>
.q-layout{
  background:  rgb(225,85,25);
}
.q-toolbar__title {
  text-align: center;
  padding: 0;
}
.menu{
  height: 100%;
  width: 100%;
  background: rgb(225,85,25);
  ul{
    overflow: hidden;
    margin: 0;
    padding: 20px 0 0 0;
    text-align: center;
    .head{
      width: 300px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .content{
        width: 300px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          height: 80px;
          width: 80px;
        }
        p{
          color: #F0A818;
          font-size: 20px;
          height: 50px;
          line-height: 50px;
          margin: 0;
        }
      }
    }
    .q-list{
      margin-left: 10px;
      border-top: 1px solid rgba(255,255,255,0.5);
      border-bottom: 1px solid rgba(255,255,255,0.5);
      .q-item{
        height: 80px;
        color: white;
        font-size: 18px;
      }
    }
  }
}

@media (min-width:1007px) {
  .menu{
  ul{
    li{
      margin-left: 10px;
      }
    }
  }
}

</style>
