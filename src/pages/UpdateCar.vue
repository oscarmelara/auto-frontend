<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
      <h3 class="text-2xl font-bold text-left mb-5">Actualizar vehiculo</h3>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        :initial-values="useCars.car"
        v-slot="{ errors }"
      >
        <div class="flex flex-col">
          <label class="font-medium" for="">Marca</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            name="brand"
            type="text"
          />
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.brand }}
          </span>
        </div>
        <div class="flex flex-col mt-2">
          <label class="font-medium" for="">Modelo (año)</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            name="model"
            type="text"
          />
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.model }}
          </span>
        </div>
        <div class="flex flex-col mt-2">
          <label class="font-medium" for="">Color</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            name="color"
            type="text"
          />
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.color }}
          </span>
        </div>

        <div class="flex flex-col mt-2">
          <label class="font-medium" for="">Estado</label>
          <div class="flex items-center">
            <div class="flex items-center flex-wrap">
              <Field
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="state"
                type="radio"
                :value="true"
              />
              <label>Si</label>
            </div>
            <div class="flex items-center flex-wrap">
              <Field
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="state"
                type="radio"
                :value="false"
              />
              <label for="">No</label>
            </div>
          </div>
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.state }}
          </span>
        </div>
        <div class="flex flex-col mt-2">
          <label class="font-medium" for="">Asignado</label>
          <div class="flex items-center">
            <div class="flex items-center flex-wrap">
              <Field
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="assigned"
                type="radio"
                :value="true"
              />
              <label>Si</label>
            </div>
            <div class="flex items-center flex-wrap">
              <Field
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="assigned"
                type="radio"
                :value="false"
              />
              <label for="">No</label>
            </div>
          </div>
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.assigned }}
          </span>
        </div>
        <div class="flex items-baseline justify-start mt-5">
          <router-link
            class="px-6 py-2 mt-4 text-white bg-gray-400 rounded-lg hover:bg-gray-500 mr-3"
            to="/autos"
          >
            Regresar
          </router-link>
          <button
            class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            type="submit"
          >
            Agregar vehiculo
          </button>
          <p></p>
        </div>

        <span class="text-base text-red-500 font-medium mt-2">
          {{ messageResponse }}
        </span>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user-store";
import { Form, Field } from "vee-validate";
import { object, string } from "yup";
import { api } from "src/boot/axios";
import * as Yup from "yup";
import { ref, watch } from "vue";
import { useCarsStore } from "../stores/cars-store";
import { useNotify } from "../componsables/notifyHook";
import { useRoute, useRouter } from "vue-router";

const schema = Yup.object().shape({
  brand: Yup.string().required("Marca es requerido"),
  model: Yup.string().required("Modelo es requerido"),
  color: Yup.string().required("Color es requerida"),
  state: Yup.string().required("Estado es requerida"),
  assigned: Yup.string().required("La Asignacion es requerida"),
});

const useCars = useCarsStore();
const loading = ref(false);
const { showNotify } = useNotify();
const route = useRoute();
const router = useRouter();

const currentId = route.params.id;

useCars.getCarSingle(currentId);

const onSubmit = async (values) => {
  console.log(values);
  try {
    loading.value = true;
    await useCars.updateCar(currentId, values);
    showNotify("Automovil actualizado", "green");
  } catch (error) {
    console.log(error);
    showNotify(error);
  } finally {
    loading.value = false;
  }
};

const messageResponse = ref("");
</script>
