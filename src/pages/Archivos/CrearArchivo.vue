<template>
    <div>
        <n-button type="primary" @click.native="modals.classic = true">
            Crear Archivo
        </n-button>
        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Crear Archivo</h4>

            <p>
                <fg-input
                    placeholder="Breve descripción del archivo"
                    v-model="formulario.description"
                    :class="[
                        formulario.description.length <= 10
                            ? 'has-danger'
                            : 'has-success',
                    ]"
                />
            </p>
            <p>
                <input
                    type="file"
                    class="form-control-file"
                    @change="getFile($event)"
                    id="exampleFormControlFile1"
                />
            </p>
            <template slot="footer">
                <div class="col"></div>
                <n-button
                    type="info"
                    class="font-weight-bold"
                    :disabled="!ValidatedInputs()"
                    @click="CrearArchivo()"
                >
                    Guardar
                </n-button>
            </template>
        </modal>
    </div>
</template>

<script>
import { Button, Modal, FormGroupInput } from "@/components";
import axios from "axios";
import { EventBus } from "@/event-bus";

export default {
    name: "crear-archivo",
    components: {
        Modal,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    props: {
        carpeta: String,
    },
    mounted() {},
    data() {
        return {
            modals: {
                classic: false,
                mini: false,
            },
            formulario: {
                description: "",
            },
        };
    },
    destroyed() {
        this.formulario.description = "";
        document.getElementById("exampleFormControlFile1").value = "";
    },
    methods: {
        getFile(e) {
            this.formulario.file = e.target.files[0];
        },
        ValidatedInputs() {
            let bool = this.formulario.description.length > 10;
            console.log("btn archivo", bool);
            return bool;
        },
        CrearArchivo() {
            let file = new FormData();
            file.append("file", this.formulario.file);
            file.append("folder", this.carpeta);
            file.append("description", this.formulario.description);

            let url = `api/files`;
            axios
                .post(url, file, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
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