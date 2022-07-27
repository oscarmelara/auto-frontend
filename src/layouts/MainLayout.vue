<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-600" elevated>
      <q-toolbar>
        <q-toolbar-title> Auto App </q-toolbar-title>
        <router-link to="/"> Inicio </router-link>
        <router-link to="/autos" v-if="authStore.token" class="px-2"
          >Autos</router-link
        >
        <div v-if="authStore.token" class="px-2 cursor-pointer" @click="logout">
          Logout
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const authStore = useUserStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
