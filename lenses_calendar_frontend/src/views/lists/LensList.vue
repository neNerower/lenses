<template>
  <v-card
    class="mx-auto container"
    tile
    flat
  >
    <h1>Lenses</h1>
    <v-list dense class="v-lists">
      <v-list-item-group
        color="primary"
      >
        <v-list-item class="v-list-items pa-0 ml-2 mr-2 mb-4"
            v-for="lens in lensesList" :key="lens.id"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              color="grey lighten-4"
              width="100%"
              flat
            >
              <v-img
                :aspect-ratio="16/9"
                src="@/assets/app_bar.jpg"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal text-h4 white--text"
                    style="height: 100%;"
                  >
                    ${{ lens.price_per_package }}
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text
                class="pt-4"
                style="position: relative;"
              >
                <v-btn
                  absolute
                  color="#20DF7F"
                  class="white--text"
                  fab
                  large
                  right
                  top
                  :to="`/lenses/${lens.id}`"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <div class="font-weight-medium grey--text text-h5 mb-1">
                  {{ lens.model_name }}
                </div>
                <h3 class="text-h5 font-weight-light mb-1">
                  {{ lens.amount_in_package }} pairs
                </h3>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

</template>

<script>
import getRequest from '@/mixins/getRequest'

export default {
  name: 'LensList',

  data: () => ({
    lensesList: []
  }),

  created () {
    this.loadLensesList()
  },

  mixins: [getRequest],

  methods: {
    async loadLensesList () {
      try {
        const response = await this.getRequest('lenses/all')
        this.lensesList = response.data.map(this.parse)
      } catch (e) {
        console.log(e.response)
      }
    },

    parse (lens) {
      return {
        id: lens.id,
        model_name: lens.model_name,
        price_per_package: lens.price_per_package,
        amount_in_package: lens.amount_in_package
      }
    }
  }
}
</script>

<style scoped>
  .text-h5 {
    color:#20DF7F;
  }
  .v-card--reveal {
    background-color: #20DF7F;
  }
  .v-item-group {
    display: flex;
    flex-wrap: wrap;
  }
  .v-list-items {
    flex: 0 0 31.9%;
  }
  h1 {
    color:#445964;
    margin:30px 0 15px 5px;
  }
</style>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
.container {
  padding:0 160px;
}
</style>
