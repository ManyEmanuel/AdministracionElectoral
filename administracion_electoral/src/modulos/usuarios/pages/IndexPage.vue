<template>
  <q-page padding>
    <!--<div class="row">
      <div class="col">
        <div class="text-right q-pa-md items-start q-gutter-md">
          <q-btn
            type="button"
            class="q-ma-sm"
            color="purple"
            icon-right="add_circle_outline"
            label="Generar"
            @click="Generar()"
          />
        </div>
      </div>
    </div>-->
    <div class="col-12">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Usuarios" icon="person" />
      </q-breadcrumbs>
    </div>
    <br />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        active-color="purple-ieen"
        indicator-color="purple-ieen"
        align="justify"
        narrow-indicator
      >
        <q-tab name="ciudadanos" label="Ciudadanos con usuario" />
        <q-tab name="empleados" label="Empleados con usuario" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="ciudadanos">
          <div v-if="tab == 'ciudadanos'">
            <TablaCiudadania />
          </div>
        </q-tab-panel>

        <q-tab-panel name="empleados">
          <div v-if="tab == 'empleados'">
            <TablaIEEN />
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <ModalSistemas />
    </q-card>
  </q-page>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

import { useUsuariosStore } from "../../../store/usuarios_store";
import TablaCiudadania from "../components/TablaCiudadania.vue";
import TablaIEEN from "../components/TablaIEEN.vue";
import ModalSistemas from "../components/ModalSistemas.vue";
import Recibo_hotel from "../../../helpers/Recibo";

const $q = useQuasar();

const tab = ref("ciudadanos");
const usuariosStore = useUsuariosStore();
//const datosCiudadanosStore = useDatosCiudadanosStore();
//const { vacante } = storeToRefs(usuariosStore);

onMounted(() => {
  cargaInformacion();
});

const cargaInformacion = async () => {
  usuariosStore.loadUsuarios();
};

const Generar = async () => {
  Recibo_hotel();
};

/*const descargar = async (id, nombre) => {
  $q.loading.show();
  await registroVacanteStore.loadAvanceVacanteExcel(route.query.id);
  //const adjunto_item = adjuntos.value.find((x) => x.id == id);
  const link = document.createElement("a");
  link.href = registroVacanteStore.documentoExcel;
  link.setAttribute("download", "BD-" + vacante.value.nombre);
  document.body.appendChild(link);
  link.click();
  $q.loading.hide();
};*/
</script>
