<template>
  <v-card
    class="mx-auto container"
    tile
    flat
  >
    <h1>Manufacturers</h1>
    <v-list dense class="v-lists">
      <v-list-item-group
        color="primary"
      >
        <v-list-item class="v-list-items pa-0 ml-2 mr-2 mb-4"
            v-for="manufacturer in manufacturersList" :key="manufacturer.id"
        >
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            width="100%"
            flat
          >
            <v-img
              :aspect-ratio="16/9"
              src="@/assets/factory.jpg"
            >
            </v-img>

            <v-card-text
              class="pt-4"
              style="position: relative;"
            >
              <v-btn
                absolute
                color="#A315DF"
                class="white--text"
                fab
                large
                right
                top
                :to="`/manufacturers/${manufacturer.id}`"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <div class="font-weight-medium grey--text text-h5 mb-1">
                {{ manufacturer.company_name }}
              </div>
              <h3 class="text-h5 font-weight-light mb-1">
                {{ manufacturer.country }}
              </h3>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-card>
</template>

<script>
import getRequest from '@/mixins/getRequest'

export default {
  data () {
    return {
      manufacturersList: []
    }
  },
  created () {
    this.loadManufacturersList()
  },

  mixins: [getRequest],

  methods: {
    async loadManufacturersList () {
      try {
        const response = await this.getRequest('lenses_manufacturers/all')
        this.manufacturersList = response.data
      } catch (e) {
        console.log(e.response)
      }
    }
  }
}
</script>

<style scoped>
  .text-h5 {
    color:#A315DF;
  }
  .v-card--reveal {
    background-color: #A315DF;
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
  .container {
    padding:0 160px;
  }
</style>
