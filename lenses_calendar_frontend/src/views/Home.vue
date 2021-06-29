<template>
  <v-card flat>
    <LensList />
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  components: {
    LensList: () => import('./lists/LensList')
  }

}
</script>
