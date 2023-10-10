<template>
  <q-dialog
    v-model="modalModulo"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1000px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          Acceso a modulos del perfil {{ perfil.nombre }}
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-select
              v-model="sistema_Id"
              :options="listSistemasModulos"
              label="Sistemas al que se tiene acceso"
            >
            </q-select>
          </div>
        </div>
        <br />

        <br />
        <div class="row q-col-gutter-xs">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-list bordered class="rounded-borders">
              <q-item-label header
                >Modulos activos dentro del sistema</q-item-label
              >
              <q-item v-if="modulos.length == 0">
                <q-item-label> Sin modulos que asignar</q-item-label>
              </q-item>
              <div v-else>
                <q-item>
                  <q-checkbox
                    v-model="todos"
                    dense
                    :label="
                      todos == true ? 'Desactivar todo' : 'Seleccionar todo'
                    "
                    color="purple"
                  />
                </q-item>
                <q-item v-for="item in modulos" :key="item.id">
                  <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm">{{
                      item.nombre
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <div class="q-gutter-sm">
                      <q-checkbox
                        dense
                        v-model="item.accede"
                        label="Acceso"
                        color="purple"
                      />
                      <q-checkbox
                        :disable="!item.accede"
                        dense
                        v-model="item.registrar"
                        label="Registrar"
                        color="purple"
                      />
                      <q-checkbox
                        :disable="!item.accede"
                        dense
                        v-model="item.actualizar"
                        label="Actualizar"
                        color="purple"
                      />

                      <q-checkbox
                        :disable="!item.accede"
                        dense
                        v-model="item.eliminar"
                        label="Eliminar"
                        color="purple"
                      />
                      <q-checkbox
                        :disable="!item.accede"
                        dense
                        v-model="item.leer"
                        label="Leer"
                        color="purple"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </div>
              <q-space />
              <div v-if="modulos.length > 0" class="col-12 justify-end">
                <div class="text-right q-gutter-xs q-pa-sm">
                  <q-btn
                    label="Cancelar"
                    type="reset"
                    color="negative"
                    @click="actualizarModal(false)"
                  />
                  <q-btn
                    label="Guardar"
                    color="positive"
                    class="q-ml-sm"
                    @click="GuardarPermiso()"
                  />
                </div>
              </div>
            </q-list>
          </div>
          <q-space />
          <q-separator color="purple" style="width: 100%" />
          <br />
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-list bordered class="rounded-borders">
              <q-item-label header
                >Permisos asignados a los modulos</q-item-label
              >
              <q-item v-if="modulosAcceso.length == 0">
                <q-item-label> Sin permisos asignados</q-item-label>
              </q-item>

              <q-item v-else v-for="item in modulosAcceso" :key="item.id">
                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">{{ item.modulo }}</q-item-label>
                </q-item-section>

                <q-item-section top>
                  <div class="q-gutter-sm">
                    <q-checkbox
                      dense
                      v-model="item.accede"
                      label="Acceso"
                      color="purple"
                    />
                    <q-checkbox
                      dense
                      v-model="item.registrar"
                      label="Registrar"
                      color="purple"
                    />
                    <q-checkbox
                      dense
                      v-model="item.actualizar"
                      label="Actualizar"
                      color="purple"
                    />

                    <q-checkbox
                      dense
                      v-model="item.eliminar"
                      label="Eliminar"
                      color="purple"
                    />
                    <q-checkbox
                      dense
                      v-model="item.leer"
                      label="Leer"
                      color="purple"
                    />
                  </div>
                </q-item-section>

                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn
                      class="gt-xs"
                      size="16px"
                      flat
                      dense
                      round
                      icon="update"
                      @click="actualizarPermiso(item.id)"
                    />
                    <q-btn
                      class="gt-xs"
                      size="16px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="eliminarPermiso(item.id)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
//import { useAuthStore } from "../../../stores/auth_store";
import { usePerfilesStore } from "../../../store/perfiles_store";
import { useSistemasModulosStore } from "../../../store/sistemas_modulos_store";

const $q = useQuasar();
const perfilesStore = usePerfilesStore();
const sistemaModuloStore = useSistemasModulosStore();
const sistema_Id = ref();
const todos = ref(false);

//const authStore = useAuthStore();

const { modalModulo, perfil, listSistemasModulos } = storeToRefs(perfilesStore);
const { modulos, modulosAcceso } = storeToRefs(sistemaModuloStore);
onBeforeMount(() => {});

const actualizarModal = (valor) => {
  modulos.value = [];
  modulosAcceso.value = [];
  listSistemasModulos.value = [];
  sistema_Id.value = "";
  perfilesStore.actualizarModalModulos(valor);
};

watch(sistema_Id, (val) => {
  $q.loading.show();
  ModulosPerfiles(val.value);
  $q.loading.hide();
});

watch(todos, (val) => {
  let newArray = modulos.value.map((obj) => {
    obj.accede = val;
    obj.registrar = val;
    obj.actualizar = val;
    obj.eliminar = val;
    obj.leer = val;
    return obj;
  });
  modulos.value = newArray;
});

const ModulosPerfiles = async (id) => {
  await sistemaModuloStore.loadModulosPerfiles(id, perfil.value.id);
};
const GuardarPermiso = async () => {
  let resp = null;
  $q.loading.show();
  let permisos = modulos.value.filter((x) => x.accede == true);
  resp = await sistemaModuloStore.createPermisoModuloPerfil(permisos);
  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    ModulosPerfiles(sistema_Id.value.value);
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
    //loading.value = false;
  }
  $q.loading.hide();
};

const actualizarPermiso = async (id) => {
  let resp = null;
  $q.loading.show();
  let permiso = modulosAcceso.value.find((x) => x.id == id);
  resp = await sistemaModuloStore.updatePermisoModuloPerfil(permiso);
  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    ModulosPerfiles(sistema_Id.value.value);
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
    //loading.value = false;
  }
  $q.loading.hide();
};

const eliminarPermiso = async (id) => {
  let resp = null;
  $q.loading.show();
  let permiso = modulosAcceso.value.find((x) => x.id == id);
  resp = await sistemaModuloStore.deletePermisoModuloPerfil(permiso);
  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    ModulosPerfiles(sistema_Id.value.value);
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
    //loading.value = false;
  }
  $q.loading.hide();
};

/*const acceso = async (id) => {
  let resp = null;
  $q.loading.show();
  resp = await perfilesStore.createAcceso(perfil.value.id, id);
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
};*/
</script>
