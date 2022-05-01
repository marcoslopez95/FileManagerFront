<template>
    <span>
        <n-button
            class="m-0 p-0 bg-light"
            title="Cargar"
            @click.native="modals.classic = true"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                class="bi bi-file-arrow-up-fill text-info"
                title="Actualizar"
                viewBox="0 0 16 16"
            >
                <path
                    d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z"
                />
            </svg>
        </n-button>
        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Subir archivo nuevo</h4>
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
import { Button, Modal, FormGroupInput } from "@/components";
import axios from "axios";

export default {
    name: "upload-file",
    props: {
        token: String,
        id: Number,
        nombre: String,
    },
    components: {
        Modal,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    data() {
        return {
            modals: {
                classic: false,
                mini: false,
            },
            formulario: {
                file: "",
            },
        };
    },
    methods: {
        getFile(e) {
            this.formulario.file = e.target.files[0];
        },
        subirArchivo() {
            let file = new FormData();
            file.append("file", this.formulario.file);

            let url = `api/files/${this.id}`;
            axios
                .post(url, file, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log("carga con exito", response.data);
                    this.modals.classic = false;
                    EventBus.$emit("refresh_files");
                    EventBus.$emit("notificacion_", {
                        type: "success",
                        ico: "ui-2_like",
                        title: "ok",
                        body: response.data.message,
                    });
                })
                .catch((error) => {
                    let e = error.response;
                    console.log("error", e.data);
                    EventBus.$emit("notificacion_", {
                        type: "danger",
                        ico: "objects_support-17",
                        title: "error",
                        body: e.data.data,
                    });
                });
        },
    },
};
</script>

<style>
</style>