import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useOficinasStore = defineStore("oficina", {
  state: () => ({
    modal: false,
    oficinas: [],
    listOficina: [],
    oficina: {
      id: null,
      municipio_Id: null,
      muicipio: null,
      nombre: null,
      ople: false,
      oplE_String: null,
      fecha_Registro: null,
    },
  }),

  actions: {
    initOficina() {
      this.oficina.id = null;
      this.oficina.municipio_Id = null;
      this.oficina.muicipio = null;
      this.oficina.nombre = null;
      this.oficina.ople = false;
      this.oficina.oplE_String = null;
      this.oficina.fecha_Registro = null;
    },

    async loadOficinas() {
      try {
        let resp = await api.get("/Oficinas");
        let { data } = resp.data;
        let listaOficinas = data.map((oficina) => {
          return {
            id: oficina.id,
            municipio_Id: oficina.municipio_Id,
            muicipio: oficina.muicipio,
            nombre: oficina.nombre,
            ople: oficina.ople,
            oplE_String: oficina.oplE_String,
            fecha_Registro: oficina.fecha_Registro,
          };
        });
        this.oficinas = listaOficinas;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadOficina(id) {
      try {
        let resp = await api.get(`/Oficinas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          console.log("Esto es resp", data);
          if (success === true) {
            this.oficina.id = data.id;
            this.oficina.municipio_Id = data.municipio_Id;
            this.oficina.muicipio = data.muicipio;
            this.oficina.nombre = data.nombre;
            this.oficina.ople = data.ople;
            this.oficina.oplE_String = data.oplE_String;
            this.oficina.fecha_Registro = data.fecha_Registro;

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
    async loadOficinasList() {
      try {
        let resp = await api.get("/Oficinas/GetLista");
        let { data } = resp.data;
        let listaOficinas = data.map((oficina) => {
          return {
            label: oficina.label,
            value: oficina.value,
          };
        });
        this.listOficina = listaOficinas;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createOficina(oficina) {
      try {
        let resp = await api.post("/Oficinas", oficina);
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

    async updateOficina(oficina) {
      try {
        let resp = await api.put(`/Oficinas/${oficina.id}`, oficina);
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
    async deleteOficina(id) {
      try {
        const resp = await api.delete(`/Oficinas/${id}`);
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
