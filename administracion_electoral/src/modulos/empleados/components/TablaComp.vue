<template>
  <div class="row">
    <div class="col">
      <q-table
        :rows="empleados"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        rows-per-page-label="Filas por pagina"
        no-data-label="No hay registros"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar.."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name === 'id'">
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="edit"
                  @click="editar(col.value)"
                >
                  <q-tooltip>Editar empleado</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="delete"
                  @click="eliminar(col.value)"
                >
                  <q-tooltip>Eliminar empleado</q-tooltip>
                </q-btn>
              </div>
              <label v-else>{{ col.value }}</label>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { onBeforeMount, ref } from "vue";
//import { useAuthStore } from "../../../stores/auth_store";
import { useEmpleadoStore } from "../../../store/empleados_store.js";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);

const empleadoStore = useEmpleadoStore();

const { empleados } = storeToRefs(empleadoStore);

onBeforeMount(() => {
  empleadoStore.loadEmpleados();
});

const columns = [
  {
    name: "nombre_Completo",
    align: "center",
    label: "Nombre del empleado",
    field: "nombre_Completo",
    sortable: true,
  },
  {
    name: "area",
    align: "center",
    label: "Área que pertenece",
    field: "area",
    sortable: true,
  },
  {
    name: "puesto",
    align: "center",
    label: "Puesto que desempeña",
    field: "puesto",
    sortable: true,
  },

  {
    name: "id",
    align: "center",
    label: "Opciones",
    field: "id",
    sortable: false,
  },
];

const pagination = ref({
  //********** */
  page: 1,
  rowsPerPage: 25,
  sortBy: "name",
  descending: false,
});

const filter = ref("");

const editar = async (id) => {
  $q.loading.show();
  await empleadoStore.loadEmpleado(id);
  // await lugarStore.loadMunicipioNayarit();
  empleadoStore.actualizarModal(true);
  $q.loading.hide();
};
const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar empleado",
    message: "¿Está seguro de eliminar el empleado?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, eliminar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await empleadoStore.deleteEmpleado(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      empleadoStore.loadEmpleados();
    } else {
      $q.loading.hide();
      $q.notify({
        type: "negative",
        message: resp.data,
      });
    }
  });
};
</script>
