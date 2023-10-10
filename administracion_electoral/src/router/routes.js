const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/areas",
        name: "areas",
        component: () => import("../modulos/areas/pages/IndexPage.vue"),
      },
      {
        path: "/oficinas",
        name: "oficinas",
        component: () => import("../modulos/oficinas/pages/IndexPage.vue"),
      },
      {
        path: "/puestos",
        name: "puestos",
        component: () => import("../modulos/puestos/pages/IndexPage.vue"),
      },
      {
        path: "/empleados",
        name: "empleados",
        component: () => import("../modulos/empleados/pages/IndexPage.vue"),
      },
      {
        path: "/sistemas_modulos",
        name: "sistemas_modulos",
        component: () =>
          import("../modulos/sistemas_modulos/pages/IndexPage.vue"),
      },
      {
        path: "/perfiles",
        name: "perfiles",
        component: () => import("../modulos/perfiles/pages/IndexPage.vue"),
      },
      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("../modulos/usuarios/pages/IndexPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
