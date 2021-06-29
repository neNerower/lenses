<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'

export default {
  components: { MainLayout },
  name: 'App',

  data: () => ({
    //
  })
}
</script>
