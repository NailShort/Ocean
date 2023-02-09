<template>
  <div id="Admin">
    <div class="content column items-center justify-start">
      <h4 class="title">魚種圖鑑管理</h4>

      <!-- 新增商品 -->
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="新增魚種" color="primary" @click="openDialog(-1)" />
      </div>

        <table style="width: 70%; " border="1">
          <thead>
            <tr align="center">
              <th>圖片</th>
              <th>名稱</th>
              <th>成體尺寸</th>
              <th>產地</th>
              <th>種類</th>
              <th>管理</th>
            </tr>
          </thead>
          <tbody>
            <tr align="center" v-for="(fish, idx) in fishs" :key="fish._id">
              <td>
                <img :src="fish.image"  :width="100">
              </td>
              <td>{{ fish.name }}</td>
              <td>{{ fish.size }} cm</td>
              <td>{{ fish.place }}</td>
              <td>{{ fish.category }}</td>
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

            <q-card-section class="flex row justify-between" style="padding: 16px 50px 16px 50px;">
              <!-- 標題 -->
              <div class="text-h6 col-12" align="center">{{ form._id.length > 0 ? '編輯魚種' : '新增魚種' }}</div>
              <!-- 名稱 -->
              <q-input class="col-4" style="padding:10px ;"
                filled
                v-model="form.name"
                label="名稱"
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 英文名稱 -->
              <q-input class="col-4" style="padding:10px ;"
                filled
                v-model="form.egname"
                label="英文名稱"
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 學術名稱 -->
              <q-input class="col-4" style="padding:10px ;"
                filled
                v-model="form.stname"
                label="學術名稱"
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 危險性 -->
              <q-select class="col-6" style="padding:10px ;" filled v-model="form.danger" :options="dangers" label="危險性" :rules="[rules.required]" />
              <!-- 食性 -->
              <q-select class="col-6" style="padding:10px ;" filled v-model="form.food" :options="foods" label="食性" :rules="[rules.required]" />
              <!-- 尺寸 -->
              <q-input class="col-6" style="padding:10px ;"
                filled
                type="number"
                v-model="form.size"
                label="成體尺寸"
                lazy-rules
                :rules="[rules.required, rules.price]"
              />
              <!-- 產地 -->
              <q-select class="col-6" style="padding:10px ;" filled v-model="form.place" :options="places" label="產地" :rules="[rules.required]" />

              <!-- 分類 -->
              <q-select class="col-6" style="padding:10px ;" filled v-model="form.category" :options="categories" label="分類" :rules="[rules.required]" />

              <!-- 照片 -->
              <q-file class="col-6" style="padding:10px ;" outlined v-model="form.image">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

              <!-- 內文 -->
              <q-input class="col-12" style="padding: 10px;"
                v-model="form.description"
                filled
                clearable
                type="textarea"
                color="red-12"
                label="內文"
                hint="輸入內文"
                :shadow-text="textareaShadowText"
                @keydown="processTextareaFill"
                @focus="processTextareaFill"
                :rules="[rules.required]"
              />

              <!-- 上架 -->
              <q-checkbox style="padding:10px ;" class="col-12" v-model="form.sell" label="上架" />

            </q-card-section>

              <q-card-actions align="center" class="text-primary" style="padding:16px ;">
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

const categories = ['小丑魚', '倒吊魚', '神仙魚']
const dangers = ['溫和', '具攻擊性', '危險', '同科相殘', '攻擊珊瑚']
const foods = ['雜食', '肉食', '素食']
const places = ['印度洋', '紅海']
const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  price (value) {
    return value >= 0 || '尺寸錯誤'
  }
}

const fishs = reactive([])
const form = reactive({
  _id: '',
  name: '',
  egname: '',
  stname: '',
  danger: '',
  food: '',
  size: 0,
  description: '',
  image: undefined,
  sell: false,
  place: '',
  category: '',

  loading: false,
  dialog: false,
  idx: -1
})

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.name = ''
    form.egname = ''
    form.stname = ''
    form.danger = ''
    form.food = ''
    form.size = 0
    form.description = ''
    form.image = undefined
    form.sell = false
    form.place = ''
    form.category = ''

    form.loading = false
    form.idx = -1
  } else {
    form._id = fishs[idx]._id
    form.name = fishs[idx].name
    form.egname = fishs[idx].egname
    form.stname = fishs[idx].stname
    form.danger = fishs[idx].danger
    form.food = fishs[idx].food
    form.size = fishs[idx].size
    form.description = fishs[idx].description
    form.image = undefined
    form.sell = fishs[idx].sell
    form.place = fishs[idx].place
    form.category = fishs[idx].category

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
  fd.append('egname', form.egname)
  fd.append('stname', form.stname)
  fd.append('danger', form.danger)
  fd.append('food', form.food)
  fd.append('size', form.size)
  fd.append('description', form.description)
  fd.append('image', form.image)
  fd.append('sell', form.sell)
  fd.append('place', form.place)
  fd.append('category', form.category)

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/fishs', fd)
      fishs.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/fishs/' + form._id, fd)
      fishs[form.idx] = data.result
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
    const { data } = await apiAuth.get('/fishs/all')
    fishs.push(...data.result)
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
.swal2-container {
  z-index: 7000;
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
