<template>
    <span>
        <n-button
            type="info"
            title=" Ver Archivos"
            @click.native="verArchivos()"
        >
            Ver Archivos
        </n-button>
        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            modalClasses="modal-xl"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Archivos Permitidos</h4>
            <agregar-archivo :folders="folders" v-show="!admin" :user="id" />
            <tabla :headers="cab">
                <tr v-for="(archivo, i) in archivos" :key="i">
                    <td>
                        {{ i + 1 }}
                    </td>
                    <td>
                        {{ archivo.folder.name }}
                    </td>
                    <td>
                        {{ archivo.name }}
                    </td>
                    <td>
                        <n-button type="danger" v-if="!admin">
                            Quitar
                        </n-button>
                        <span v-else> - </span>
                    </td>
                </tr>
            </tabla>

            <template slot="footer">
                <div class="col"></div>
                <n-button
                    type="secondary"
                    @click="modals.classic = false"
                    class="font-weight-bold"
                >
                    Cerrar
                </n-button>
                <div class="col"></div>
            </template>
        </modal>
    </span>
</template>

<script>
import { Button, Modal, FormGroupInput } from "@/components";
import axios from "axios";
import Tabla from "@/pages/components/Tabla.vue";
import AgregarArchivo from "./Botonera/AgregarArchivo.vue";

export default {
    name: "user-files",
    props: {
        id: Number,
        folders: Array,
        admin: Boolean,
    },
    components: {
        Modal,
        Tabla,
        AgregarArchivo,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    data() {
        return {
            modals: {
                classic: false,
                mini: false,
            },
            cab: ["#", "Carpeta", "Nombre", "Acciones"],
            archivos: [],
        };
    },
    mounted() {},
    methods: {
        verArchivos() {
            this.archivos = [];
            this.modals.classic = true;

            let url = `api/user/${this.id}/files/`;
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((response) => {
                    console.log("carga con exito", response.data);
                    let datos = response.data;

                    datos.forEach((element) => {
                        this.archivos.push(element);
                    });
                    //EventBus.$emit("refresh_files");
                })
                .catch((error) => {
                    let e = error.response;
                    // console.log("error", e.data);
                    // EventBus.$emit("notificacion_", {
                    //     type: "danger",
                    //     ico: "objects_support-17",
                    //     title: "error",
                    //     body: e.data.data,
                    // });
                });
        },
    },
};
</script>

<style>
</style>