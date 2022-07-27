import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const authStore = useUserStore();
    const router = useRouter();
    // token memory
    if (authStore.token) {
      return next();
    }

    if (requiredAuth || sessionStorage.getItem("user")) {
      sessionStorage.getItem("user")
        ? await authStore.refreshToken()
        : authStore.refreshToken();

      if (authStore.token) {
        return next();
      } else {
        return next("/login");
      }
    }
    return next();
  });

  return Router;
});
