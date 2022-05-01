<template>
    <n-button
        class="m-0 p-0 bg-light"
        title="Descargar"
        @click="DescargarArchivo()"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            title="Descargar"
            class="bi bi-file-arrow-down-fill text-success"
            viewBox="0 0 16 16"
        >
            <path
                d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"
            />
        </svg>
    </n-button>
</template>

<script>
import { Button } from "@/components";
import axios from "axios";
import { EventBus } from "@/event-bus";
export default {
    name: "download-file",
    props: {
        token: String,
        nombre: String,
        id: Number,
    },
    components: {
        [Button.name]: Button,
    },
    methods: {
        DescargarArchivo() {
            console.log("descargar");
            let url = `api/files/${this.id}/edit`;
            axios({
                url: url,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                responseType: "blob", // importante
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(percentCompleted);
                },
            }).then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;

                link.setAttribute("download", this.nombre);
                document.body.appendChild(link);
                link.click();
            });
        },
    },
};
</script>

<style>
</style>