<template>
  <v-app>
    <Navbar />
      <slot></slot>
    <Footer />
  </v-app>
</template>
<script>
export default {
  name: 'MainLayout',
  components: {
    Navbar: () => import('@/components/navigation/Navbar'),
    Footer: () => import('@/components/navigation/Footer')
  }
}

</script>
