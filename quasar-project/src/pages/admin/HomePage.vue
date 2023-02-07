<template>
  <div id="Admin">
    <div class="content">123</div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#Admin{
  background: rgb(15,85,165);
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
