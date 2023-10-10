import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePuestoStore = defineStore("puestos", {
  state: () => ({
    modal: false,
    puestos: [],
    listPuestos: [],
    puesto: {
      id: null,
      nombre: null,
      descripcion: null,
      fecha_Registro: null,
    },
  }),

  actions: {
    initPuesto() {
      this.puesto.id = null;
      this.puesto.nombre = null;
      this.puesto.descripcion = null;
      this.puesto.fecha_Registro = null;
    },

    async loadPuestos() {
      try {
        let resp = await api.get("/Puestos");
        let { data } = resp.data;
        let listaPuestos = data.map((puesto) => {
          return {
            id: puesto.id,
            descripcion: puesto.descripcion,
            nombre: puesto.nombre,
            fecha_Registro: puesto.fecha_Registro,
          };
        });
        this.puestos = listaPuestos;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPuesto(id) {
      try {
        let resp = await api.get(`/Puestos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            this.puesto.id = data.id;
            this.puesto.descripcion = data.descripcion;
            this.puesto.nombre = data.nombre;
            this.puesto.fecha_Registro = data.fecha_Registro;

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
    async loadPuestoList() {
      try {
        let resp = await api.get("/Puestos/GetLista");
        let { data } = resp.data;
        let listaPuesto = data.map((puesto) => {
          return {
            label: puesto.label,
            value: puesto.value,
          };
        });
        this.listPuestos = listaPuesto;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createPuesto(puesto) {
      try {
        let resp = await api.post("/Puestos", puesto);
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

    async updatePuesto(puesto) {
      try {
        let resp = await api.put(`/Puestos/${puesto.id}`, puesto);
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
    async deletePuesto(id) {
      try {
        const resp = await api.delete(`/Puestos/${id}`);
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
