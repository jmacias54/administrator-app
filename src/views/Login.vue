<template>
  <v-content class="bg">
    <snackbar ref="snackbar" />

    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="mx-auto">
            <v-toolbar flat>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    target="_blank"
                    v-on="on"
                  >
                    <v-avatar>
                      <img
                        src=""
                        height="34"
                      >
                    </v-avatar>
                  </v-btn>
                </template>
                <span>Profuturo</span>
              </v-tooltip>
              <v-spacer />

              <v-toolbar-title>
                <span color="prof_txt_1">Ingresar</span>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                id="check-login-form"
                ref="form"
                @submit.prevent="validateBeforeSubmit"
              >
                <v-text-field
                  v-model="form.usuario"
                  label="Usuario"
                  name="usuario"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="usuario_rules"
                  required
                />

                <v-text-field
                  id="contrasena"
                  v-model="form.contrasena"
                  :label="txt.password_txt"
                  name="contrasena"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="password_rules"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                form="check-login-form"
                :loading="form.cargando"
                :disabled="form.cargando"
              >
                {{ txt.iniciar_sesion }}
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-row
            align="center"
            justify="center"
          />
          <v-row
            align="center"
            justify="center"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
  import { mapGetters } from 'vuex'
  import snackbar from '@/components/modal/Snackbar.vue'

  export default {
    components: { snackbar },
    data () {
      return {
        password_rules: [
          v => !!v || this.$decoder('el campo Contrase&ntilde;a es requerido'),
        ],
        usuario_rules: [v => !!v || 'el campo Usuario es requerido.'],
        form: {
          usuario: '',
          contrasena: '',
          sendingForm: false,
          cargando: false,
        },
        txt: {
          password_txt: '',
          iniciar_sesion: this.$decoder('Iniciar sesi&oacute;n'),
        },
      }
    },

    beforeCreate: () => {
      document.body.className = 'full-page'
    },

    created () {
      this.txt.password_txt = this.$decoder('Contrase&ntilde;a')
      this.$store.dispatch('auth/initAuth')
    },

    computed: {
      ...mapGetters({
        loginStatus: 'auth/status',
      }),
    },

    methods: {
      validateBeforeSubmit () {
        console.log(' -- validateBeforeSubmit -- ')
        this.form.cargando = true
        if (this.$refs.form.validate()) {
          this.handleSubmit()
        }
        this.form.cargando = false
      },

      handleSubmit () {
        console.log(' -- handleSubmit -- ')
        const { usuario, contrasena } = this.form
        this.form.sendingForm = true

        this.$store
          .dispatch('auth/login', { usuario, contrasena })
          .catch(({ status }) => {
            this.form.cargando = false
            /* this.$swal({
              icon: 'warning',
              title: 'Credenciales invalidas...',
              text: this.$decoder('Usuario o contrase&ntilde;a invalido.!'),
              type: 'warning',
              showCloseButton: true,
              showLoaderOnConfirm: true,
            }) */

            this.$refs.snackbar.open(
              this.$decoder('Usuario o contrase&ntilde;a invalido'),
              'warning'
            )
          })
          .finally(() => {
            this.form.sendButtonText = 'Ingresar a mi cuenta'
            this.form.sendingForm = false
          })
      },
    },
  }
</script>
<style scoped>
.bg {
  width: 100%;
  height: 100%;
  background: url(../assets/bg/login.png) center;
  background-size: cover;
  background-color: #004b8d !important;
}
</style>
