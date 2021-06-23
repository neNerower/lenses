<template>
  <b-form @submit.prevent="login">
    <div class="form-group">
      <label for="phone_number">Номер телефона:</label>
      <b-input v-model="form.phone_number" type="text" id="phone_number" placeholder="Номер телефона..."></b-input>
    </div>
    <div class="form-group">
      <label for="password">Пароль:</label>
      <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
    </div>
    <b-button variant="primary" type="submit">Войти</b-button>
    <p class="mt-3">Ещё не зарегистрированы? <router-link to="/auth/signup">Регистрация</router-link>
    </p>
  </b-form>
</template>
<script>
import authRequest from '@/mixins/authRequest'

export default {
  name: 'SignInForm',

  data () {
    return {
      form: {
        phone_number: '',
        password: ''
      }
    }
  },

  mixins: [authRequest],

  methods: {
    async login () {
      // логика авторизации
      try {
        const response = await this.authRequest('auth/token', this.form)

        // авторизуем юзера
        this.setLogined(response.data.token)
      } catch (error) {
        console.error('AN API ERROR:', error)
      }
    },

    setLogined (jwt) {
      // сохраняем токен
      console.log(jwt)
      localStorage.setItem('jwtoken', jwt)
    }
  }
}

</script>
