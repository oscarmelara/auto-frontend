<template>
  <div class="w-full">
    <div class="container mx-auto">
      <div class="flex justify-between align-middle my-10">
        <h1 class="text-3xl font-bold">Automoviles ingresados</h1>
        <router-link
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          to="/registro-autos"
        >
          Agregar nuevo automovil
        </router-link>
      </div>
      <q-table
        title="Treats"
        :rows="useCars.carsList"
        :columns="columns"
        row-key="name"
        :visible-columns="visibleColumns"
        class="font-sans shadow-xl"
      >
        <template v-slot:top="props">
          <div v-if="$q.screen.gt.xs" class="flex flex-col">
            <div class="col-2 q-table__title text-lg font-medium">
              Mostrar por:
            </div>

            <div class="col">
              <q-toggle
                v-model="visibleColumns"
                val="brand"
                class="text-base font-normal"
                label="Marca"
              />
              <q-toggle
                v-model="visibleColumns"
                val="color"
                class="text-base font-normal"
                label="Color"
              />
              <q-toggle
                v-model="visibleColumns"
                val="created_at"
                class="text-base font-normal"
                label="Ingreso"
              />
              <q-toggle
                v-model="visibleColumns"
                val="model"
                class="text-base font-normal"
                label="Modelo"
              />
              <q-toggle
                v-model="visibleColumns"
                val="state"
                class="text-base font-normal"
                label="Estado"
              />
              <q-toggle
                v-model="visibleColumns"
                val="assigned"
                class="text-base font-normal"
                label="Asignado"
              />
            </div>
          </div>

          <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            style="min-width: 150px"
          />
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md hidden"
          />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteCar(props.row.id)"
            />
            <q-btn
              color="primary"
              icon-right="create"
              no-caps
              flat
              dense
              @click="editCar(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user-store";
import { useCarsStore } from "../stores/cars-store";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useNotify } from "../componsables/notifyHook";
import { useRouter } from "vue-router";

const authStore = useUserStore();
const useCars = useCarsStore();
const router = useRouter();

const columns = [
  {
    name: "brand",
    label: "Marca",
    field: "brand",
    align: "left",
    sortable: true,
  },
  {
    name: "color",
    label: "Color",
    field: "color",
    align: "left",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Fecha de ingreso",
    field: "created_at",
    align: "left",
    sortable: true,
  },
  {
    name: "model",
    label: "Modelo",
    field: "model",
    align: "left",
    sortable: true,
  },
  {
    name: "state",
    label: "Estado",
    field: "state",
    align: "left",
    sortable: true,
  },
  {
    name: "assigned",
    label: "Asignado",
    field: "assigned",
    align: "left",
    sortable: true,
  },
  { name: "action", label: "Action", field: "action", align: "left" },
];

const visibleColumns = ref([
  "action",
  "brand",
  "color",
  "created_at",
  "model",
  "state",
  "assigned",
]);

const carsList = ref([]);
const $q = useQuasar();
const { errorNotify, successNotify } = useNotify();

useCars.getCars();

const deleteCar = async (id) => {
  $q.dialog({
    title: "Cuidado 💔",
    message: "¿Quierés eliminar el elemento?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useCars.removeCar(id);
      successNotify("Se eliminó el automovil");
    } catch (error) {
      console.log(error);
      if (error.errors) {
        return error.errors.forEach((item) => {
          errorNotify(item.msg);
        });
      }
      errorNotify(error);
    }
  });
};

const editCar = async (id) => {
  router.push(`/actualizar-auto/${id}`);
};
</script>
