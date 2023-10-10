<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-purple-6">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sistema de administración electoral </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            icon="logout"
            label="Cerrar sesión"
            @click="retorno()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered bg-gray>
      <div class="q-pa-sm q-gutter-sm flex flex-center" style="height: 120px">
        <q-avatar size="100px" class="overlapping">
          <img src="../assets/perfilieen.jpg" />
        </q-avatar>
      </div>

      <q-separator />
      <q-list>
        <q-expansion-item
          expand-separator
          icon="menu_book"
          label="Catálogos principales"
          class="label-title text-bold"
        >
          <q-item
            :to="{ name: 'areas' }"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section avatar>
              <q-icon name="apartment" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-purple label-title text-bold"
                >Áreas</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'oficinas' }"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section avatar>
              <q-icon name="location_on" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-purple label-title text-bold"
                >Oficinas</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'puestos' }"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section avatar>
              <q-icon name="person" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-purple label-title text-bold"
                >Puestos</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item :to="{ name: 'empleados' }">
          <q-item-section avatar>
            <q-icon name="badge" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-purple label-title text-bold"
              >Empleados</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'sistemas_modulos' }">
          <q-item-section avatar>
            <q-icon name="computer" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-purple label-title text-bold"
              >Sistemas</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'perfiles' }">
          <q-item-section avatar>
            <q-icon name="assignment_ind" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-purple label-title text-bold"
              >Perfiles</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'usuarios' }">
          <q-item-section avatar>
            <q-icon name="person" color="purple" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-purple label-title text-bold"
              >Usuarios</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal bordered class="bg-purple-6">
      <q-toolbar>
        <q-toolbar-title
          ><div>
            &#169; Unidad Técnica de Informática y Estadística
          </div></q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <q-page-sticky position="bottom-right" :offset="[20, 20]">
        <q-btn
          round
          :icon="$q.dark.mode == false ? 'mode_night' : 'sunny'"
          :color="$q.dark.mode == false ? 'black' : 'white'"
          :text-color="$q.dark.mode == false ? 'white' : 'black'"
          @click="
            $q.dark.mode == false ? $q.dark.set(true) : $q.dark.set(false),
              console.log('Esto es el valor', $q.dark.mode)
          "
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
//import { useDatosCiudadanosStore } from "../store/datos_ciudadanos_store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    //const datosCiudadanosStore = useDatosCiudadanosStore();
    const route = useRoute();
    const retorno = async () => {
      localStorage.clear();
      window.location = "http://sistema.ieenayarit.org:9371?return=false";
      //window.location = "http://localhost:8080?return=false";
    };
    const leftDrawerOpen = ref(false);
    // let { datos_personales } = storeToRefs(datosCiudadanosStore);
    onBeforeMount(async () => {
      if (route.query.tokenE) {
        localStorage.setItem("tokenE", route.query.tokenE);
      }

      if (route.query.userNameL) {
        localStorage.setItem("userNameL", route.query.userNameL);
      }
      //await datosCiudadanosStore.obtenerUsuario();
      //await datosCiudadanosStore.prellenadoDatos();

      // await loadMenu();
    });

    return {
      leftDrawerOpen,
      //datosCiudadanosStore,
      retorno,
      //datos_personales,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style></style>
