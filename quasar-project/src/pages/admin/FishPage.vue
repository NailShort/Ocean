<template>
  <div id="Admin">
    <div class="content justify-center" align="center">

      <div class="top col-12 row">
        <div class="col-8">
          <h4 class="title">魚種圖鑑管理</h4>
        </div>
        <div class="new col-4 q-pa-md q-gutter-sm">
          <q-btn label="新增魚種" color="primary" @click="openDialog(-1)" />
        </div>
      </div>

      <!-- 分類組 -->
      <div class="categroys q-pa-md q-gutter-sm col-12" align="center">
        <q-btn v-for="fish,index in fishCategory" outline rounded color="primary" :key="index" :label="fish" @click="fishActive=fish" />
      </div>

        <!-- 表格 ------------------------------------------------------>
        <table>
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
            <tr align="center" v-for="(fish, idx) in ac" :key="fish._id">
              <td class="img">
                <img :src="fish.image"  :width="100">
              </td>
              <td class="name">{{ fish.name }}</td>
              <td class="size">{{ fish.size }} cm</td>
              <td class="place">{{ fish.place }}</td>
              <td class="categroy">{{ fish.category }}</td>
              <td class="btn">
                <q-btn size="sm" round color="primary" icon="edit" @click="openDialog(idx)"></q-btn>
                <q-btn size="sm" round color="red" icon="delete" @click="deleteFish(fish._id)"></q-btn>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 彈跳視窗 -->
        <q-dialog v-model="form.dialog" persistent>

          <q-card style="width: 100%;">
            <q-form  @submit="submit">

            <q-card-section class="flex row justify-between" style="padding: 16px 50px 16px 50px;">
              <!-- 標題 -->
              <div class="text-h6 col-12" align="center">{{ form._id.length > 0 ? '編輯魚種' : '新增魚種' }}</div>
              <!-- 名稱 -->
              <q-input class="col-6" style="padding:10px ;"
                filled
                v-model="form.name"
                label="名稱"
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 分類 -->
              <q-select class="col-6" style="padding:10px ;" filled v-model="form.category" :options="categories" label="分類" :rules="[rules.required]" />

              <!-- 英文名稱 -->
              <q-input class="col-6" style="padding:10px ;"
                filled
                v-model="form.egname"
                label="英文名稱"
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 學術名稱 -->
              <q-input class="col-6" style="padding:10px ;"
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
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

const categories = ['小丑魚', '雀鯛', '倒吊', '小型神仙', '大型神仙', '蝶魚', '砲彈', '箱魨', '魨魚', '青蛙', '隆頭魚', '草莓魚', '海金魚', '蝦虎']
const dangers = ['溫和', '具攻擊性', '危險', '同科相殘', '攻擊珊瑚']
const foods = ['雜食', '肉食', '素食']
const places = ['印度洋', '西太平洋', '紅海', '印度尼西亞', '大堡礁', '聖誕島', '澳大利亞', '珊瑚海', '斐濟']
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
// 刪除 -----------
const deleteFish = async (id) => {
  try {
    await apiAuth.delete(`/fishs/${id}`)
    const index = fishs.findIndex((item) => item._id === id)
    fishs.splice(index, 1)
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

// 篩選分類 -------------
const fishCategory = ['所有魚種', '小丑魚', '雀鯛', '倒吊魚', '小型神仙', '大型神仙', '蝶魚', '砲彈', '箱魨', '魨魚', '青蛙', '隆頭魚', '草莓魚', '海金魚', '蝦虎']
const fishActive = ref(fishCategory[0])

const ac = computed(() => {
  return fishs.filter((fish1) => {
    if (fishActive.value === fishCategory[0]) {
      return fish1
    } else {
      return fish1.category === fishActive.value
    }
  })
});

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
    position: relative;
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
        border-left: 5px solid rgb(15,85,165);
      }
      .new{
        padding: 0;
        text-align: right;
      }
    }
    .categroys{
      max-width: 800px;
    }
    table{
      border-collapse:collapse;
      max-width: 800px;
      th{
        background: rgb(15,85,165);
        height: 30px;
        color: white;
        padding: 0 10px;
        border-left: 1px solid white;
      }
      td{
        border-left: 1px solid rgba(0,0,0,0.1);
      }
      th:nth-child(4){
        text-align: center;
      }
      tr:nth-child(even){
        background-color:white;
      }
      .name{
        width: 20%;
        padding: 10px;
      }
      .size{
        width: 10%;
      }
      .place{
        width: 10%;
        text-align: center;
      }
      .categroy{
        width: 10%;
      }
      .q-btn{
        margin: 5px;
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
