<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
      <h3 class="text-2xl font-bold text-left mb-5">
        Bienvenido, inicia sesion
      </h3>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="flex flex-col">
          <label class="font-medium" for="">Usuario</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            name="username"
            type="text"
          />
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.username }}
          </span>
        </div>
        <div class="flex flex-col mt-2">
          <label class="font-medium" for="">Contraseña</label>
          <Field
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            name="password"
            type="password"
          />
          <span class="text-base text-red-500 font-medium mt-2">
            {{ errors?.password }}
          </span>
        </div>
        <div class="flex items-baseline justify-between mt-5">
          <button
            class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            type="submit"
          >
            Ingresar
          </button>
          <p>
            No tienes una cuenta?
            <router-link
              to="/registro-usuario"
              class="text-sm text-blue-600 hover:underline"
              >Registrate</router-link
            >
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user-store";
import { Form, Field } from "vee-validate";
import { object, string } from "yup";
import * as Yup from "yup";
import { useRouter } from "vue-router";

const authStore = useUserStore();
const router = useRouter();

const schema = Yup.object().shape({
  username: Yup.string().required("Usuario es requerido"),
  password: Yup.string()
    .min(6, "Contraseña debe contener mas de 6 caracteres")
    .required("Contraseña es requerida"),
});

const onSubmit = async (values) => {
  await authStore.login(values);
  router.push("/autos");
};
</script>
