<template>
  <div class="row q-pa-md">
    <div class="col">
      <q-table
        :rows="listSistemasAcceso"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        rows-per-page-label="Accesos por pagina"
        no-data-label="No hay registros"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name === 'id'">
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="delete"
                  @click="eliminar(col.value, props.row.sistema)"
                >
                  <q-tooltip>Quitar acceso</q-tooltip>
                </q-btn>
              </div>
              <div v-else-if="col.name === 'accede'">
                <label v-if="col.value == true">Si</label>
                <label v-else>No</label>
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
import { usePerfilesStore } from "../../../store/perfiles_store";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);

const perfilesStore = usePerfilesStore();

const { listSistemaNuevos, listSistemasAcceso, perfil } =
  storeToRefs(perfilesStore);

onBeforeMount(() => {});

const columns = [
  {
    name: "sistema",
    align: "center",
    label: "Sistema",
    field: "sistema",
    sortable: true,
  },
  {
    name: "accede",
    align: "center",
    label: "Con acceso",
    field: "accede",
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

/*const editar = async (id) => {
  $q.loading.show();
  await empleadoStore.loadEmpleado(id);
  // await lugarStore.loadMunicipioNayarit();
  empleadoStore.actualizarModal(true);
  $q.loading.hide();
};*/
const eliminar = async (id, nombre) => {
  $q.dialog({
    title: "Eliminar acceso",
    message: "¿Está seguro de eliminar el acceso al sistema " + nombre + " ?",
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
    const resp = await perfilesStore.deleteAcceso(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      perfilesStore.loadSistemas(perfil.value.id);
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
