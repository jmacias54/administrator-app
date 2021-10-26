<template>
  <div>
    <v-container>
      <v-container>
        <v-card class="mx-auto" ref="form">
          <v-row class="d-flex justify-center">
            <v-col cols="4" lg="3">
              <v-text-field
                dense
                v-model="loteProdInicio"
                label="Lote Inicio"
                :rules="[() => !!loteProdInicio || 'Este campo es requerido']"
                :error-messages="errorMessages"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4" lg="3">
              <v-text-field
                dense
                v-model="loteProdFin"
                label="Lote Fin"
                :rules="[() => !!loteProdFin || 'Este campo es requerido']"
                :error-messages="errorMessages"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4" lg="3">
              <v-btn
                class="ma-2"
                :loading="cargando"
                :disabled="cargando"
                color="primary"
                @click="consultar"
              >
                Buscar
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" lg="3">
              <v-chip
                class="ma-2"
                color="pink"
                label
                text-color="white"
                v-show="show"
                transition="scale-transition"
              >
                <v-icon left>
                  mdi-label
                </v-icon>
                Total de cuentas aceptadas:
                <span>{{ this.totalCuentasAceptadas }}</span>
              </v-chip>
            </v-col>
          </v-row>

          <v-container>
            <v-card class="mx-auto">
              <v-data-table
                locale="es-MX"
                :headers="headers"
                :items="listaEtapas"
                :loading="cargando"
                class="elevation-1"
                :page.sync="pagina"
                :items-per-page="elementosPorPagina"
                hide-default-footer
                @page-count="paginaConteo = $event"
              />
              <div class="text-center pt-2">
                <v-pagination v-model="pagina" :length="paginaConteo" />
              </div>
            </v-card>
          </v-container>
        </v-card>
        <waitingModal ref="modal" />
        <confirmModal ref="confirm" />
        <snackbar ref="snackbar" />
      </v-container>
    </v-container>
  </div>
</template>

<script>
import waitingModal from "@/components/modal/WaitingModal.vue";
import confirmModal from "@/components/modal/ConfirmModal.vue";
import snackbar from "@/components/modal/Snackbar.vue";
import previoRqt from "@/services/traspaso/certificacion/previo.js";

export default {
  components: {
    waitingModal,
    confirmModal,
    snackbar
  },
  data() {
    return {
      errorMessages: "",
      formHasErrors: false,
      loteProdInicio: null,
      loteProdFin: null,
      pagina: 1,
      elementosPorPagina: 10,
      cargando: false,
      totalCuentasAceptadas: 0,
      paginaConteo: 5,
      base64String: "",
      show: false,
      listaEtapas: [],
      headers: [
        {
          text: "Etapa",
          align: "start",
          sortable: false,
          value: "descripcion"
        },
        { text: "Aceptadas", value: "aceptadas" },
        { text: "Pendientes", value: "pendientes" }
      ]
    };
  },

  computed: {
    form() {
      return {
        loteProdInicio: this.loteProdInicio,
        loteProdFin: this.loteProdFin
      };
    }
  },
  watch: {
    name() {
      this.errorMessages = "";
    }
  },
  methods: {
    validar() {
      if (this.loteProdInicio <= 0 || this.loteProdFin <= 0) {
        this.$refs.snackbar.open(
          "Por favor seleccione el rango de lotes.",
          "warning"
        );

        return false;
      }

      if (this.loteProdInicio > this.loteProdFin) {
        this.$refs.snackbar.open(
          "El lote fin no puede ser menor que el lote inicio.",
          "warning"
        );

        return false;
      }

      return true;
    },

    consultar() {
      if (this.validar()) {
        this.cargando = true;
        this.$refs.modal.show();

        previoRqt
          .previo(this.loteProdInicio, this.loteProdFin)
          .then(response => {
            if (response != null) {
              if (response.data != null) {
                console.log(response.data);
                this.listaEtapas = response.data.etapa;
                this.listaEtapas.splice(-2, 2);
                this.show = true;
                this.totalCuentasAceptadas =
                  response.data.totalCuentasAceptadas;
                this.cargando = false;
                this.$refs.modal.hide();
              }
            }
          })
          .catch(error => {
            this.cargando = false;
            this.$refs.modal.hide();

            console.log(error);
            if (error.response.status == 403) {
              this.$refs.snackbar.open(
                this.$decoder("La sesion ha expirado."),
                "Waring"
              );
              this.$store.dispatch("auth/logout");
            } else {
              this.$refs.snackbar.open(
                "Error al consultar las etapas.",
                "error"
              );
            }
          });
      }
    }
  }
};
</script>
