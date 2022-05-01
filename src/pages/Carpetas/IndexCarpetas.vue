<template>
    <div class="mt-5 mx-5">
        <div class="pt-5" table-responsive>
            <crear-carpeta @error="error" />

            <Tabla :headers="cabeceras">
                <tr v-for="(carpeta, i) in carpetas" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td style="hover: main">
                        <img src="ICO/folder_grey.ico" height="40px" />
                        <router-link :to="'/carpeta/' + carpeta.name">
                            {{ carpeta.name }}
                        </router-link>
                    </td>
                    <td>{{ carpeta.description }}</td>
                    <td>{{ carpeta.updated_at }}</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </Tabla>
        </div>
    </div>
</template>

<script>
import Tabla from "@/pages/components/Tabla.vue";
import axios from "axios";
import dayjs from "dayjs";
import CrearCarpeta from "@/pages/Carpetas/CrearCarpeta.vue";
import { EventBus } from "@/event-bus";

export default {
    name: "index-carpetas",
    components: {
        Tabla,
        CrearCarpeta,
    },
    props: {},
    data() {
        return {
            cabeceras: [
                "#",
                "Nombre de la carpeta",
                "Descripción",
                "Fecha de Actualización",
                "Acciones",
            ],
            token: "",
            carpetas: [],
            admin: "",
        };
    },
    mounted() {
        this.actualizarLista();
        //console.log();
        this.token = localStorage.getItem("token");
        console.log("token", this.token);
        this.ConsultarCarpetas();
    },
    methods: {
        actualizarLista() {
            console.log("refresca");
            EventBus.$on("refresh_folder", this.logout);
        },
        error(e) {
            console.log("in_car", e);
            this.$emit("error", e);
        },
        async ConsultarCarpetas() {
            await axios
                .get("api/folders", {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    //console.log("ok", response.data);
                    let carpetas = data.data;
                    console.log("carpetas", carpetas);
                    carpetas.forEach((element) => {
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );
                        this.carpetas.push(element);
                    });
                })
                .catch((error) => {
                    let e = error.response.data;
                    let status = error.response.status;
                    let desautenticado = false;
                    if (e.message == "Desautorizado") {
                        this.$emit("desautenticado");
                    }
                    if (status == 401) {
                        this.$emit("desautenticado");
                    }
                    console.log("error", error.response.data);
                });
        },
    },
};
</script>

<style>
</style>