<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1000px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          Acceso a sistemas del perfil {{ perfil.nombre }}
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
        <div class="row q-col-gutter-xs">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-list bordered padding>
              <q-item-label header>Sistemas sin acceso</q-item-label>

              <q-item v-for="item in listSistemaNuevos" :key="item.id" v-ripple>
                <q-item-section>
                  <q-item-label>{{ item.nombre }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    color="purple-ieen"
                    icon="check"
                    @click="acceso(item.id, item.nombre)"
                  >
                    <q-tooltip>Dar acceso</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <TablaSistemas />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import TablaSistemas from "../components/TablaSistemas.vue";
//import { useAuthStore } from "../../../stores/auth_store";
import { usePerfilesStore } from "../../../store/perfiles_store";

const $q = useQuasar();
const perfilesStore = usePerfilesStore();

//const authStore = useAuthStore();

const { modal, perfil, listSistemaNuevos } = storeToRefs(perfilesStore);

onBeforeMount(() => {});

const actualizarModal = (valor) => {
  perfilesStore.actualizarModal(valor);
};

const acceso = async (id, nombre) => {
  $q.dialog({
    title: "",
    message: "¿Está seguro de permitir el acceso al sistema " + nombre + " ?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, Permitir",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await perfilesStore.createAcceso(perfil.value.id, id);
    if (resp.success) {
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      perfilesStore.loadSistemas(perfil.value.id);
    } else {
      $q.notify({
        type: "negative",
        message: resp.data,
      });
      //loading.value = false;
    }
    $q.loading.hide();
  });

  //----------------------------------------------------------------
};
</script>
