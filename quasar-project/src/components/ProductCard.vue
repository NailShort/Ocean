<template>
      <q-card class="card-product">
        <img :src="image">
        <q-item>
          <q-item-section>
            <q-item-label>
              <router-link :to="'/products/' + _id">{{ name }}</router-link>
            </q-item-label>
            <q-item-label>${{ price }}</q-item-label>
            <q-item-label caption><p class="pre">{{ description }}</p></q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <q-btn round color="primary" icon="favorite_border" @click="editLike({_id, quantity: 1})"/>
            </q-avatar>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-card>
</template>

<script setup>
import { useUserStore } from 'src/stores/user'

defineProps({
  /* eslint-disable */
    _id: {
      type: String,
      default: ''
    },
    /* eslint-enable */
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
})

const user = useUserStore()
const { editLike } = user
</script>

<style lang="scss" scoped>
.pre{
  white-space: pre;
}

</style>
