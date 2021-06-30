<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
      >
        <v-img src="@/assets/full.jpg"></v-img>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#036358"
          >
            <v-btn
              @click="signin()"
            >
              Get started
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    overlay: false

  }),

  methods: {
    signin () {
      this.$router.push('/signin')
    }
  }
}
</script>
