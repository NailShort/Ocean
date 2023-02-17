<template>
  <div id="cf">
    <div class="contant row">
      <div class="col-12">小丑魚</div>
      <!-- 路徑 -->
      <div class="route col-12 row items-center justify-start">
        <q-btn to="/" flat style="color: black" label="首頁" />
        <span>></span>
        <q-btn to="/fish" flat style="color: black" label="魚種圖鑑" />
        <span>></span>
        <q-btn :disable="!progress" flat style="color: gray" label="倒吊魚" />
      </div>
      <div class="col-12">

    <div class="art row warp justify-center items-center" v-for="fish in fishs" :key="fish._id">
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

// 分類篩選 -------

(async () => {
  try {
    const { data } = await api.get('/fishs/category?category=倒吊魚')
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
  .contant{
    max-width: 800px;
  }
}
</style>
