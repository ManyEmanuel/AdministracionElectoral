<template>
  <div class="row">
    <div class="col">
      <q-table
        :rows="listaIEEN"
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
                  icon="mail"
                  @click="reenviar(col.value)"
                >
                  <q-tooltip
                    >Reenviar correo electronico de registro de
                    usuario</q-tooltip
                  >
                </q-btn>
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
import { useUsuariosStore } from "../../../store/usuarios_store";

const $q = useQuasar();
//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);
const usuariosStore = useUsuariosStore();
const { listaIEEN } = storeToRefs(usuariosStore);

/*onBeforeMount(() => {
  sistemaModuloStore.loadSistemas();
});*/

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del empleado",
    field: "nombre",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Genero",
    field: "sexo",
    sortable: true,
  },
  {
    name: "userName",
    align: "center",
    label: "Usuario en sistema",
    field: "userName",
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

const reenviar = async (id) => {
  $q.dialog({
    title: "Reenviar el correo",
    message:
      "¿Está seguro de reenviar el correo de clave de acceso al usuario?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, Reenviar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await usuariosStore.reenviarCorreoUsuario(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: "positive",
        message: resp.data,
      });
    } else {
      $q.loading.hide();
      $q.notify({
        type: "negative",
        message: resp.data,
      });
    }
  });
};
const VerSistemas = async (id) => {
  $q.loading.show();
  await usuariosStore.loadUsuario(id);
  await usuariosStore.loadSistemasUsuarios(id);
  usuariosStore.actualizarModal(true);
  $q.loading.hide();
};

const VerModulos = async (id) => {
  $q.loading.show();
  await usuariosStore.loadSistemasUsuarios(id);
  await usuariosStore.loadUsuario(id);
  usuariosStore.actualizarModalModulos(true);
  $q.loading.hide();
};
</script>
