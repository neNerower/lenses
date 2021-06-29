<template>
  <b-form @submit.prevent="register">
    <p v-if="err">{{ err }}</p>

    <div class="form-group required">
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

    <div class="form-group required">
      <label class="control-label" for="username">Имя:</label>
      <b-input v-model="form.username" type="text" id="username" placeholder="Имя..."/>

      <p><small class="text-muted">Минимальная длина логина 5 символов</small></p>
    </div>

    <div class="form-group required">
      <label class="control-label" for="password">Пароль:</label>
      <b-input v-model="form.password" type="password" id="password" placeholder="Пароль..."></b-input>
      <p><small class="text-muted">Минимальная длина пароля 6 символов</small></p>
    </div>

    <div class="form-group required">
      <label class="control-label" for="repeatPassword">Повторите пароль:</label>
      <b-input
        v-model="form.repeatPassword"
        type="password"
        id="repeatPassword"
        placeholder="Повторите пароль..."
      />
    </div>

    <p class="text-danger" v-if="!$v.form.password.minLength">Длина пароля меньше 6 символов</p>

    <p
      class="text-danger"
      v-if="isPasswordTheSame"
    >
      Введённые пароли не совпадают
    </p>

    <b-button variant="primary" type="submit" :disabled="formValid">Регистрация</b-button>

    <p class="mt-2">
      <small class="text-muted">
        Все поля отмеченные <span class="text-danger">*</span> обязательны для заполнения.
      </small>
    </p>

    <p class="mt-3">Уже есть аккаунт? <router-link to="/auth/signin">Вход</router-link></p>
  </b-form>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { IMaskDirective } from 'vue-imask'
import postRequest from '@/mixins/postRequest'

export default {
  name: 'SignUpForm',

  data () {
    return {
      form: {
        username: '',
        phone_number: '',
        password: '',
        repeatPassword: ''
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
      username: {
        required,
        minLength: minLength(5)
      },
      phone_number: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        required,
        sameAs: sameAs('password')
      }
    }
  },

  computed: {
    formValid () {
      return this.$v.$invalid
    },

    isPasswordTheSame () {
      const form = this.$v.form

      return form.password.required &&
        form.repeatPassword.required &&
        !form.repeatPassword.sameAs
    }
  },

  mixins: [postRequest],

  methods: {
    async register () {
      // логика регистрации
      try {
        this.form.phone_number = this.form.phone_number.replace(/[()-]/g, '')

        await this.postRequest('auth/users', this.form)

        // редиректим, если нет ошибки
        this.$router.push('/auth/signin')
      } catch (e) {
        // console.error('AN API ERROR', e.data)
        this.err = e.message
      }
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
<style>
.form-group.required .control-label:after {
  content:" *";
  color:red;
}
</style>
