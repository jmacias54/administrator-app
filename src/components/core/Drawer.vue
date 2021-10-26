<template>
  <div>
    <v-navigation-drawer
      id="app-drawer"
      v-model="inputValue"
      :mini-variant.sync="mini"
      light
      app
      floating
      mobile-break-point="991"
      persistent
    >
      <template v-slot:img="attrs">
        <v-img
          v-bind="attrs"
          gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
        />
      </template>

      <v-list-item two-line>
        <v-list-item-avatar
          color="primary"
          size="36"
          :alt="GLI"
          @click.stop="mini = !mini"
        >
          <span class="white--text text-h5">{{ GLI }}</span>
        </v-list-item-avatar>
        <v-list-item-title
          color="prof_txt_6"
          size="36"
          @click.stop="mini = !mini"
        >
          {{ GLI }}
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mx-3 mb-3" />

      <template>
        <v-list-item to="/Administrators">
          <v-list-item-icon>
            <v-icon>
              mdi-account-details
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Administrators
          </v-list-item-title>
        </v-list-item>
      </template>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon color="prof_txt_6">
            mdi-exit-to-app
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title color="prof_txt_6">
          {{ txt.cerrar_sesion }}
        </v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>
<script>
  export default {
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        mini: true,
        links: [],
        usuario: {},
        iniciales: '',
        nombre: '',
        txt: {
          cerrar_sesion: this.$decoder('Cerrar sesi&oacute;n'),

        },
      }
    },
    computed: {
      inputValue: {
        get () {
          console.log('get inputValue :', this.$store.state.app.drawer)
          return this.$store.state.app.drawer
        },
        set (val) {
          console.log('set inputValue :', val)
          this.$store.commit('app/setDrawer', val)
        },
      },
    },
    created () {

    },

    methods: {
      // ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

      logout () {
        this.$swal({
          title: this.$decoder('Cerrar Sesi&oacute;n'),
          text: this.$decoder('¿Desea salir de la aplicaci&oacute;n?'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then(result => {
          if (result.value) {
            this.$store.dispatch('auth/logout')
          }
        })
      },
    },
  }
</script>

<style lang="css" scoped>
.icon {
  color: #2596be !important;
}
.item {
  color: #2596be !important;
  caret-color: #004b8d !important;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.item :selection {
  color: #2596be !important;
  background-color: white !important;
  text-shadow: none;
}

.item:not(.item--active):not(.item--disabled) {
  color: #2596be !important;
}
</style>
