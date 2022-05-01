<template>
    <span>
        <editar-archivos></editar-archivos>
        <editar-permisos></editar-permisos>
    </span>
</template>

<script>
import axios from "axios";
import { EventBus } from "@/event-bus";
import EditarArchivos from "./EditarArchivos.vue";
import EditarPermisos from "./EditarPermisos.vue";
export default {
    name: "botones-user",
    components: {
        EditarPermisos,
        EditarArchivos,
    },
    props: {
        id: Number,
        nombre: String,
    },
    mounted() {
        this.token = localStorage.getItem("token");
    },
    data() {
        return {
            token: "",
        };
    },
    methods: {
        CargarArchivo() {
            let url = `api/files/${this.id}`;
            console.log("cargar");
            axios
                .put(url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    //console.log("ok", response.data);
                    //  let archivos = data.data;
                    // console.log("archivos", archivos);
                })
                .catch((error) => {
                    let e = error.response.data;
                    let desautenticado = false;
                    if (e.message == "Desautorizado") {
                        EventBus.$emit("logout");
                    }
                    //console.log("error", error.response.data);
                });
        },
        EliminarArchivo() {
            let url = `api/files/${this.id}`;
            console.log("delete");
            axios
                .delete(url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    //console.log("ok", response.data);
                    //  let archivos = data.data;
                    //  console.log("archivos", archivos);
                })
                .catch((error) => {
                    let e = error.response.data;
                    let desautenticado = false;
                    if (e.message == "Desautorizado") {
                        this.$emit("desautenticado");
                    }
                    //console.log("error", error.response.data);
                });
        },
    },
};
</script>

<style>
</style>