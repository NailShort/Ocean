<template>
  <div id="Admin">
    <div class="content column items-center justify-center">
        <img :src="`https://source.boringavatars.com/beam/256/${account}?colors=000000,F0A818,304878,181848,F0A818`">
        <p>帳號 </p>
        <p>密碼 </p>
    </div>
  </div>
</template>

<script setup>
import { apiAuth } from '../../../plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'

const users = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/users/me')
    users.push(...data.result)
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
#Admin{
  background: rgb(15,85,165);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: star;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 97%;
    width: 98%;
    overflow: auto;
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
