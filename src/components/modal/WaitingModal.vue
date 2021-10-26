<template>
  <div>
    <v-container>
      <v-dialog
        v-model="showModal"
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Por favor espere
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        showModal: false,
      }
    },
    methods: {

       show() {
      this.showModal = true
     },
     hide(){
      this.showModal = false
     }
    },
  }
</script>

<style>
.bottom-padding {
  padding-bottom: 5%;
}
</style>
