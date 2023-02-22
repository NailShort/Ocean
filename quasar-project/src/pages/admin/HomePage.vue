<template>
  <div id="Admin">
    <div class="content column items-center justify-center">
        <img :src="`https://source.boringavatars.com/beam/256/${account}?colors=000000,F0A818,304878,181848,F0A818`">
        <p>帳號 </p>
        <p>密碼 </p>
      <!-- 編輯按鈕 -->
      <q-btn icon="edit" flat  color="primary" @click="prompt = true" />
      <!-- 彈跳視窗 -->
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">編輯資料</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="送出" v-close-popup />
            <q-btn flat label="取消" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prompt = ref(false)

</script>

<style lang="scss" scoped>
#Admin{
  background: rgb(15,85,165);
  height: 94vh;
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
