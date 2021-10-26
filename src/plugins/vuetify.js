import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#004b8d',
        secondary: '#ffc000',
        tertiary: '#0181c4',
        accent: '#82B1FF',
        error: '#d0021b',
        info: '#00d3ee',
        success: '#53b312',
        warning: '#fdbd2c',

      },
      dark: {
        primary: '#1976D2',
        secondary: '#ffc000',
        accent: '#82B1FF',
        error: '#d0021b',
        info: '#2196F3',
        success: '#53b312',
        warning: '#fdbd2c',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { es },
    current: 'es',
  },
})
