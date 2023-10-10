<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1000px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          Acceso a sistemas del usuario
          {{
            usuario.nombres +
            " " +
            usuario.apellido_Paterno +
            " " +
            usuario.apellido_Materno
          }}
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
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-list bordered padding>
              <q-item-label header>Sistemas sin acceso</q-item-label>

              <q-item v-for="item in listSistemaNuevos" :key="item.id" v-ripple>
                <q-item-section>
                  <q-item-label>{{ item.nombre }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    color="purple-ieen"
                    icon="check"
                    @click="cargarPerfil(item.id, item.nombre)"
                  >
                    <q-tooltip>Dar acceso</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <TablaSistemas />
    </q-card>
    <q-dialog v-model="dialogPerfil" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">
            Perfil que tendra dentro de {{ nombreEncabezado }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="perfil_Id"
            label="Perfiles con acceso al sistema"
            :options="listPerfilPermiso"
            :rules="[(val) => !!val || 'El perfil es requerido']"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-accent">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Guardar" @click="acceso()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import TablaSistemas from "../components/TablaSistemas.vue";
//import { useAuthStore } from "../../../stores/auth_store";
import { useUsuariosStore } from "../../../store/usuarios_store";

const $q = useQuasar();
const usuariosStore = useUsuariosStore();
const dialogPerfil = ref(false);
const perfil_Id = ref();
const sistema_Id = ref();
let nombreEncabezado = "";

//const authStore = useAuthStore();

const { modal, usuario, listSistemaNuevos, listPerfilPermiso } =
  storeToRefs(usuariosStore);

onBeforeMount(() => {});

const actualizarModal = (valor) => {
  usuariosStore.actualizarModal(valor);
};

const cargarPerfil = async (id, nombre) => {
  await usuariosStore.loadPerfilesConPermiso(id);
  sistema_Id.value = id;
  nombreEncabezado = nombre;
  dialogPerfil.value = true;
};

const acceso = async () => {
  let accesoUsuario = [
    {
      sistema_Id: sistema_Id.value,
      perfil_Id: perfil_Id.value.value,
      usuario_Id: usuario.value.id,
      accede: true,
    },
  ];
  $q.dialog({
    title: "",
    message:
      "¿Está seguro de permitir el acceso al sistema con ese perfil? Los permisos de este perfil se cargaran al usuario",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, Permitir",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await usuariosStore.createAccesoUsuario(accesoUsuario);
    if (resp.success) {
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      dialogPerfil.value = false;
      usuariosStore.loadSistemasUsuarios(usuario.value.id);
    } else {
      $q.notify({
        type: "negative",
        message: resp.data,
      });
      //loading.value = false;
    }
    $q.loading.hide();
  });

  //----------------------------------------------------------------*/
};
</script>
