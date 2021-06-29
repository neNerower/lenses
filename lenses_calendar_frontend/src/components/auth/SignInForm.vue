<template>
  <b-form @submit.prevent="login">
    <p v-if="err">{{ err.response.data.detail }}</p>

    <div class="form-group">
      <label class="control-label" for="phone_number">Номер телефона:</label>
      <b-input
        v-model="form.phone_number"
        type="text"
        id="phone_number"
        v-imask="phoneNumberMask"
        placeholder="+7(921)123-45-67"
        @keypress="isNumber"
        @accept="onAccept"
        @complete="onComplete"
        maxlength="16"
      />

      <p><small class="text-muted">Введите номер в формате: +7(921)123-45-67</small></p>
    </div>

    <div class="form-group">
      <label class="control-label" for="password">Пароль:</label>
      <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
    </div>

    <b-button variant="primary" type="submit" :disabled="formValid">Войти</b-button>
    <p class="mt-3">Ещё не зарегистрированы? <router-link to="/auth/signup">Регистрация</router-link>
    </p>
  </b-form>
</template>
<script>
import postRequest from '@/mixins/postRequest'
import { required } from 'vuelidate/lib/validators'
import { IMaskDirective } from 'vue-imask'

export default {
  name: 'SignInForm',

  data () {
    return {
      form: {
        phone_number: '',
        password: ''
      },

      userPhoneNumber: '',

      phoneNumberMask: {
        mask: '+{7}(000)000-00-00',
        lazy: true
      },

      err: ''
    }
  },

  validations: {
    form: {
      phone_number: {
        required
      },
      password: {
        required
      }
    }
  },

  computed: {
    formValid () {
      return this.$v.$invalid
    }
  },

  mixins: [postRequest],

  methods: {
    async login () {
      // логика авторизации
      try {
        const response = await this.postRequest('token', this.form)

        // авторизуем юзера
        this.setLogined(response.data)

        window.location.replace('/')
      } catch (error) {
        console.error('AN API ERROR:', error.response)
        this.err = error
      }
    },

    setLogined (jwt) {
      // сохраняем токен
      console.log(jwt)
      localStorage.setItem('jwt_access', jwt.access)
      localStorage.setItem('jwt_refresh', jwt.refresh)

      // this.axios.defaults.headers.common = {
      //   Authorization: 'Bearer ' + jwt.access
      // }
      console.log(`Bearer ${localStorage.getItem('jwt_access')}`)
    },

    onAccept (e) {
      const maskRef = e.detail
      this.form.phone_number = maskRef.value
    },

    onComplete (e) {
      const maskRef = e.detail
      this.userPhoneNumber = maskRef.unmaskedValue
    },

    isNumber (e) {
      const regex = /[0-9]/

      if (!regex.test(e.key)) {
        e.returnValue = false
        if (e.preventDefault) e.preventDefault()
      }
    }
  },

  directives: {
    imask: IMaskDirective
  }
}

</script>
