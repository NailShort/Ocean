<template>
  <div id="Admin">
    <div class="content column items-center justify-center">
      <h4>請選擇編輯項目</h4>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#Admin{
  background: rgb(15,85,165);
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: star;
  position: relative;
  .content{
    background: #eee;
    border-radius: 30px;
    height: 97%;
    width: 98%;
    overflow: auto;
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
