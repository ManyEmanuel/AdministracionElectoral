<template>
  <div class="row">
    <div class="col">
      <q-table
        :rows="oficinas"
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
                  <q-tooltip>Editar área</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="delete"
                  @click="eliminar(col.value)"
                >
                  <q-tooltip>Eliminar area</q-tooltip>
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
import { useOficinasStore } from "../../../store/oficina_store";
import { useLugaresStore } from "../../../store/lugares_store";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);
const oficinaStore = useOficinasStore();
const lugarStore = useLugaresStore();
const { oficinas } = storeToRefs(oficinaStore);

onBeforeMount(() => {
  oficinaStore.loadOficinas();
});

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre de la oficina",
    field: "nombre",
    sortable: true,
  },
  {
    name: "oplE_String",
    align: "center",
    label: "Tipo de oficina",
    field: "oplE_String",
    sortable: true,
  },
  {
    name: "muicipio",
    align: "center",
    label: "Municipio de ubicación",
    field: "muicipio",
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
  await oficinaStore.loadOficina(id);
  await lugarStore.loadMunicipioNayarit();
  oficinaStore.actualizarModal(true);
  $q.loading.hide();
};
const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar oficina",
    message: "¿Está seguro de eliminar la oficina?",
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
    const resp = await oficinaStore.deleteOficina(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      oficinaStore.loadOficinas();
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
