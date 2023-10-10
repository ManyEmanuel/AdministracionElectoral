<template>
  <q-dialog
    v-model="modalModulo"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1000px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          Registro de modulo del sistema {{ sistema.nombre }}
        </div>
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
        <q-form
          ref="ResetModulo"
          class="row q-col-gutter-xs"
          @submit="onSubmit"
        >
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="modulo.nombre"
              label="Nombre del modulo"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="modulo.siglas"
              label="Siglas del modulo"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas son requeridas']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="modulo.orden"
              label="Orden de aparición del modulo"
              autogrow
            />
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="modulo.descripcion"
              label="Descripción del modulo"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Agregue una descripción del sistema']"
            />
          </div>
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
      <TablaModulos />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
import { useSistemasModulosStore } from "../../../store/sistemas_modulos_store";
import TablaModulos from "./TablaModulos.vue";

const $q = useQuasar();
const sistemaModuloStore = useSistemasModulosStore();
const ResetModulo = ref();
//const authStore = useAuthStore();

const { modulo, modalModulo, sistema, modulos } =
  storeToRefs(sistemaModuloStore);
const actualizarModal = (valor) => {
  sistemaModuloStore.actualizarModalModulo(valor);
  sistemaModuloStore.initModulo();
  sistemaModuloStore.initSistema();
};

const actualizarTabla = async () => {
  sistemaModuloStore.initModulo();
  await sistemaModuloStore.loadModulos(sistema.value.id);
};

watch(modulo.value, (val) => {
  if (val.nombre != null && val.nombre != "") {
    modulo.value.orden = modulos.value.length + 1;
  } else {
    modulo.value.orden = "";
  }
});

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  modulo.value.sistema_Id = sistema.value.id;
  if (modulo.value.id != null) {
    resp = await sistemaModuloStore.updateModulo(modulo.value);
  } else {
    resp = await sistemaModuloStore.createModulo(modulo.value);
  }

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    actualizarTabla();
    ResetModulo.value.resetValidation();
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>
