import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useEmpleadoStore = defineStore("empleado", {
  state: () => ({
    modal: false,
    empleados: [],
    listEmpleado: [],
    empleado: {
      id: null,
      estatus: null,
      area_Id: null,
      area: null,
      puesto_Id: null,
      puesto: null,
      oficina_Id: null,
      oficina: null,
      nombre_Completo: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      correo_1: null,
      correo_2: null,
      telefono_1: null,
      rfc: null,
      curp: null,
      activo: false,
      sexo: null,
      fecha_Registro: null,
    },
  }),

  actions: {
    initEmpleado() {
      this.empleado.id = null;
      this.empleado.estatus = null;
      this.empleado.area_Id = null;
      this.empleado.area = null;
      this.empleado.puesto_Id = null;
      this.empleado.puesto = null;
      this.empleado.oficina_Id = null;
      this.empleado.oficina = null;
      this.empleado.nombre_Completo = null;
      this.empleado.nombres = null;
      this.empleado.apellido_Paterno = null;
      this.empleado.apellido_Materno = null;
      this.empleado.correo_1 = null;
      this.empleado.correo_2 = null;
      this.empleado.telefono_1 = null;
      this.empleado.rfc = null;
      this.empleado.curp = null;
      this.empleado.activo = false;
      this.empleado.sexo = null;
      this.empleado.fecha_Registro = null;
    },

    async loadEmpleados() {
      try {
        let resp = await api.get("/Empleados");
        let { data } = resp.data;
        let listaEmpleados = data.map((empleado) => {
          return {
            id: empleado.id,
            nombre_Completo: empleado.nombre_Completo,
            area: empleado.area,
            puesto: empleado.puesto,
          };
        });
        this.empleados = listaEmpleados;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadEmpleado(id) {
      try {
        let resp = await api.get(`/Empleados/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            this.empleado.id = data[0].id;
            this.empleado.estatus = data[0].estatus;
            this.empleado.area_Id = data[0].area_Id;
            this.empleado.area = data[0].area;
            this.empleado.puesto_Id = data[0].puesto_Id;
            this.empleado.puesto = data[0].puesto;
            this.empleado.oficina_Id = data[0].oficina_Id;
            this.empleado.oficina = data[0].oficina;
            this.empleado.nombre_Completo = data[0].nombre_Completo;
            this.empleado.nombres = data[0].nombres;
            this.empleado.apellido_Paterno = data[0].apellido_Paterno;
            this.empleado.apellido_Materno = data[0].apellido_Materno;
            this.empleado.correo_1 = data[0].correo_1;
            this.empleado.correo_2 = data[0].correo_2;
            this.empleado.telefono_1 = data[0].telefono_1;
            this.empleado.rfc = data[0].rfc;
            this.empleado.curp = data[0].curp;
            this.empleado.activo = data[0].activo;
            this.empleado.sexo = data[0].sexo;
            this.empleado.fecha_Registro = data[0].fecha_Registro;
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
    async loadEmpleadosList() {
      try {
        let resp = await api.get("/Empleados");
        let { data } = resp.data;
        let listaEmpleados = data.map((empleado) => {
          return {
            label: empleado.nombre_Completo,
            value: empleado.id,
          };
        });
        this.listEmpleado = listaEmpleados;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createEmpleado(empleado) {
      try {
        let resp = await api.post("/Empleados", empleado);
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

    async updateEmpleado(empleado) {
      try {
        let resp = await api.put(`/Empleados/${empleado.id}`, empleado);
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
    async deleteEmpleado(id) {
      try {
        const resp = await api.delete(`/Empleados/${id}`);
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
  /*  "area_Id": 0,
  "puesto_Id": 0,
  "oficina_Id": 0,
  "nombres": "string",
  "apellido_Paterno": "string",
  "apellido_Materno": "string",
  "correo_1": "string",
  "correo_2": "string",
  "telefono_1": "string",
  "rfc": "string",
  "curp": "string",
  "activo": true,
  "sexo": "string"*/
});
