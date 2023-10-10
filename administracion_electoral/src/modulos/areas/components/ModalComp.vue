<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Registro de área</div>
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
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="area.siglas"
              label="Siglas del área"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas son requeridas']"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="area.nombre"
              label="Nombre del area"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
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
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
import { useAreasStore } from "../../../store/areas_store";

const $q = useQuasar();
const AreaStore = useAreasStore();
//const authStore = useAuthStore();

const { area, modal } = storeToRefs(AreaStore);
const actualizarModal = (valor) => {
  AreaStore.actualizarModal(valor);
  AreaStore.initArea();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (area.value.id != null) {
    resp = await AreaStore.updateArea(area.value);
  } else {
    resp = await AreaStore.createArea(area.value);
  }

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    AreaStore.loadAreas();
    actualizarModal(false);
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
    //loading.value = false;
  }
  $q.loading.hide();
};
</script>
