import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSistemasModulosStore = defineStore("sistemas_modulos", {
  state: () => ({
    modal: false,
    modalModulo: false,
    sistema: {
      id: null,
      nombre: null,
      siglas: null,
      descripcion: null,
      logo: null,
      url: null,
      version: null,
      correo: null,
      contrasena: null,
      puerto: null,
      smtp: null,
    },
    modulo: {
      id: null,
      orden: null,
      sistema_Id: null,
      nombre: null,
      siglas: null,
      descripcion: null,
    },
    sistemas: [],
    modulos: [],
    modulosAcceso: [],
  }),
  actions: {
    initSistema() {
      this.sistema.id = null;
      this.sistema.nombre = null;
      this.sistema.siglas = null;
      this.sistema.descripcion = null;
      this.sistema.logo = null;
      this.sistema.url = null;
      this.sistema.version = null;
      this.sistema.correo = null;
      this.sistema.contrasena = null;
      this.sistema.puerto = null;
      this.sistema.smtp = null;
    },
    initModulo() {
      this.modulo.id = null;
      this.modulo.orden = null;
      this.modulo.sistema_Id = null;
      this.modulo.nombre = null;
      this.modulo.siglas = null;
      this.modulo.descripcion = null;
    },

    async loadSistemas() {
      try {
        let resp = await api.get("/Sistemas");
        let { data } = resp.data;
        let listaSistemas = data.map((sistema) => {
          return {
            id: sistema.id,
            nombre: sistema.siglas + " - " + sistema.nombre,
            url: sistema.url,
            correo: sistema.correo,
          };
        });
        this.sistemas = listaSistemas;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadSistema(id) {
      try {
        let resp = await api.get(`/Sistemas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            this.sistema.id = data.id;
            this.sistema.nombre = data.nombre;
            this.sistema.siglas = data.siglas;
            this.sistema.descripcion = data.descripcion;
            this.sistema.logo = data.logo;
            this.sistema.url = data.url;
            this.sistema.version = data.version;
            this.sistema.correo = data.correo;
            this.sistema.contrasena = data.contrasena;
            this.sistema.puerto = data.puerto;
            this.sistema.smtp = data.smtp;
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

    async createSistema(sistema) {
      try {
        let resp = await api.post("/Sistemas", sistema, {
          headers: {
            "Content-Type": `"multipart/form-data";
              `,
          },
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
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async updateSistema(id, sistema) {
      try {
        let resp = await api.put(`/Sistemas/${id}`, sistema, {
          headers: {
            "Content-Type": `"multipart/form-data";
              `,
          },
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
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async deleteSistema(id) {
      try {
        const resp = await api.delete(`/Sistemas/${id}`);
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

    async loadModulos(id) {
      try {
        this.modulos = [];
        let resp = await api.get("/Modulos");
        let { data } = resp.data;
        let modulos = data.filter((x) => x.sistema_Id == id);
        let listaModulos = modulos.map((modulo) => {
          return {
            id: modulo.id,
            nombre: modulo.nombre,
            siglas: modulo.siglas,
            descripcion: modulo.descripcion,
            orden: modulo.orden,
          };
        });
        this.modulos = listaModulos;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadModulo(id) {
      try {
        let resp = await api.get(`/Modulos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            this.modulo.id = data.id;
            this.modulo.orden = data.orden;
            this.modulo.sistema_Id = data.sistema_Id;
            this.modulo.nombre = data.nombre;
            this.modulo.siglas = data.siglas;
            this.modulo.descripcion = data.descripcion;
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

    async createModulo(modulo) {
      try {
        let resp = await api.post(`/Modulos/${modulo.sistema_Id}`, modulo);
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

    async updateModulo(modulo) {
      try {
        let resp = await api.put(`/Modulos/${modulo.id}`, modulo);
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

    async deleteModulo(id) {
      try {
        const resp = await api.delete(`/Modulos/${id}`);
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

    async loadModulosPerfiles(id, perfil) {
      try {
        this.modulos = [];
        this.modulosAcceso = [];
        let resp = await api.get("/Modulos");
        let { data } = resp.data;
        let modulos = data.filter((x) => x.sistema_Id == id);
        let listaModulos = modulos.map((modulo) => {
          return {
            modulo_Id: modulo.id,
            nombre: modulo.nombre,
            sistema_Id: modulo.sistema_Id,
            perfil_Id: perfil,
            accede: false,
            registrar: false,
            actualizar: false,
            eliminar: false,
            leer: false,
          };
        });
        let respP = await api.get(
          `/PermisosModulosPerfiles/ByPerfil/${perfil}`
        );
        let permisos = respP.data.data;
        let respM = await api.get(`/AccesosModulosPerfiles/ByPerfil/${perfil}`);
        let listadoAccesosPerfil = respM.data.data;
        let listaPermisos = permisos.map((permiso) => {
          let accesoModulo = listadoAccesosPerfil.find(
            (x) => x.modulo_Id == permiso.modulo_Id
          );
          return {
            id: permiso.id,
            acceso_Id: accesoModulo.id,
            modulo_Id: permiso.modulo_Id,
            perfil_Id: permiso.perfil_Id,
            accede: accesoModulo.accede,
            registrar: permiso.registrar,
            actualizar: permiso.actualizar,
            eliminar: permiso.eliminar,
            leer: permiso.leer,
            modulo: permiso.modulo,
            perfil: permiso.perfil,
          };
        });
        let accesoModulos = listadoAccesosPerfil.map((lstModulos) => {
          return {
            modulo_Id: lstModulos.modulo_Id,
            modulo: lstModulos.modulo,
            perfil_Id: lstModulos.perfil_Id,
            accede: lstModulos.accede,
          };
        });
        this.modulos = listaModulos.filter((item) => {
          return !accesoModulos.some((a) => a.modulo_Id === item.modulo_Id);
        });
        this.modulosAcceso = listaPermisos.filter((item) => {
          return listaModulos.some((a) => a.modulo_Id === item.modulo_Id);
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadModulosUsuarios(id, usuario) {
      try {
        this.modulos = [];
        this.modulosAcceso = [];
        let resp = await api.get("/Modulos");
        let { data } = resp.data;
        let modulos = data.filter((x) => x.sistema_Id == id);
        let listaModulos = modulos.map((modulo) => {
          return {
            modulo_Id: modulo.id,
            nombre: modulo.nombre,
            sistema_Id: modulo.sistema_Id,
            usuario_Id: usuario,
            accede: false,
            registrar: false,
            actualizar: false,
            eliminar: false,
            leer: false,
          };
        });
        let respP = await api.get(
          `/PermisosModulosUsuarios/Bysuario/${usuario}`
        );
        let permisos = respP.data.data;
        /*let respM = await api.get(`/AccesosModulosPerfiles/ByPerfil/${perfil}`);
        let listadoAccesosPerfil = respM.data.data;
        let listaPermisos = permisos.map((permiso) => {
          let accesoModulo = listadoAccesosPerfil.find(
            (x) => x.modulo_Id == permiso.modulo_Id
          );
          return {
            id: permiso.id,
            acceso_Id: accesoModulo.id,
            modulo_Id: permiso.modulo_Id,
            perfil_Id: permiso.perfil_Id,
            accede: accesoModulo.accede,
            registrar: permiso.registrar,
            actualizar: permiso.actualizar,
            eliminar: permiso.eliminar,
            leer: permiso.leer,
            modulo: permiso.modulo,
            perfil: permiso.perfil,
          };
        });*/

        this.modulos = listaModulos.filter((item) => {
          return !permisos.some((a) => a.modulo_Id === item.modulo_Id);
        });
        this.modulosAcceso = listaPermisos.filter((item) => {
          return listaModulos.some((a) => a.modulo_Id === item.modulo_Id);
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createPermisoModuloPerfil(permisos) {
      try {
        let bandera = 0;
        for (let permiso of permisos) {
          let resp = await api.post(`/AccesosModulosPerfiles/`, {
            modulo_Id: permiso.modulo_Id,
            perfil_Id: permiso.perfil_Id,
            accede: permiso.accede,
            eliminado: false,
          });
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success === true) {
              let respP = await api.post(`/PermisosModulosPerfiles`, {
                modulo_Id: permiso.modulo_Id,
                perfil_Id: permiso.perfil_Id,
                registrar: permiso.registrar,
                actualizar: permiso.actualizar,
                eliminar: permiso.eliminar,
                leer: permiso.leer,
              });
              if (respP.status == 200) {
                let succe = respP.data.success;
                if (succe === true) {
                  bandera = bandera + 1;
                }
              }
            }
          }
        }
        if (bandera > 0) {
          if (bandera == permisos.length) {
            return { success: true, data: "Todos los permisos guardados" };
          } else {
            return {
              success: false,
              data: "Algunos permisos no fueron guardados",
            };
          }
        } else {
          return { success: false, data: "Error al guardar los permisos" };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async updatePermisoModuloPerfil(permiso) {
      try {
        let resp = await api.put(
          `/AccesosModulosPerfiles/${permiso.acceso_Id}`,
          {
            modulo_Id: permiso.modulo_Id,
            perfil_Id: permiso.perfil_Id,
            accede: permiso.accede,
            eliminado: false,
          }
        );
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            let respP = await api.put(`/PermisosModulosPerfiles${permiso.id}`, {
              modulo_Id: permiso.modulo_Id,
              perfil_Id: permiso.perfil_Id,
              registrar: permiso.registrar,
              actualizar: permiso.actualizar,
              eliminar: permiso.eliminar,
              leer: permiso.leer,
            });
            if (respP.status == 200) {
              let succe = respP.data.success;
              if (succe === true) {
                return { success: true, data: "Cambios realizados con exíto" };
              } else {
                return {
                  success: false,
                  data: "Error al actualizar datos",
                };
              }
            } else {
              return {
                success: false,
                data: "Error al actualizar datos",
              };
            }
          }
        }
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async deletePermisoModuloPerfil(permiso) {
      try {
        let resp = await api.delete(
          `/AccesosModulosPerfiles/${permiso.acceso_Id}`
        );
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            let respP = await api.delete(
              `/PermisosModulosPerfiles/${permiso.id}`
            );
            if (respP.status == 200) {
              let succe = respP.data.success;
              if (succe === true) {
                return { success: true, data: "Permiso eliminado con exíto" };
              } else {
                return {
                  success: false,
                  data: "Error al eliminar datos datos",
                };
              }
            }
          } else {
            return {
              success: false,
              data: "Error al eliminar datos datos",
            };
          }
        }
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
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
    actualizarModalModulo(valor) {
      this.modalModulo = valor;
    },
  },
});
