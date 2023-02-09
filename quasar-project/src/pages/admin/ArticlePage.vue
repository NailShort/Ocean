<template>
  <div id="Admin">
    <div class="content column items-center justify-start">
      <h4 class="title">文章討論管理</h4>

      <!-- 新增商品 -->
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="新增商品" color="primary" @click="openDialog(-1)" />
      </div>

        <table style="width: 70%; " border="1">
          <thead>
            <tr align="left">
              <th>圖片</th>
              <th>名稱</th>
              <th>管理</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, idx) in products" :key="product._id">
              <td>
                <img :src="product.image"  :width="100">
              </td>
              <td>{{ product.name }}</td>
              <td >
                <q-btn color="primary" icon="edit" @click="openDialog(idx)"></q-btn>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 彈跳視窗 -->
        <q-dialog v-model="form.dialog" persistent>

          <q-card style="min-width: 700px">
            <q-form  @submit="submit">

            <q-card-section>
              <!-- 標題 -->
              <div class="text-h6">{{ form._id.length > 0 ? '編輯商品' : '新增商品' }}</div>
              <!-- 文章 -->
              <q-input
                filled
                v-model="form.name"
                label="文章"
                hint=""
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 價格 -->
              <q-input
                filled
                type="number"
                v-model="form.price"
                label="價格"
                lazy-rules
                :rules="[rules.required, rules.price]"
              />
              <!-- 說明 -->
              <q-input
                filled
                v-model="form.description"
                autogrow
                label="說明"
                :rules="[rules.required]"
              />

              <!-- 分類 -->
              <q-select filled v-model="form.category" :options="categories" label="分類" :rules="[rules.required]" />

              <!-- 上架 -->
              <q-checkbox v-model="form.sell" label="上架" />

              <!-- 照片 -->
              <q-file outlined v-model="form.image">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

            </q-card-section>

              <q-card-actions align="center" class="text-primary">
                <q-btn :disabled="form.loading" type="submit" color="primary" label="送出"/>
                <q-btn :disabled="form.loading" @click="form.dialog = false" label="取消" color="primary" flat class="q-ml-sm" />
              </q-card-actions>

            </q-form>
            </q-card>

        </q-dialog>

    </div>
  </div>
</template>

<script setup>
import { apiAuth } from '../../../plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'

const categories = ['海水魚類', '珊瑚軟體', '硬體設備', '二手分享']
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

    form.loading = false
    form.idx = idx
  }
  form.dialog = true
}

const submit = async () => {
  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('price', form.price)
  fd.append('description', form.description)
  fd.append('image', form.image)
  fd.append('sell', form.sell)
  fd.append('category', form.category)

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/products', fd)
      products.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  form.loading = false
}

(async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

</script>

<!-- style ----------------------------------------------------------->
<style lang="scss" scoped>
.swal2-container{
  z-index: 6100;
}

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
