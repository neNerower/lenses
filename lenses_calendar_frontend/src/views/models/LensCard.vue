<template>
  <div class="container mt-10">
    <v-card flat class="d-flex">
      <img src="@/assets/app_bar.jpg" alt="lens">
      <div class="lens_info">
          <h1>{{ this.lens.model_name }}</h1>
          <div class="info_item">
              <span>Manufacturer: </span>
              {{ this.lens.lenses_manufacturer.company_name }}
          </div>
          <div class="info_item">
              <span>Amount in package: </span>
              {{ this.lens.amount_in_package }}
          </div>
          <div class="info_item">
              <span>Price: </span>
              {{ this.lens.price_per_package }}
          </div>
          <div class="info_item">
              <span>Country: </span>
              {{ this.lens.country }}
          </div>
          <v-btn
              class="dialog_button"
              @click="callDialog()"
          >
              Touch your feelings
          </v-btn>
          <v-dialog
              v-model="dialog"
              max-width="600px"
          >
          <v-card ref="form">
              <v-form @submit.prevent="touchWearing()">
              <v-card-title>
                <span class="headline">Touch your feelings</span>
              </v-card-title>

              <v-card-text>
                  <v-container>
                  <v-row>
                      <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      >
                        <div class="my-2">
                          <v-btn
                            color=#46c613
                            fab
                            x-large
                            dark
                          >
                            <v-icon>mdi-emoticon-happy-outline</v-icon>
                          </v-btn>
                        </div>
                        <div class="my-2">
                          <v-btn
                            color=#ecd729
                            fab
                            x-large
                            dark
                          >
                            <v-icon>mdi-emoticon-cool-outline</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      >
                        <div class="my-2">
                          <v-btn
                            color=#FF6D00
                            fab
                            x-large
                            dark
                          >
                            <v-icon>mdi-emoticon-confused-outline</v-icon>
                          </v-btn>
                        </div>
                        <div class="my-2">
                          <v-btn
                            color=#ff1b00
                            fab
                            x-large
                            dark
                          >
                            <v-icon>mdi-emoticon-dead-outline</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                  </v-row>
                  </v-container>
              </v-card-text>

              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                  Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
              >
                  Book
              </v-btn>
              </v-card-actions>
              </v-form>
          </v-card>
          </v-dialog>
      </div>
    </v-card>

  </div>
</template>

<script>
import postRequest from '@/mixins/postRequest'
import getRequest from '@/mixins/getRequest'
import putRequest from '@/mixins/putRequest'

export default {
  name: 'LensCard',
  data () {
    return {
      dialog: false,
      id: this.$route.params.id,
      lens: {
        lenses_manufacturer: {}
      },
      wearing: {
        lenses: this.id,
        feel: null
      },
      defaultItem: {
        lenses: this.id,
        feel: null
      }
      // rules: {
      //   required: value => !!value || 'Required.',
      // },
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    console.log(`ID_0 ${this.$route.params.id}`)
    this.loadLens()
  },

  mixins: [postRequest, getRequest, putRequest],

  methods: {
    async loadLens () {
      try {
        conlose.log(`ID: ${this.$route.params.id}`)
        // const response = await this.getResponse(`lenses/${this.id}`)
        // console.log(`Data: ${response.data}`)
        // this.lens = response.data
        // console.log(`Lens: ${this.lens}`)
      } catch (e) {
        console.log('ERROR')
        console.log(e.response)
      }
    },

    callDialog () {
      this.dialog = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.booking = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    choseFeeling (feel) {
      this.wearing.feel = feel
    },

    async touchWearing () {
      const today = new Date()
      const currentDate = `${today.getFullYear}-${today.getMonth}-${today.getDate}`

      try {
        const response = this.getRequest(`wearings/my?${currentDate}`)

        if (response.data.length > 0) {
          await this.postRequest('wearings/create', this.wearing)
        } else {
          await this.putRequest('wearing/update/', this.wearing)
        }
      } catch (e) {
        console.log(e.response)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
    .container {
        padding:0;
    }
    img {
        border-radius: 5px;
        width:550px;
        height: 460px;
        object-fit: cover;
    }
    .lens_info {
        padding-left:40px;
    }
    .info_item {
        font-size:18px;
        color:black;
        margin-top: 20px;
    }
    .info_item span {
        font-weight: 600;
    }
    .dialog_button {
        padding: 0 25px!important;
        margin-top:20px;
        background: #5c6bc0!important;
        color:white!important;
        text-transform: none;
    }
    .headline {
        text-align:center;
        width:100%;
    }
</style>
