<template>
  <router-view />
</template>

<script  setup>
// import { defineComponent } from 'vue'
import { useUserStore } from './stores/user'

useUserStore().getUser()

// export default defineComponent({
//   name: 'App'
// })

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

*{
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
