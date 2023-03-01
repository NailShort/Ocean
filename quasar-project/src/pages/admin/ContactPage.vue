<template>
  <div id="Admin">
    <div class="content justify-center" align="center">

      <div class="top col-12 row">
        <div class="col-8">
          <h4 class="title">聯絡訊息查看</h4>
        </div>
      </div>

        <table>
          <thead>
            <tr align="left">
              <th>姓名</th>
              <th>年齡</th>
              <th>信箱</th>
              <th>內容</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contact) in contacts" :key="contact._id">
              <td class="name">{{ contact.name }}</td>
              <td class="age">{{ contact.age}}</td>
              <td class="email">{{ contact.email}}</td>
              <td class="des">{{ contact.description }}</td>
            </tr>
          </tbody>
        </table>

    </div>
  </div>
</template>

<script setup>
import { apiAuth } from '../../../plugins/axios'
import { reactive } from 'vue'
import Swal from 'sweetalert2'

const contacts = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/contacts/all')
    contacts.push(...data.result)
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
      tr:nth-child(even){
        background-color:white;
      }
      .name{
        width: 100px;
        padding: 10px;
      }
      .age{
        width: 100px;
      }
      .email{
        width: 200px;
      }
      .des{
        width: 400px;
        white-space: pre-wrap;
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
