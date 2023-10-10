<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Registro de oficina</div>
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
            <q-select
              v-model="municipio_Id"
              :options="listaMunicipios"
              label="Municipio de origen"
              lazy-rules
              :rules="[(val) => !!val || 'El municipio es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="oficina.nombre"
              label="Nombre del area"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
            <q-checkbox
              v-model="oficina.ople"
              label="Marque esta opción si la oficina es un Organismo Público Local Electoral (OPLE)"
              color="purple"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :true-value="true"
              :false-value="false"
              size="xl"
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
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
import { useOficinasStore } from "../../../store/oficina_store";
import { useLugaresStore } from "../../../store/lugares_store";

const $q = useQuasar();
const oficinaStore = useOficinasStore();
const lugarStore = useLugaresStore();
//const authStore = useAuthStore();

const { oficina, modal } = storeToRefs(oficinaStore);
const { listaMunicipios } = storeToRefs(lugarStore);
const municipio_Id = ref();
onBeforeMount(() => {
  lugarStore.loadMunicipioNayarit();
});

watch(oficina.value, (val) => {
  if (val.id != null) {
    cargarMunicipio(val);
  }
});

const cargarMunicipio = async (val) => {
  if (municipio_Id.value == null) {
    let municipioFiltrado = listaMunicipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    console.log("Este es el listrado del municipio", municipioFiltrado);
    municipio_Id.value = municipioFiltrado;
  }
};

const actualizarModal = (valor) => {
  oficinaStore.actualizarModal(valor);
  oficinaStore.initOficina();
  municipio_Id.value = null;
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  oficina.value.municipio_Id = municipio_Id.value.value;
  if (oficina.value.id != null) {
    resp = await oficinaStore.updateOficina(oficina.value);
  } else {
    resp = await oficinaStore.createOficina(oficina.value);
  }

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    oficinaStore.loadOficinas();
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
