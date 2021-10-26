<template>
  <div>
    <v-container>
      <v-container>
        <v-form
          id="check-element-form"
          ref="irnForm"
          @submit.prevent="validateBeforeSubmit"
        >
          <v-card class="mx-auto">
            <v-row>
              <v-col cols="5" lg="5">
                <v-file-input
                  v-model="archivo"
                  color="primary accent-4"
                  counter
                  label="Carga archivo IRN."
                  placeholder="Selecciona el archivo txt"
                  prepend-icon="mdi-paperclip"
                  outlined
                  show-size
                  accept=".txt"
                  :rules="rules.nombreArchivo"
                  @change="onFileChange"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="prof_txt_1 accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ archivo.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="3" lg="4">
                <v-btn
                  class="ma-2"
                  :loading="cargando"
                  :disabled="cargando"
                  color="primary"
                  type="submit"
                >
                  <v-icon>mdi-upload-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import depositFilesRqt from "@/services/deposit-files.js";
import convierteBase64 from "@/services/utils.js";

export default {
  data() {
    return {
      archivo: null,
      base64String: "",
      nombreArchivo: "",
      objRequest: {},
      cargando: false,
      rules: {
        nombreArchivo: [
          v => !!v || this.$decoder("Favor de seleccionar un archivo valido."),
          v =>
            /^PTCFT_534_(\d{6})15_1601\.(txt|TXT)/.test(v.name) ||
            this.$decoder(
              "La nomenclatura o extensi&oacute;n del archivo no es el correcto."
            )
        ]
      }
    };
  },
  methods: {
    depositFiles(nombreArchivo, base64) {
      depositFilesRqt
        .depositFiles(nombreArchivo, base64)
        .then(response => {
          console.log(response);

          if (response != null) {
            if (response.data != null && response.data.code === "200") {
              this.$swal("Carga archivo.", response.data.message, "success");
              this.limpiar();
            }
          }

          this.cargando = false;
        })
        .catch(error => {
          this.cargando = false;
          console.log(error);
           if (error.response.status == 403) {
           this.$swal(
              this.$decoder("Sesi&oacute;n."),
              this.$decoder("La sesi&oacute;n ha expirado."),
              "error"
            );
            this.$store.dispatch("auth/logout");
          } else {
            this.$swal(
              this.$decoder("Carga archivo."),
              this.$decoder("Error en al cargar el archivo."),
              "error"
            );
          }


    });
    },

    async cargaArchivo() {
      this.cargando = true;

      var nombreArchivo;
      var base64;

      if (this.archivo != null) {
        nombreArchivo = this.$decoder(this.archivo.name);
        var file = this.archivo;
        base64 = await convierteBase64.getBase64(file);
        this.depositFiles(nombreArchivo, base64);
      } else {
        this.$swal(
          "No se ha seleccionado ningun archivo!",
          "Por favor seleccione archivo a cargar.",
          "info"
        );
        this.cargando = false;
      }
    },

    validateBeforeSubmit() {
      if (this.$refs.irnForm.validate()) {
        this.cargaArchivo();
      }
    },

    limpiar() {
      this.archivo = null;
      this.base64String = "";
      this.nombreArchivo = "";
      this.objRequest = {};
      this.cargando = false;
    },
    onFileChange(event) {
      this.archivo = event;
    }
  }
};
</script>

<style>
.bottom-padding {
  padding-bottom: 5%;
}
</style>
