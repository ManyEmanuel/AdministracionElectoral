import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePerfilesStore = defineStore("perfiles", {
  state: () => ({
    modal: false,
    modalModulo: false,
    listPerfiles: [],
    listSistemasAcceso: [],
    listSistemasModulos: [],
    listSistemaNuevos: [],
    perfil: {
      id: null,
      nombre: null,
    },
  }),
  actions: {
    initPerfil() {
      this.perfil.id = null;
      this.perfil.nombre = null;
    },
    async loadPerfiles() {
      try {
        let resp = await api.get("/Perfiles");
        let { data } = resp.data;
        let listaPerfiles = data.map((perfil) => {
          return {
            id: perfil.id,
            nombre: perfil.nombre,
            descripcion: perfil.descripción,
          };
        });
        this.listPerfiles = listaPerfiles;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPerfil(id) {
      try {
        let resp = this.listPerfiles.find((x) => x.id == id);
        if (resp != undefined) {
          this.perfil.id = resp.id;
          this.perfil.nombre = resp.nombre;
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

    async loadSistemas(id) {
      try {
        let resp = await api.get("/SistemasPerfiles");
        let { data } = resp.data;
        let conAcceso = data.filter((x) => x.perfil_Id == id);
        let listaAcceso = conAcceso.map((acceso) => {
          return {
            id: acceso.id,
            sistema: acceso.sistema,
            accede: acceso.accede,
          };
        });
        this.listSistemasAcceso = listaAcceso;
        let respS = await api.get("/Sistemas/GetLista");
        let sistemas = respS.data.data.map((lstSistema) => {
          return {
            id: parseInt(lstSistema.value),
            nombre: lstSistema.label,
          };
        });
        this.listSistemaNuevos = sistemas.filter((item) => {
          return !conAcceso.some((a) => a.sistema_Id === item.id);
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadSistemasPerfil(id) {
      try {
        let resp = await api.get("/SistemasPerfiles");
        let { data } = resp.data;
        let conAcceso =
          data.filter((x) => x.perfil_Id == id) && x.accede == true;
        let listaAcceso = conAcceso.map((acceso) => {
          return {
            value: acceso.sistema_Id,
            label: acceso.sistema,
          };
        });
        this.listSistemasModulos = listaAcceso;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createAcceso(perfil, sistema) {
      try {
        let resp = await api.post("/SistemasPerfiles", {
          sistema_Id: sistema,
          perfil_Id: perfil,
          accede: true,
        });
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
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async deleteAcceso(id) {
      try {
        const resp = await api.delete(`/SistemasPerfiles/${id}`);
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
    actualizarModalModulos(valor) {
      this.modalModulo = valor;
    },
  },
});
