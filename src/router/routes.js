const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "registro-usuario",
        component: () => import("pages/RegisterUser.vue"),
      },
      {
        path: "autos",
        component: () => import("pages/AutoPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/registro-autos",
        component: () => import("pages/RegisterCar.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/actualizar-auto/:id",
        component: () => import("pages/UpdateCar.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
