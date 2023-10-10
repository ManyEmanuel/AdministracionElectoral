<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Registro de empleado</div>
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
              v-model="oficina_Id"
              :options="listOficina"
              label="Oficina que pertenece"
              lazy-rules
              :rules="[(val) => !!val || 'La oficina es requerida']"
            >
            </q-select>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-select
              v-model="area_Id"
              :options="listAreas"
              label="Área que pertenece"
              lazy-rules
              :rules="[(val) => !!val || 'El área que pertenece es requerida']"
            >
            </q-select>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-select
              v-model="puesto_Id"
              :options="listPuestos"
              label="Puesto que ejerce"
              lazy-rules
              :rules="[(val) => !!val || 'El puesto es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.nombres"
              label="Nombre(s) del empleado"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.apellido_Paterno"
              label="Apellido paterno"
              autogrow
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.apellido_Materno"
              label="Apellido materno"
              autogrow
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.correo_1"
              label="Correo 1"
              autogrow
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.correo_2"
              label="Correo 2"
              autogrow
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="empleado.telefono_1"
              label="Telefono del empleado"
              autogrow
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input v-model="empleado.rfc" label="RFC" autogrow lazy-rules>
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input v-model="empleado.curp" label="CURP" autogrow lazy-rules>
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-select
              v-model="empleado.sexo"
              label="Género del empleado"
              :options="opcionesGenero"
              :rules="[(val) => !!val || 'El género es requerido']"
            ></q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center">
            <br />
            <q-checkbox
              v-model="empleado.activo"
              label="Activar empleado"
              color="purple"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :true-value="true"
              :false-value="false"
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
import { useEmpleadoStore } from "../../../store/empleados_store.js";
import { useAreasStore } from "../../../store/areas_store";
import { usePuestoStore } from "../../../store/puestos_store.js";

const $q = useQuasar();
const oficinaStore = useOficinasStore();
const empleadoStore = useEmpleadoStore();
const areaStore = useAreasStore();
const puestoStore = usePuestoStore();
const opcionesGenero = ref(["Femenino", "Masculino", "No binario"]);

//const authStore = useAuthStore();

const { listOficina } = storeToRefs(oficinaStore);
const { listAreas } = storeToRefs(areaStore);
const { listPuestos } = storeToRefs(puestoStore);
const { empleado, modal } = storeToRefs(empleadoStore);
const oficina_Id = ref();
const area_Id = ref();
const puesto_Id = ref();
onBeforeMount(() => {
  oficinaStore.loadOficinasList();
  areaStore.loadAreasList();
  puestoStore.loadPuestoList();
});

watch(empleado.value, (val) => {
  if (val.id != null) {
    console.log("Si entro al watch");
    cargarOficina(val);
    cargarArea(val);
    cargarPuesto(val);
  }
});

const cargarOficina = async (val) => {
  if (oficina_Id.value == null) {
    let oficinaFiltrado = listOficina.value.find(
      (x) => x.value == `${val.oficina_Id}`
    );
    oficina_Id.value = oficinaFiltrado;
  }
};
const cargarArea = async (val) => {
  if (area_Id.value == null) {
    let areaFiltrado = listAreas.value.find((x) => x.value == `${val.area_Id}`);
    area_Id.value = areaFiltrado;
  }
};
const cargarPuesto = async (val) => {
  if (puesto_Id.value == null) {
    let puestoFiltrado = listPuestos.value.find(
      (x) => x.value == `${val.puesto_Id}`
    );
    puesto_Id.value = puestoFiltrado;
  }
};

const actualizarModal = (valor) => {
  empleadoStore.actualizarModal(valor);
  empleadoStore.initEmpleado();
  oficina_Id.value = null;
  area_Id.value = null;
  puesto_Id.value = null;
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  empleado.value.oficina_Id = oficina_Id.value.value;
  empleado.value.area_Id = area_Id.value.value;
  empleado.value.puesto_Id = puesto_Id.value.value;
  empleado.value.sexo = "0";
  if (empleado.value.id != null) {
    resp = await empleadoStore.updateEmpleado(empleado.value);
  } else {
    resp = await empleadoStore.createEmpleado(empleado.value);
  }

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    empleadoStore.loadEmpleados();
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
