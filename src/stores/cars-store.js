import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { Loading } from "quasar";

export const useCarsStore = defineStore("link", () => {
  const authStore = useUserStore();

  const carsList = ref([]);
  const car = ref({});

  const createCar = async (values) => {
    try {
      Loading.show();
      const res = await api({
        url: "/cars",
        method: "POST",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
        data: values,
      });
      carsList.value.push(res.data);
    } catch (error) {
      //   console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      Loading.hide();
    }
  };

  const getCars = async () => {
    try {
      Loading.show();
      const res = await api({
        url: "/cars",
        method: "GET",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
      });
      carsList.value = [...res.data];
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      Loading.hide();
    }
  };

  getCars();

  const removeCar = async (id) => {
    try {
      Loading.show();
      await api({
        url: `cars/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
      });
      carsList.value = carsList.value.filter((item) => item.id !== id);
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      Loading.hide();
    }
  };

  const getCarSingle = async (id) => {
    try {
      Loading.show();
      const res = await api({
        url: `cars/${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
      });
      car.value = res.data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      Loading.hide();
    }
  };

  const updateCar = async (id, values) => {
    try {
      Loading.show();
      const res = await api({
        url: `cars/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
        data: values,
      });
      getCars();
      console.log(res.data);
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      Loading.hide();
    }
  };

  return {
    carsList,
    car,
    getCars,
    createCar,
    removeCar,
    getCarSingle,
    updateCar,
  };
});
