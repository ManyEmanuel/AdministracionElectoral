<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Registro de sistema</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-form class="row q-col-gutter-xs" @submit="onSubmit">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.nombre"
              label="Nombre del sistema"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.siglas"
              label="Siglas del sistema"
              autogrow
            />
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.descripcion"
              label="Descripción del sistema"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Agregue una descripción del sistema']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.url"
              label="Url del sistema"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Agregue el url del sistema']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-file
              v-model="sistema.logo"
              label="Logo del sistema"
              accept="image/jpeg,image/png, image/jpg"
            >
              <template v-slot:prepend>
                <q-icon name="photo_camera" />
              </template>
            </q-file>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.version"
              label="Versión del sistema"
              lazy-rules
              :rules="[(val) => !!val || 'Versión del sistema']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.puerto"
              label="Puerto de acceso del sistema"
              lazy-rules
              :rules="[(val) => !!val || 'Especifique el puerto del sistema']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-input v-model="sistema.smtp" label="smtp del sistema" autogrow />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.correo"
              label="Correo del sistema"
              autogrow
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="sistema.contrasena"
              label="Contraseña del correo"
            />
          </div>

          <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="puesto.nombre"
              label="Nombre del puesto"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="puesto.descripcion"
              label="Descripción del puesto"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La descripción es requerida']"
            >
            </q-input>
          </div>-->
          <q-space />
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="negative"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="positive"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
import { useSistemasModulosStore } from "../../../store/sistemas_modulos_store";

const $q = useQuasar();
const sistemaModuloStore = useSistemasModulosStore();
//const authStore = useAuthStore();

const { sistema, modal } = storeToRefs(sistemaModuloStore);
const actualizarModal = (valor) => {
  sistemaModuloStore.actualizarModal(valor);
  sistemaModuloStore.initSistema();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  let bodyFormData = new FormData();
  bodyFormData.append("Nombre", sistema.value.nombre);
  bodyFormData.append("Siglas", sistema.value.siglas);
  bodyFormData.append("Descripcion", sistema.value.descripcion);
  bodyFormData.append("Logo", sistema.value.logo);
  bodyFormData.append("Url", sistema.value.url);
  bodyFormData.append("Version", sistema.value.version);
  bodyFormData.append("Correo", sistema.value.correo);
  bodyFormData.append("Contrasena", sistema.value.contrasena);
  bodyFormData.append("Puerto", sistema.value.puerto);
  bodyFormData.append("Smtp", sistema.value.smtp);
  if (sistema.value.id != null) {
    resp = await sistemaModuloStore.updateSistema(
      sistema.value.id,
      bodyFormData
    );
  } else {
    resp = await sistemaModuloStore.createSistema(bodyFormData);
  }

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    sistemaModuloStore.loadSistemas();
    actualizarModal(false);
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>
