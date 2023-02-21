<template>
  <!-- 最新消息頁 -->
  <div id="article">
    <!-- 路徑 -->
    <div class="route col-12 row items-center justify-start">
      <q-btn to="/" flat style="color: black" label="首頁" />
      <span>></span>
      <q-btn flat :disable="!progress" style="color: gray" label="最新消息" />
    </div>

    <div class="art row warp justify-center items-center" v-for="latest in latests" :key="latest._id">
      <LatestPageCard v-bind="latest"></LatestPageCard>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import LatestPageCard from '../../components/LatestPageCard.vue'
import Swal from 'sweetalert2'

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

</script>

<style lang="scss" scoped>
  #article{
    padding: 150px 10px;
    .route{
      margin-bottom: 30px;
    }
    .btn{
      margin-bottom: 50px;
      .q-btn{
        margin: 0px;
        padding: 0 15px 0 15px;
        border-right: 1px solid rgba(0,0,0,0.1);
        border-left: 1px solid rgba(0,0,0,0.1);
        border-radius: 0;
      }
    }
    .art{
      margin-top: 20px;
    }
  }

  @media (min-width:819px) {
    #article{
      max-width:800px;
      margin: auto;
    }
  }

</style>
