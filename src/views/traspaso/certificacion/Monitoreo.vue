<template>
  <div>
    <v-container>
      <v-container>
        <v-card class="mx-auto">
          <v-row class="d-flex justify-center">
            <v-col cols="3" lg="3">
              <v-text-field
                dense
                v-model="loteControl"
                label="Lote Control"
                :rules="[() => !!loteControl || 'Este campo es requerido']"
                :error-messages="errorMessages"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="2" lg="1">
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
                        <v-col cols="8" lg="4" />
          </v-row>

          <v-container>
            <p class="font-weight-bold">
              {{ this.text.titulo_apertura }}
            </p>
            <v-card class="mx-auto">
              <v-data-table
                locale="es-MX"
                :headers="headersCertificacion"
                :items="certificacionList"
                :loading="cargando"
                class="elevation-1"
                hide-default-footer
              />
            </v-card>
          </v-container>

          <v-container>
            <p class="font-weight-bold">
              Apertura
            </p>
            <v-card class="mx-auto">
              <v-data-table
                locale="es-MX"
                :headers="headersApertura"
                :items="aperturaList"
                :loading="cargando"
                class="elevation-1"
                hide-default-footer
              />
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
import monitoreoRqt from "@/services/traspaso/certificacion/monitoreo.js";

export default {
  components: { waitingModal, confirmModal, snackbar },
  data() {
    return {
      loteControl: null,
      pagina: 0,
      paginaConteo: 5,
      elementosPorPagina: 10,
      cargando: false,
      aperturaList: [],
      certificacionList: [],
      headersCertificacion: [
        {
          text: "Total de cuentas",
          value: "totalCuentas"
        },
        { text: "Cuentas Transaccionadas", value: "cuentasTransaccionadas" },
        { text: "Cuentas Pendientes", value: "cuentasPendientes" },
        { text: "Cuentas rechazadas", value: "cuentasRechazadas" },
        { text: "% de Avance", value: "avance" }
      ],
      headersApertura: [
        {
          text: "Total de cuentas",
          value: "totalCuentas"
        },
        { text: "Cuentas Aperturadas", value: "cuentasAperturadas" },
        { text: "Cuentas Pendientes", value: "cuentasPendientes" }
      ],
      text: {
        titulo_apertura: this.$decoder("Certificaci&oacute;n")
      }
    };
  },
  methods: {
    validar() {
      if (this.loteControl <= 0) {
        this.$refs.snackbar.open(
          "Por favor seleccione el lote control.",
          "warning"
        );

        return false;
      }

      return true;
    },

    vaciar_listas() {
      this.certificacionList = [];
      this.aperturaList = [];
    },
    consultar() {
      if (this.validar()) {
        this.cargando = true;
        this.$refs.modal.show();
        this.vaciar_listas();

        monitoreoRqt
          .monitoreo(this.loteControl)
          .then(response => {
            if (response != null) {
              if (response.data != null) {
                console.log(response.data);
                this.certificacionList.push(response.data.certificacion);
                this.aperturaList.push(response.data.apertura);
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
              this.$decoder("Error en la consulta."),
              "error"
            );
          }
          });
      }
    }
  }
};
</script>
