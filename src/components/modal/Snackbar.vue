<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
    absolute
    outlined
  >
    <template>
      <v-icon color="white">
        {{ icon }}
      </v-icon>
      {{ text }}
      <v-btn
        text
        @click="snackbar = false"
      >
        <v-icon>mdi-close-outline </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  export default {
    data () {
      return {
        color: '',
        icon: '',
        mode: 'multi-line',
        snackbar: false,
        text: '',
        timeout: 6000,
        x: 'right',
        y: 'top',
      }
    },
    methods: {
      open (message, type) {
        this.snackbar = true
        this.text = message
        this.color = type

        if (type === 'success') {
          this.icon = 'mdi-check-circle-outline'
        } else if (type === 'error') {
          this.icon = 'mdi-alert'
        } else if (type === 'warning') {
          this.icon = 'mdi-alert-circle-outline'
        } else if (type === 'info') {
          this.icon = 'mdi-information-outline'
        }
      },
    },
  }
</script>
