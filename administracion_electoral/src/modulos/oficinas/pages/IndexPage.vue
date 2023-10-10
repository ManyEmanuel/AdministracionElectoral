<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el label="Oficinas" icon="location_on" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-right q-pa-md items-start q-gutter-md">
          <q-btn
            type="button"
            class="q-ma-sm"
            color="purple"
            icon-right="add_circle_outline"
            label="Nuevo"
            @click="actualizarModal(true)"
          />
        </div>
      </div>
    </div>
    <TablaComp />
    <ModalComp />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
//v-if="modulo == null ? false : modulo.registrar"
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useOficinasStore } from "../../../store/oficina_store";
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";

const $q = useQuasar();
//const authStore = useAuthStore();
const oficinaStore = useOficinasStore();
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
  oficinaStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>
