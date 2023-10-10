<template>
  <div class="row q-pa-lg">
    <div class="col">
      <q-table
        :rows="modulos"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        :pagination="pagination"
        visible-columns="nombre,siglas,orden,id"
        row-key="id"
        rows-per-page-label="Modulos por página"
        no-data-label="No hay modulos registrados al sistema"
      >
        <template v-slot:top-left>
          <label class="text-h6"> Modulos registrados</label>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name === 'id'">
                <q-btn
                  flat
                  round
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                >
                  <q-tooltip>Ver detalle</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="edit"
                  @click="editar(col.value)"
                >
                  <q-tooltip>Editar modulo</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="purple-ieen"
                  icon="delete"
                  @click="eliminar(col.value)"
                >
                  <q-tooltip>Eliminar modulo</q-tooltip>
                </q-btn>
              </div>
              <label v-else>{{ col.value }}</label>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                <strong>Descripción del modulo: </strong>
                {{ props.row.descripcion }}
                <br />
              </div>
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
import { useSistemasModulosStore } from "../../../store/sistemas_modulos_store";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);
const sistemaModuloStore = useSistemasModulosStore();
const { modulos, sistema } = storeToRefs(sistemaModuloStore);

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del modulo",
    field: "nombre",
    sortable: true,
  },
  {
    name: "siglas",
    align: "center",
    label: "Siglas del modulo",
    field: "siglas",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripción del modulo",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden de aparición",
    field: "orden",
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
  await sistemaModuloStore.loadModulo(id);
  $q.loading.hide();
};
const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar modulo",
    message: "¿Está seguro de eliminar el modulo?",
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
    const resp = await sistemaModuloStore.deleteModulo(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      sistemaModuloStore.loadModulos(sistema.value.id);
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
