<template>
  <v-card flat>
    <div v-if="this.isLogged">
      <LensList />
      <v-divider></v-divider>
      <ManufacturersList />
    </div>
    <div v-else>
      <Start />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    isLogged: false
  }),

  components: {
    LensList: () => import('./lists/LensList'),
    ManufacturersList: () => import('./lists/ManufacturerList'),
    Start: () => import('./home/Start')
  },

  created () {
    this.isLogin()
  },

  methods: {
    isLogin () {
      if (localStorage.getItem('jwt_access') !== null) {
        this.isLogged = true
      }
    }
  }

}
</script>
