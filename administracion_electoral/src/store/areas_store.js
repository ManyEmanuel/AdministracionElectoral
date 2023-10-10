import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAreasStore = defineStore("areas", {
  state: () => ({
    modal: false,
    areas: [],
    listAreas: [],
    area: {
      id: null,
      siglas: null,
      nombre: null,
      fecha_Registro: null,
    },
  }),

  actions: {
    initArea() {
      this.area.id = null;
      this.area.siglas = null;
      this.area.nombre = null;
      this.area.fecha_Registro = null;
    },

    async loadAreas() {
      try {
        let resp = await api.get("/Areas");
        let { data } = resp.data;
        let listaAreas = data.map((area) => {
          return {
            id: area.id,
            siglas: area.siglas,
            nombre: area.nombre,
            fecha_Registro: area.fecha_Registro,
          };
        });
        this.areas = listaAreas;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadArea(id) {
      try {
        let resp = await api.get(`/Areas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          console.log("EStas son las areas", data);
          if (success === true) {
            this.area.id = data.id;
            this.area.siglas = data.siglas;
            this.area.nombre = data.nombre;
            this.area.fecha_Registro = data.fecha_Registro;

            return { success };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async loadAreasList() {
      try {
        let resp = await api.get("/Areas/GetLista");
        let { data } = resp.data;
        let listaArea = data.map((area) => {
          return {
            label: area.label,
            value: area.value,
          };
        });
        this.listAreas = listaArea;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createArea(area) {
      try {
        let resp = await api.post("/Areas", area);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async updateArea(area) {
      try {
        let resp = await api.put(`/Areas/${area.id}`, area);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async deleteArea(id) {
      try {
        const resp = await api.delete(`/Areas/${id}`);
        if (resp.status == 200) {
          let { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrio un error, intentelo de nuevo",
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    actualizarModal(valor) {
      this.modal = valor;
    },
  },
});
