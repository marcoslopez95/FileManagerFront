<template>
    <div>
        <download-file
            @click="DescargarArchivo()"
            :token="token"
            :id="id"
            :nombre="nombre"
        />
        <upload-file
            @click="CargarArchivo()"
            :token="token"
            :id="id"
            :nombre="nombre"
        />
        <delete-file
            @click="EliminarArchivo()"
            :token="token"
            :id="id"
            :nombre="nombre"
        />
    </div>
</template>

<script>
import DownloadFile from "./DownloadFile.vue";
import UploadFile from "./UploadFile.vue";
import DeleteFile from "./DeleteFile.vue";
import axios from "axios";
import { EventBus } from "@/event-bus";
export default {
    name: "botones-accion",
    components: {
        DownloadFile,
        UploadFile,
        DeleteFile,
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