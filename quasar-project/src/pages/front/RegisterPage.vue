<template>
  <div id="register" style="max-width: 100%">
    <div class="container">
      <div class="login01"></div>
      <div class="login02"></div>
      <div class="text">
        QQ
      </div>
      <div class="login">
        <h1>註冊</h1>
        <q-form style="width:400px" @submit="register" ref="formEl" class="q-gutter-md">

          <q-input filled v-model="form.email" type="email" label="信箱"  :rules="[rules.email, rules.required]"  />
          <q-input filled v-model="form.account" label="帳號"  :rules="[rules.required, rules.length]"  />
          <q-input filled v-model="form.password" type="password" label="密碼"  :rules="[rules.required, rules.length]"  />
          <q-input filled v-model="form.passwordConfirm" type="password" label="密碼確認"  :rules="[rules.required, rules.length, rules.passwordConfirm]"/>

          <div class="btn">
            <q-btn label="註冊會員" type="submit" :loading="loading" color="primary"/>
            <q-btn label="會員登入" type="submit" color="secondary" style="margin-left: 20px;"/>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'
import { api } from '../../boot/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const form = reactive({
  account: '',
  password: '',
  passwordConfirm: '',
  email: ''
})
const formEl = ref(null)

const rules = {
  email (value) {
    return validator.isEmail(value) || '格式錯誤'
  },
  required (value) {
    return !!value || '欄位必填'
  },
  length (value) {
    return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  },
  passwordConfirm (value) {
    return (value === form.password) || '密碼不一致'
  }
}

const register = async () => {
  if (!await formEl.value.validate()) return
  loading.value = true
  try {
    await api.post('/users', form)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
  loading.value = false
}
</script>

<!-- css ----------------------------------------------------------------->
<style lang="scss" scoped>

#register .container{
  position: relative;
  height: 100vh;
  background: linear-gradient(rgba(20,45,85,0.1),rgba(20,45,85,0.8)), url(../../../images/bg.jpg) no-repeat center/cover ;
  .btn{
    padding-top: 20px;
    text-align: left;
  }
  .login01{
    position: absolute;
    left: 53%;
    top: 25%;
    width: 600px;
    height: 600px;
    background: url(../../../images/login01.png) no-repeat center/cover;
  }
  .login02{
    position: absolute;
    left: 57%;
    top: 15%;
    width: 600px;
    height: 600px;
    background: url(../../../images/login01.png) no-repeat center/cover;
  }
  .text{
    position: absolute;
    left: 10%;
    top: 20%;
    width: 600px;
    height: 600px;
    // border: 1px solid white;
    font-size: 30px;
    color: white;
    text-align: center;
  }
}

.login{
  position: absolute;
  left: 55%;
  top: 20%;
  width: 600px;
  height: 600px;
  background: url(../../../images/login.png) no-repeat center/cover;
  filter: drop-shadow(0 5px 10px rgba(20,45,85,0.5)) ;
  text-align: center;
  .q-form{
    margin: auto;
  }
  h1{
    font-size: 30px;
    margin: 0;
  }
}

</style>
