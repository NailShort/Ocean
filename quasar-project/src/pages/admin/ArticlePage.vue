<template>
  <div id="Admin">
    <div class="content column items-center justify-start">
      <h4 class="title">文章討論管理</h4>

      <!-- 新增商品 -->
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="新增商品" color="primary" @click="openDialog(-1)" />

        <!-- 彈跳視窗 -->
        <q-dialog v-model="form.dialog" persistent>

          <q-card style="min-width: 500px">
            <q-form>
            <q-card-section>
              <div class="text-h6">{{ form._id.length > 0 ? '編輯商品' : '新增商品' }}</div>
            </q-card-section>

            <q-card-section>
              <q-input
                filled
                v-model="form.name"
                label="文章"
                hint=""
                lazy-rules
                :rules="[rules.required]"
              />

              <q-input
                filled
                type="number"
                v-model="form.price"
                label="價格"
                lazy-rules
                :rules="[rules.required, rules.price]"
              />

              <q-input
                filled
                v-model="form.description"
                autogrow
                label="說明"
                :rules="[rules.required]"
              />

              <!-- uploader -->
              <q-uploader
                url="http://localhost:4444/upload"
                v-model="form.image"
                label="選擇圖片"
                multiple
                style="width: 70%;"
              />

              <!-- 上架 -->

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
              </q-card-section>
            </q-form>
            </q-card>

        </q-dialog>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  price (value) {
    return value >= 0 || '價格錯誤'
  }
}

const products = reactive([])
const form = reactive({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: undefined,
  sell: false,
  category: '',
  valid: false,
  loading: false,
  dialog: false,
  idx: -1
})

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.name = ''
    form.price = 0
    form.description = ''
    form.image = undefined
    form.sell = false
    form.category = ''
    form.valid = false
    form.loading = false
    form.idx = -1
  } else {
    form._id = products[idx]._id
    form.name = products[idx].name
    form.price = products[idx].price
    form.description = products[idx].description
    form.image = undefined
    form.sell = products[idx].sell
    form.category = products[idx].category
    form.valid = false
    form.loading = false
    form.idx = idx
  }
  form.dialog = true
}

</script>

<!-- style ----------------------------------------------------------->
<style lang="scss" scoped>
#Admin{
  background: rgb(15,85,165);
  height: 887px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 860px;
    width: 98%;
    overflow: auto;
    position: relative;
    padding: 30px;
    .title{
      margin: 10px 0 10px 0;
    }
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
