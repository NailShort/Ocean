<template>
    <div :to="'/replys/' + _id" class="reply col-12 row items-center justify-center">
      <!-- 左側使用者 -->
      <div class="re-user col-3 items-center justify-center">
        <div class="user-img col-12">
          <img :src="userid.image || `https://source.boringavatars.com/beam/256/${userid.name}?colors=000000,F0A818,304878,181848,F0A818`">
        </div>
        <div class="re-name col-12">{{ userid.name || '' }}</div>
      </div>
      <!-- 右側內容 -->
      <div class="re-des col-9">
        <div class="line"></div>
        <p class="time">{{ new Date(time).toLocaleString() }}</p>
        <img :src="image">
        <p>{{ description }}</p>
      </div>
    </div>
</template>

<script setup>

defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: ''
  },
  userid: {
    type: String,
    default: ''
  },
  time: {
    type: Date,
    default: Date.now
  },
  /* eslint-enable */
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.reply{
    margin-top: 30px;
    margin-bottom: 50px;
    background: white;
    .re-user{
      padding: 10px;
      text-align: center;

        .user-img{
          width: 70px;
          height: 70px;
          margin: auto;
          margin-bottom: 10px;
        }
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .re-des{
      padding: 10px 30px;
      position: relative;
      .line{
        position: absolute;
        width: 1px;
        height: 95%;
        background: rgba(0,0,0,0.1);
        left: 0;
      }
      .time{
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
      img{
        width: 100%;
      }
    }
</style>
