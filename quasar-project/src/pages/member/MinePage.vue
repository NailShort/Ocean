<template>
  <div id="Admin">
    <div class="content justify-center" align="center">

      <div class="top col-12 row">
        <div class="col-6 ">
        <h4 class="title">我的文章</h4>
      </div>
      <!-- 新增商品 ------------------------------------------------>
      <div class="new .col-6  q-pa-md q-gutter-sm">
        <q-btn label="新增商品" color="secondary" @click="openDialog(-1)" />
      </div>
      </div>

      <!-- 分類按鈕組 -->
      <div class="q-pa-md q-gutter-sm col-12" align="center">
        <q-btn v-for="fish,index in articleCategory" outline rounded color="secondary" :key="index" :label="fish" @click="fishActive=fish" />
      </div>

      <!-- 表格 ---------------------------------------------------->
        <table :fishActive="fishActive">
          <thead>
            <tr align="left">
              <th>圖片</th>
              <th>名稱</th>
              <th>日期</th>
              <th>管理</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, idx) in ac" :key="product._id">
              <td class="img">
                <img :src="product.image"  :width="100">
              </td>
              <td class="name">{{ product.name }}</td>
              <td class="time">{{ product.time }}</td>
              <td class="btn">
                <q-btn size="sm" round color="primary" icon="edit" @click="openDialog(idx)"></q-btn>
                <q-btn size="sm" round color="red" icon="delete" @click="deleteProduct(product._id)"></q-btn>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- q-table ------------------------------------------------->
        <!-- <div class="table" style="max-width: 80%;">
        <q-table
          title="我的文章"
          :rows="products"
          :columns="columns"
          row-key="_id"
          v-model:pagination="pagination"
          hide-pagination
        >

        <template v-slot:body-cell-image="products">
          <q-td>
            <q-img :src="products.row.image" ></q-img>
          </q-td>
        </template>

        <template v-slot:body-cell-button="product">
          <q-td>
            <q-btn size="sm" round color="primary" icon="edit" @click="openDialog(idx)"></q-btn>
            <q-btn size="sm" round color="red" icon="delete" @click="deleteProduct(product._id)"></q-btn>
          </q-td>
        </template>
        </q-table>

        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div> -->

        <!-- 彈跳視窗 ------------------------------------------------>
        <q-dialog v-model="form.dialog" persistent>

          <q-card style="width: 100%;">
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
              <!-- 日期 -->
              <q-input
                filled
                v-model="form.time"
                label="價格"
                lazy-rules
                :rules="[rules.required]"
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
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

const categories = ['海水魚類', '珊瑚軟體', '硬體設備', '二手分享']

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

// q-table -------------------------------------

// const columns = reactive([
//   {
//     name: 'image',
//     label: '圖片',
//     align: 'left',
//     field: 'image'
//   },
//   {
//     name: 'article',
//     label: '文章',
//     align: 'left',
//     field: 'name'
//   },
//   {
//     name: 'date',
//     label: '日期',
//     align: 'left',
//     field: 'time'
//   },
//   {
//     name: 'button',
//     label: '編輯',
//     align: 'left'
//   }
// ])

// const pagination = ref({
//   sortBy: 'desc',
//   descending: false,
//   page: 5,
//   rowsPerPage: 5
// })

// const pagesNumber = computed(() => {
//   return Math.ceil(products.length / pagination.value.rowsPerPage)
// })

// -----------------------------------------------

const products = reactive([])
const form = reactive({
  _id: '',
  name: '',
  time: '',
  description: '',
  image: undefined,
  sell: false,
  category: '',

  loading: false,
  dialog: false,
  idx: -1
})

const dt = new Date()
const day = `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.name = ''
    form.time = day
    form.description = ''
    form.image = undefined
    form.sell = false
    form.category = ''

    form.loading = false
    form.idx = -1
  } else {
    form._id = products[idx]._id
    form.name = products[idx].name
    form.time = products[idx].time
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
  fd.append('time', form.time)
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
// 刪除 ------
const deleteProduct = async (id) => {
  try {
    await apiAuth.delete(`/products/${id}`)
    const index = products.findIndex((item) => item._id === id)
    products.splice(index, 1)
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '刪除成功'
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
}
// 分類篩選 -------
const articleCategory = ['所有文章', '海水魚類', '珊瑚軟體', '硬體設備', '二手分享']
const fishActive = ref(articleCategory[0])

const ac = computed(() => {
  return products.filter((fish1) => {
    if (fishActive.value === articleCategory[0]) {
      return fish1
    } else {
      return fish1.category === fishActive.value
    }
  })
});

(async () => {
  try {
    const { data } = await apiAuth.get('/products/member')
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

<style lang="scss" scoped>
#Admin{
  background: rgb(225,85,25);
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 97%;
    width: 98%;
    overflow: auto;
    .top{
      max-width: 800px;
      height: 50px;
      line-height: 50px;
      margin-top: 50px;
      h4{
        margin: 0;
        text-align: left;
        padding-left: 10px;
        margin-left: 20px;
        border-left: 5px solid rgb(225,85,25);
      }
      .new{
        padding: 0;
        text-align: right;
      }
    }

    table{
      border-collapse:collapse;
      max-width: 800px;
      th{
        background: rgb(225,85,25);
        height: 30px;
        color: white;
        padding: 0 10px;
        border-left: 1px solid white;
      }
      th:nth-child(4){
        text-align: center;
      }
      tr:nth-child(even){
        background-color:white;
      }
      .name{
        width: 35%;
        padding: 10px;
      }
      .time{
        width: 20%;
      }
      .btn{
        width: 15%;
        text-align: center;
        .q-btn{
          margin: 5px;
        }
      }
      .img{
        width: 30%;
        img{
          width: 100%;
          height: 100%;
        }
      }

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
