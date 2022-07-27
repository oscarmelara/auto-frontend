<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
      <h3 class="text-2xl font-bold text-left mb-5">
        Registrate para iniciar sesion
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
            Tienes cuenta?
            <router-link
              to="/login"
              class="text-sm text-blue-600 hover:underline"
              >Inciar sesion</router-link
            >
          </p>
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
import { ref } from "vue";

const schema = Yup.object().shape({
  username: Yup.string().required("Usuario es requerido"),
  password: Yup.string()
    .min(6, "Contraseña debe contener mas de 6 caracteres")
    .required("Contraseña es requerida"),
});

const onSubmit = (values) => {
  registerUser(values);
};

const messageResponse = ref("");

const registerUser = async (values) => {
  try {
    const { username, password } = values;
    const res = await api.post("/users", {
      username: username,
      password: password,
    });
    messageResponse.value = "Usuario creado con exito";
  } catch (err) {
    if (err.response) {
      messageResponse.value = err.response.data.message;
    }
  }
};
</script>
