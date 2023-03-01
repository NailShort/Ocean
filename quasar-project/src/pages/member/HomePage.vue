<template>
  <div id="Admin">
    <div class="content column items-center justify-center">
      <div class="user">
        <div class="img">
          <img class="head" :src="image">
        </div>
      <div class="text">
        <p>名稱：{{ form.name }}</p>
        <p>信箱：{{ form.email }}</p>
        <!-- 編輯按鈕 -->
      <q-btn class="btn" icon="edit" flat  color="primary" @click="form.dialog=true"/>
      </div>

      <!-- 彈跳視窗 -->
      <q-dialog v-model="form.dialog" persistent>
        <q-card style="min-width: 350px">
          <q-form  @submit="submit">
            <q-card-section>
              <div class="text-h6">編輯資料</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                filled
                v-model="form.name"
                label="修改名稱"
                hint=""
                lazy-rules
                :rules="[rules.required]"
              />
              <q-input
                filled
                v-model="form.email"
                label="修改信箱"
                hint=""
                lazy-rules
                :rules="[rules.required]"
              />
              <!-- 照片 -->
              <q-file outlined v-model="form.image">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn :disabled="form.loading" flat label="送出" v-close-popup  type="submit"/>
              <q-btn :disabled="form.loading" @click="form.dialog = false" flat label="取消" v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    </div>
  </div>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '../../stores/user'
import { apiAuth } from '../../../plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { useUserStore } from 'src/stores/user'
import { storeToRefs } from 'pinia'
const user = useUserStore()

const { image } = storeToRefs(user)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

// const user = useUserStore()
// const { avatar, account } = storeToRefs(user)

// const users = reactive([])
const form = reactive({
  _id: '',
  name: '',
  password: '',
  image: undefined,
  email: '',

  loading: false,
  dialog: false
})

const submit = async () => {
  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('image', form.image)
  fd.append('email', form.email)

  await user.editImage(fd)
  // try {
  //   const { data } = await apiAuth.patch('/users/eduser', fd)
  //   form.image = data.result.image
  //   Swal.fire({
  //     icon: 'success',
  //     title: '成功',
  //     text: '編輯成功'
  //   })

  //   form.dialog = false
  // } catch (error) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: '失敗',
  //     text: error?.response?.data?.message || '發生錯誤'
  //   })
  // }

  form.loading = false
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/me')
    // users.push(...data.result)
    form._id = data.result._id
    form.name = data.result.name || '尚未修改名稱'
    console.log(image)
    form.image = data.result.image || '../../../images/尚無照片-01.jpg'
    form.email = data.result.email

    form.loading = false
    form.dialog = false
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
  image: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }

})

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
    .user{
      .img{
        width: 200px;
        height: 250px;
        margin-bottom: 20px;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      .text{
        position: relative;
        .btn{
          position: absolute;
          top: 0;
          right: 0;
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
