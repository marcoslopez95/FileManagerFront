<template>
    <span>
        <n-button title="Editar Permisos" @click.native="modals.classic = true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-people-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
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
    name: "editar-permisos",
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