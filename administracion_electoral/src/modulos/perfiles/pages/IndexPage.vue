<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el label="Perfiles" icon="assignment_ind" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>

    <br />
    <TablaComp />
    <ModalComp />
    <ModalModulo />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
//v-if="modulo == null ? false : modulo.registrar"
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { usePerfilesStore } from "../../../store/perfiles_store";
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";
import ModalModulo from "../components/ModalModulo.vue";

const $q = useQuasar();
//const authStore = useAuthStore();
const perfilesStore = usePerfilesStore();
//const { modulo } = storeToRefs(authStore);
//const siglas = "SI-CAT-BOD";
onBeforeMount(() => {
  //leerPermisos();
});

const leerPermisos = async () => {
  $q.loading.show();
  //await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const actualizarModal = (valor) => {
  $q.loading.show();
  //pasesStore.loadInformacionPase();
  puestoStore.actualizarModal(valor);
  $q.loading.hide();
};

const actualizarModalModulo = (valor) => {
  $q.loading.show();
  //pasesStore.loadInformacionPase();
  puestoStore.actualizarModalModulo(valor);
  $q.loading.hide();
};
</script>
