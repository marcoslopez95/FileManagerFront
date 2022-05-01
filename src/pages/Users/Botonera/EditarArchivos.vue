<template>
    <span>
        <n-button
            type="info"
            title="Editar Archivos"
            @click.native="modals.classic = true"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-files"
                viewBox="0 0 16 16"
            >
                <path
                    d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"
                />
            </svg>
        </n-button>

        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">
                Editar Archivos Permitidos
            </h4>
            <p>
                Documento a actualizar: <br />
                {{ nombre }}
            </p>
            <input
                type="file"
                class="form-control-file"
                @change="getFile($event)"
                id="exampleFormControlFile1"
            />
            <template slot="footer">
                <div class="col"></div>
                <n-button
                    type="info"
                    @click.native="subirArchivo()"
                    class="font-weight-bold"
                >
                    Guardar
                </n-button>
            </template>
        </modal>
    </span>
</template>

<script>
import { Button, Modal } from "@/components";
import axios from "axios";
import { EventBus } from "@/event-bus";
export default {
    name: "editar-archivos",
    props: {
        token: String,
        nombre: String,
        id: Number,
    },
    components: { Modal, [Button.name]: Button },
    data() {
        return {
            modals: {
                classic: false,
                mini: false,
            },
        };
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