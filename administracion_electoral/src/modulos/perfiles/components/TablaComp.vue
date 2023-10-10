<template>
  <div class="row">
    <div class="col">
      <q-table
        :rows="listPerfiles"
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
                  icon="computer"
                  @click="VerSistemas(col.value)"
                >
                  <q-tooltip>Ver sistemas</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="view_module"
                  @click="VerModulos(col.value)"
                >
                  <q-tooltip>Ver modulos</q-tooltip>
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
import { usePerfilesStore } from "../../../store/perfiles_store";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);

const perfilesStore = usePerfilesStore();

const { listPerfiles } = storeToRefs(perfilesStore);

onBeforeMount(() => {
  perfilesStore.loadPerfiles();
});

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Perfil",
    field: "nombre",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripción",
    field: "descripcion",
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

const VerSistemas = async (id) => {
  $q.loading.show();
  await perfilesStore.loadPerfil(id);
  await perfilesStore.loadSistemas(id);
  perfilesStore.actualizarModal(true);
  $q.loading.hide();
};

const VerModulos = async (id) => {
  $q.loading.show();
  await perfilesStore.loadSistemasPerfil(id);
  await perfilesStore.loadPerfil(id);
  perfilesStore.actualizarModalModulos(true);
  $q.loading.hide();
};
/*
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
};*/
</script>
