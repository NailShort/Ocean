<template>
  <div id="login" style="max-width: 100%">
    <div class="container">
      <div class="login01"></div>
      <div class="login02"></div>
      <div class="text">
        QQ
      </div>
      <div class="login">
        <h1>登入</h1>
    <q-form style="width:400px" @submit="login" ref="formEl" class="q-gutter-md">

      <q-input filled v-model="form.account" label="帳號"  :rules="[rules.required, rules.length]"  />
      <q-input filled v-model="form.password" type="password" label="密碼"  :rules="[rules.required, rules.length]"  />

      <div class="btn">
        <q-btn label="會員登入" type="submit" :loading="loading" color="primary"/>
      </div>
    </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../../stores/user'

const user = useUserStore()

const loading = ref(false)
const form = reactive({
  account: '',
  password: '',
  passwordConfirm: '',
  email: ''
})
const formEl = ref(null)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  length (value) {
    return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  }
}

const login = async () => {
  loading.value = true
  await user.login(form)
  loading.value = false
}

</script>

<!-- css ----------------------------------------------------------------->
<style lang="scss" scoped>

#login .container{
  position: relative;
  height: 100vh;
  background: linear-gradient(rgba(20,45,85,0.1),rgba(20,45,85,0.8)), url(../../../images/bg.jpg) no-repeat center/cover ;
    h1{
      font-size: 30px;
    }
    .btn{
      padding-top: 20px;
      text-align: left;
    }
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

.login h1{
  font-size: 30px;
  margin: 0;
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
}

</style>
