import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUsuariosStore = defineStore("usuarios", {
  state: () => ({
    modal: false,
    modalModulo: false,
    listaIEEN: [],
    listaCiudadania: [],
    listSistemasAcceso: [],
    listSistemasModulos: [],
    listSistemaNuevos: [],
    listPerfilPermiso: [],
    usuario: {
      foto: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      municipio_Id: null,
      clave_Elector: null,
      sexo: null,
      sa: null,
      userName: null,
      email: null,
      phoneNumber: null,
      id: null,
    },
  }),
  actions: {
    initUsuario() {
      this.usuario.foto = null;
      this.usuario.nombres = null;
      this.usuario.apellido_Paterno = null;
      this.usuario.apellido_Materno = null;
      this.usuario.municipio_Id = null;
      this.usuario.clave_Elector = null;
      this.usuario.sexo = null;
      this.usuario.sa = null;
      this.usuario.userName = null;
      this.usuario.email = null;
      this.usuario.phoneNumber = null;
      this.usuario.id = null;
    },

    async loadUsuarios() {
      try {
        let resp = await api.get("/Usuarios");
        let { data } = resp.data;
        let listaUsuarios = data.map((usuario) => {
          return {
            id: usuario.id,
            empleado_Id: usuario.empleado_Id,
            nombre:
              usuario.nombres +
              " " +
              usuario.apellido_Paterno +
              " " +
              usuario.apellido_Materno,
            sexo: usuario.sexo,
            userName: usuario.userName,
          };
        });
        this.listaIEEN = listaUsuarios.filter((x) => x.empleado_Id != null);
        this.listaCiudadania = listaUsuarios.filter(
          (x) => x.empleado_Id == null
        );
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadUsuario(id) {
      try {
        let resp = await api.get(`/Usuarios/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            this.usuario.nombres = data.nombres;
            this.usuario.apellido_Paterno = data.apellido_Paterno;
            this.usuario.apellido_Materno = data.apellido_Materno;
            this.usuario.municipio_Id = data.municipio_Id;
            this.usuario.clave_Elector = data.clave_Elector;
            this.usuario.sexo = data.sexo;
            this.usuario.userName = data.userName;
            this.usuario.email = data.email;
            this.usuario.phoneNumber = data.phoneNumber;
            this.usuario.id = data.id;
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

    async loadSistemasUsuarios(id) {
      try {
        this.listSistemasAcceso = [];
        this.listSistemaNuevos = [];
        let resp = await api.get(`/SistemasUsuarios/ByUSuario/${id}`);
        let { data } = resp.data;
        let listaAcceso = data.map((acceso) => {
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
          return !data.some((a) => a.sistema_Id === item.id);
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPerfilesConPermiso(id) {
      try {
        let resp = await api.get("/SistemasPerfiles");
        let { data } = resp.data;
        let filtro = data.filter((x) => x.sistema_Id == id);
        console.log("Esto es filtro", filtro);
        let respP = await api.get("Perfiles");
        let perfil = respP.data.data;
        let perfilesActivos = perfil.filter((item) => {
          return filtro.some((a) => a.perfil_Id === item.id);
        });
        console.log(" Esto es perfil", perfil);
        console.log("Este es perfilesActivos", perfilesActivos);
        this.listPerfilPermiso = perfilesActivos.map((lstPerfil) => {
          return {
            label: lstPerfil.nombre,
            value: lstPerfil.id,
          };
        });
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async reenviarCorreoUsuario(id) {
      try {
        let resp = await api.get(`/Usuarios/ReenviarCorreo/${id}`);
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

    async createUsuario(usuario) {
      try {
        let resp = await api.post(`/Usuarios`, usuario, {
          headers: {
            "Content-Type": `"multipart/form-data";
              `,
          },
        });
        if (resp.status == 200) {
          const { success, data, password } = resp.data;
          if (success === true) {
            return { success, data, password };
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

    async createAccesoUsuario(usuario) {
      try {
        console.log("Esto es usuario", usuario);
        let filtroUsuario = usuario[0];
        console.log("Esto es filtroUsuario", filtroUsuario);
        let resp = await api.post("/SistemasUsuarios", filtroUsuario);

        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            let crearModulos = await this.createPermisoUsuario(
              filtroUsuario.perfil_Id,
              filtroUsuario.sistema_Id,
              1
            );
            let { success, data } = crearModulos;
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

    async createPermisoUsuario(permisos, sistema, tipo) {
      try {
        let resp = await api.get("/Modulos");
        let { data } = resp.data;
        let filtroModulos = data.filter((x) => x.sistema_Id == sistema);
        console.log("Este es el listado de modulos", filtroModulos);
        if (tipo == 1) {
          let respA = await api.get(
            `/AccesosModulosPerfiles/ByPerfil/${permisos}`
          );
          let accesoPerfil = respA.data.data;
          let accesosModulos = accesoPerfil.filter((item) => {
            return filtroModulos.some((a) => a.id === item.modulo_Id);
          });
          console.log("Estos son los modulos con acceso", accesosModulos);

          let respP = await api.get(
            `/PermisosModulosPerfiles/ByPerfil/${permisos}`
          );
          let modulosPermisos = respP.data.data;
          console.log("Estos son los permisos del modulo", modulosPermisos);
          let listadoPermisosModulo = modulosPermisos.filter((item) => {
            return accesosModulos.some((a) => a.modulo_Id == item.modulo_Id);
          });
          let bandera = 0;
          console.log(
            "Este es el listadoPermisoModulo,",
            listadoPermisosModulo
          );
          if (listadoPermisosModulo.length > 0) {
            for (let permiso of listadoPermisosModulo) {
              let reg = await api.post(`/PermisosModulosUsuarios`, {
                modulo_Id: permiso.modulo_Id,
                usuario_Id: this.usuario.id,
                registrar: permiso.registrar,
                actualizar: permiso.actualizar,
                eliminar: permiso.eliminar,
                leer: permiso.leer,
              });
              if (reg.status == 200) {
                let succe = reg.data.success;
                if (succe === true) {
                  bandera = bandera + 1;
                }
              }
            }
            if (bandera > 0) {
              if (bandera == listadoPermisosModulo.length) {
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
          } else {
            return { success: false, data: "Sistema sin modulos registrados" };
          }
        } else {
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadSistemasUsuarios(id) {
      try {
        let resp = await api.get(`/SistemasUsuarios/ByUSuario/${id}`);
        let { data } = resp.data;
        let conAcceso = data.filter((x) => x.accede == true);
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
    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalModulos(valor) {
      this.modalModulo = valor;
    },
  },
});
