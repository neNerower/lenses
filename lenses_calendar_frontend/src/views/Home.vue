<template>
  <v-card flat>
    <LensList />
    <v-divider></v-divider>
    <ManufacturersList />
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  components: {
    LensList: () => import('./lists/LensList'),
    ManufacturersList: () => import('./lists/ManufacturerList')
  }

}
</script>
