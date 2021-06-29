<template>
    <header class="header d-flex justify-space-between align-center">
        <logo />
        <ul class="right_menu d-flex pa-0">
            <li><a href="">Lenses</a></li>
            <li><a href="">Manufactuters</a></li>
            <li><a href="">Contacts</a></li>
        </ul>
        <div class="left_menu">
            <div v-if="this.block == 1">
                <v-btn
                    class="button"
                    elevation="0"
                    color="#ECFAFF"
                    href="/login"
                >
                    Log in
                </v-btn>
                <v-btn
                    class="button button_signup"
                    elevation="0"
                    color="#7FD4F1"
                    text-color="white"
                    href="/signup"
                >
                    Sign up
                </v-btn>
            </div>

            <div class="profile d-flex" v-else-if="this.block == 2">
                <div class="profile_info">
                    <p class="name">{{ username }}</p>
                    <p class="phone_number">{{ phone_number }}</p>
                </div>
                <v-avatar color="warning lighten-2" size="35">
                    <v-icon dark>
                        mdi-account-circle
                    </v-icon>
                </v-avatar>
                <v-btn
                    depressed
                    color="orange ml-4 text white--text"
                    @click="logout()"
                >
                    Log out
                </v-btn>
            </div>
        </div>
    </header>
</template>

<script>
import getRequest from '@/mixins/getRequest'

export default {
  data () {
    return {
      block: 1,
      username: '',
      phone_number: ''
    }
  },

  components: {
    Logo: () => import('@/components/navigation/Logo')
  },

  created () {
    this.isLogin()
  },

  mixins: [getRequest],

  methods: {
    async isLogin () {
      try {
        const response = await this.getRequest('auth/users/me')
        this.username = response.username
        this.phone_number = response.phone_number
        this.block = 2
      } catch (e) {
        this.block = 1
        this.$router.push('/')
      }
    },

    logout () {
      localStorage.removeItem('jwt')
      // window.location.replace("/")
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
    .header {
        padding:20px 160px;
        background-color: #d4f2ff;
    }
    .button {
        text-transform: none;
        margin-left:15px;
        padding:10px 20px!important;
    }
    .button_signup {
        color:white!important;
    }
    .right_menu li {
        list-style: none;
        margin-right:30px;
    }
    .right_menu li a {
        color:black;
        text-decoration: none;
    }
    .right_menu li a:hover {
        text-decoration: underline;
    }
    .profile_info {
        margin-right:10px;
    }
    .profile_info p {
        margin-bottom:0;
        font-size: 14px;
        line-height: 17px;
        text-align: right;
    }
    .profile_info .name {
        font-weight: 700;
    }
    .profile_info .phone_number {
        color: #AEAEAE;
    }
</style>
