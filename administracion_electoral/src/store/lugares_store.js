import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useLugaresStore = defineStore("lugares", {
  state: () => ({
    listaMunicipios: [],
    listaEstados: [],
  }),

  actions: {
    async loadEstados() {
      try {
        let resp = await api.get("/Estados/GetLista");
        let { data } = resp.data;
        let listaEstado = data.map((estado) => {
          return {
            label: estado.label,
            value: estado.value,
          };
        });
        this.listaEstados = listaEstado;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async loadMunicipioEstado(id) {
      this.listaMunicipios = [];
      try {
        let resp = await api.get("/Municipios");
        let { data } = resp.data;
        let listMunicipio = data.map((municipio) => {
          return {
            label: municipio.nombre,
            value: municipio.id,
            estado_Id: municipio.estado_Id,
          };
        });
        this.listaMunicipios = listMunicipio.filter((x) => x.estado_Id == id);
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async loadMunicipioNayarit() {
      this.listaMunicipios = [];
      try {
        let resp = await api.get("/Municipios");
        let { data } = resp.data;
        let listMunicipio = data.map((municipio) => {
          return {
            label: municipio.nombre,
            value: municipio.id,
            estado_Id: municipio.estado_Id,
          };
        });
        this.listaMunicipios = listMunicipio.filter((x) => x.estado_Id == 18);
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
  },
});
