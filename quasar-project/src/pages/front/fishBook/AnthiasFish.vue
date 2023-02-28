<template>
  <!-- 海金魚種類頁面 -->
  <div id="cf">
    <div class="contant row">
      <div class="title col-12">
        <div class="ch">海金魚</div>
        <div class="eg">Anthias Fish</div>
      </div>
      <!-- 路徑 -->
      <div class="route col-12 row items-center justify-start">
        <q-btn to="/" flat style="color: black" label="首頁" />
        <span>></span>
        <q-btn to="/fish" flat style="color: black" label="魚種圖鑑" />
        <span>></span>
        <q-btn :disable="!progress" flat style="color: gray" label="海金魚" />
      </div>
      <!-- 卡片 -->
      <div class="card col-12 row items-center justify-center">
        <div class="art col-12 col-sm-6 col-md-3 col-lg-2 row warp justify-center items-center" v-for="fish in fishs" :key="fish._id">
          <ClownFish v-bind="fish"></ClownFish>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { api } from 'app/plugins/axios'
import ClownFish from 'src/components/fishBook/ClownFish.vue'
import Swal from 'sweetalert2'

const fishs = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/fishs/category?category=海金魚')
    fishs.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

defineProps({
  /* eslint-disable */
    _id: {
      type: String,
      default: ''
    },
    /* eslint-enable */
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
#cf{
  padding-top: 100px;
  min-height: 80vh;
  background: #eee;
  .contant{
    background: white;
    max-width: 80%;
    margin: auto;
    padding: 50px 30px;
    .title{
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      .ch{
        font-size: 50px;
      }
      .eg{
        font-size: 20px;
        color:gray;
      }
    }
    .card{
      padding-top: 50px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
