<template>
    <span>
        <n-button
            class="m-0 p-0 bg-light"
            title="Eliminar"
            @click.native="modals.classic = true"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                class="bi bi-file-earmark-excel-fill text-danger"
                viewBox="0 0 16 16"
            >
                <path
                    d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"
                />
            </svg>
        </n-button>
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Eliminar Archivo</h4>
            <p>
                Seguro que desea eliminar el archivo: <br />
                {{ nombre }}
            </p>
            <template slot="footer">
                <n-button
                    type="secondary"
                    @click.native="modals.classic = false"
                    class="font-weight-bold"
                >
                    Cancelar
                </n-button>
                <div class="col"></div>
                <n-button
                    type="danger"
                    @click.native="EliminarArchivo()"
                    class="font-weight-bold"
                >
                    Eliminar
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
    name: "delete-file",
    props: {
        token: String,
        id: Number,
        nombre: String,
    },
    components: {
        [Button.name]: Button,
        Modal,
    },
    data() {
        return {
            modals: {
                classic: false,
            },
        };
    },
    methods: {
        EliminarArchivo() {
            let url = `api/files/${this.id}`;

            axios
                .delete(url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    console.log("Eliminado con exito", response.data);
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