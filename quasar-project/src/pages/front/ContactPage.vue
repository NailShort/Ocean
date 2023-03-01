<template>
  <div id="contact">
    <!-- 標題文字 -->
    <div class="text">
      <p class="title">聯絡我們</p>
      <p class="egtitle">contact us</p>
    </div>
    <div class="text02">
      <p class="title">聯絡我們</p>
      <p class="egtitle">contact us</p>
    </div>
    <!-- 陰影 -->
    <div class="bg"></div>
    <!-- 視差 -->
    <q-parallax :speed="1">
      <template v-slot:media>
        <img src="../../../images/par-bg.jpg">
      </template>
    </q-parallax>
    <!-- 內容 -->
    <div class="contant justify-center">
      <!-- 提醒 -->
      <div class="remind col-12">
        <p>我們收到您的意見後將於工作日由專人以郵件回覆您。</p>
      </div>

      <!-- 表單卡片 -->
      <q-card class="my-card col-12 row items-center justify-center">
        <q-form
          @submit="submit"
          @reset="onreset"
          class="q-gutter-md  col-12 "
        >
          <p class="aaa"><span style="color: red;">●</span> 我們收到您的意見後將於工作日由專人以郵件回覆您。</p>
            <q-input
              class="col-10"
              filled
              v-model="form.name"
              label="姓名"
              hint="請輸入姓名"
              lazy-rules
              :rules="[rules.required]"
          />

          <q-input
            class="col-10"
            filled
            type="number"
            v-model="form.age"
            label="年齡"
            hint="請輸入年齡"
            lazy-rules
            :rules="[rules.required]"
          />

          <q-input
            v-model="form.email"
            filled type="email"
            hint="Email"
            :rules="[rules.required]"
          />

          <!-- 內文 -->
          <q-input class="col-10"
            v-model="form.description"
            filled
            clearable
            type="textarea"
            color="red-12"
            label="內文"
            hint="請輸入內文"
            :shadow-text="textareaShadowText"
            @keydown="processTextareaFill"
            @focus="processTextareaFill"
            :rules="[rules.required]"
          />

          <div class="btn">
            <q-btn :disabled="form.loading" label="送出" type="submit" color="primary"/>
            <q-btn label="重製" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { apiAuth } from '../../../plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

const contacts = reactive([])
const form = reactive({
  _id: '',
  name: '',
  age: '',
  email: '',
  description: '',

  loading: false
})

const submit = async () => {
  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('age', form.age)
  fd.append('email', form.email)
  fd.append('description', form.description)

  try {
    const { data } = await apiAuth.post('/contacts', fd)
    contacts.push(data.result)
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '已收到您的意見，將於工作日由專人以郵件回覆您'
    })

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

</script>

<style lang="scss" scoped>
#contact{
  padding-top: 150px;
  position: relative;
  .text{
    text-align: center;
    margin-bottom: 30px;
    .title{
      font-size: 40px;
      font-weight: 500;
      margin: 0;
      color: rgb(15,85,165);
    }
    .egtitle{
      font-size: 20px;
    }
  }
  .text02{
    display: none;
    position: absolute;
    transform: rotate(90deg);
    transition: 1s;
    z-index: 100;
    top: 270px;
    left: -90px;
    line-height: 80px;
    .title{
      font-size: 100px;
      font-weight: 500;
      margin: 0;
      letter-spacing: 10px;
      color: rgb(15,85,165);
      text-shadow: 0 0 20px rgba(255,255,255,0.9);
    }
    .egtitle{
      font-size: 50px;
      font-weight: 900;
      text-indent: 0.5rem;
      letter-spacing: 17px;
      color: white;
      text-shadow: 0 0 10px rgba(15,85,165,0.9);
    }
  }
  .bg{
    display: none;
    z-index: 50;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 500px;
    background: linear-gradient(rgba(30,180,210,0),rgba(15,85,165,1));
  }
  .q-parallax{
    height: 200px !important;
  }
  .contant{
    padding: 30px;
    background: white;
    width: 100%;
    .remind{
      font-size: 20px;
      color: gray;
      height: auto;
    }
    .q-card{
      z-index: 100;
      border-radius: 0;
      box-shadow: none;
      border: 1px solid rgba(0,0,0,0.2);
      padding: 20px;
      transition: 1s;
      .aaa{
        display: none;
      }
      .btn{
        margin-top: 30px;
      }
    }
  }
}

@media (min-width:819px) {
  #contact{
    padding-top: 250px;
    .text{
      display: none;
    }
    .text02{
      display: block;
    }
    .bg{
      display: block;
    }
    .q-parallax{
      height: 60vh !important;
    }
    .contant{
      position: relative;
      padding: 0;
      .remind{
        display: none;
      }
      .q-card{
        position: absolute;
        bottom: 80px;
        right: 6%;
        min-width: 500px;
        .aaa{
          display: block;
        }
      }
    }
  }
}
@media(min-width: 1255px){
  #contact{
    .text02{
      position: absolute;
      transform: rotate(0deg);
      z-index: 100;
      top: 140px;
      left: 10%;
      line-height: 6vw;
      .title{
        font-size: 8vw;
        font-weight: 500;
        margin: 0;
        letter-spacing: 10px;

      }
      .egtitle{
        font-size: 4.3vw;
        font-weight: 900;
        text-indent: 0.5rem;
        letter-spacing: 17px;
        color: transparent;
        -webkit-text-stroke: 0.5px #fff;
        text-shadow: 0 0 40px rgba(15,85,165,0.9);
      }
    }
    .contant{
      .q-card{
        right: 15%;
      }
    }
  }
}
</style>
