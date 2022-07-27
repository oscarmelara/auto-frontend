import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const messageApi = ref(null);

  const login = async (values) => {
    const { username, password } = values;
    try {
      const res = await api.post("/login", {
        username: username,
        password: password,
      });
      token.value = res.data.token;
      sessionStorage.setItem("user", true);
      Notify.create({
        message: "Bienvenido",
      });
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        Notify.create({
          type: "negative",
          message: err.response.data.message,
        });
      }
    }
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/refresh");
      token.value = res.data.token;
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("user");
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetData();
      sessionStorage.removeItem("user");
    }
  };

  const resetData = () => {
    token.value = null;
  };

  return {
    token,
    login,
    refreshToken,
    logout,
  };
});
