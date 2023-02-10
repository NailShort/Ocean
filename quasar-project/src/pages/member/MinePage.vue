<template>
  <div id="Like">
    <div class="content ">
      <div class="row items-center justify-center">
        <h1 h1>我的文章</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
#Like{
  background: rgb(225,85,25);
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
  }
}

@media (min-width:1007px) {
  #Admin{
    justify-content: flex-start;
    justify-content: center;
}
}
</style>
