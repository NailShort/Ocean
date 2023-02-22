<template>
  <div id="login" style="max-width: 100%">
    <div class="container">
      <div class="row items-center justify-center">

        <div class="text col-12 col-lg-6">
          <p>Ocean</p>
        </div>

        <div class="right col-12 col-lg-6">
          <div class="login ">
            <h1>登入</h1>
            <q-form style="width:400px" @submit="login" ref="formEl" class="q-gutter-md">
              <q-input filled v-model="form.account" label="帳號"  :rules="[rules.required, rules.length]"  />
              <q-input filled v-model="form.password" type="password" label="密碼"  :rules="[rules.required, rules.length]"  />
              <div class="btn">
                <q-btn label="會員登入" type="submit" :loading="loading" color="primary"/>
              </div>
            </q-form>
            <div class="login01"></div>
            <div class="login02"></div>
          </div>
        </div>

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

#login{
  .container{
    padding-top: 150px;
    padding-bottom: 150px;
    position: relative;
    min-height: 95vh;
    background: linear-gradient(rgba(20,45,85,0.1),rgba(20,45,85,0.8)), url(../../../images/bg.jpg) no-repeat center/cover ;
    .right{
      position: relative;
      .login{
        margin: auto;
        width: 600px;
        height: 600px;
        background: url(../../../images/login.png) no-repeat center/cover;
        filter: drop-shadow(0 5px 10px rgba(20,45,85,0.5)) ;
        text-align: center;
        h1{
          font-size: 30px;
          margin: 0;
        }
        @keyframes moveWave01 {
          0% {
            top: -0px;
            left: -0px;
          }

          100% {
            top: -40px;
            left: -40px;
            opacity: 0;
          }
        }

        @keyframes moveWave02 {
          0% {
            top: 0px;
            left: 0px;
          }

          100% {
            top: 40px;
            left: 40px;
            opacity: 0;
          }
        }
        .login01{
          z-index: -1;
          position: absolute;
          animation: moveWave01 3s infinite linear;
          top: -30px;
          left: -30px;
          width: 600px;
          height: 600px;
          background: url(../../../images/login01.png)no-repeat center/cover;
        }
        .login02{
          z-index: -1;
          position: absolute;
          animation: moveWave02 3s infinite linear;
          top: 30px;
          left: 30px;
          width: 600px;
          height: 600px;
          background: url(../../../images/login01.png)no-repeat center/cover;
        }
        .q-form{
          margin: auto;
        }
      }
    }
    .text{
      // border: 1px solid white;
      font-size: 30px;
      color: white;
      text-align: center;
      margin-bottom: 50px;
    }
    .btn{
      padding-top: 20px;
      text-align: left;
    }
  }
}

</style>
