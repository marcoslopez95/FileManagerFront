<template>
    <div>
        <n-button type="info" @click.native="PrepararConsulta()">
            Agregar Archivo
        </n-button>
        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Agregar Archivo</h4>

            <div class="form-group">
                <label for="carpeta">Carpeta:</label>
                <select
                    class="form-control"
                    id="carpeta"
                    v-model="carpeta"
                    @change="consultarArchivos()"
                >
                    <option
                        v-for="(folder, i) in folders"
                        :key="i"
                        :value="folder.name"
                    >
                        {{ folder.name }}
                    </option>
                </select>
            </div>
            <div class="tabla_scroll">
                <tabla :headers="['#', 'Nombre', 'Seleccionar']">
                    <tr v-for="(file, j) in files" :key="j">
                        <td>{{ j + 1 }}</td>
                        <td>{{ file.name }}</td>
                        <td>
                            <input
                                type="checkbox"
                                :value="file.id"
                                v-model="formulario.archivos"
                            />
                        </td>
                    </tr>
                </tabla>
            </div>
            <hr />
            <div>
                <h5><b>Permisos para los archivos</b></h5>
            </div>
            <div class="tabla_scroll">
                <tabla :headers="['#', 'Permiso', 'Seleccionar']">
                    <tr v-for="(permit, k) in permits" :key="k">
                        <td>{{ k + 1 }}</td>
                        <td>{{ permit.name }}</td>
                        <td>
                            <input
                                type="checkbox"
                                :value="permit.id"
                                v-model="formulario.permisos"
                            />
                        </td>
                    </tr>
                </tabla>
            </div>
            <template slot="footer">
                <div class="col"></div>
                <n-button
                    type="info"
                    class="font-weight-bold"
                    :disabled="!validatedForm()"
                    @click="guardarRegistro()"
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
import Tabla from "@/pages/components/Tabla.vue";

export default {
    name: "agregar-archivo",
    components: {
        Modal,
        Tabla,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    props: {
        folders: Array,
        user: Number,
    },
    data() {
        return {
            modals: {
                classic: false,
                mini: false,
            },
            files: [],
            formulario: {
                archivos: [],
                permisos: [],
                user: "",
            },
            carpeta: "",
            permits: [],
        };
    },
    mounted() {
        this.carpeta = this.folders[0];
        this.formulario.user = this.user;
    },
    methods: {
        validatedForm() {
            return (
                this.formulario.archivos.length > 0 &&
                this.formulario.permisos.length > 0
            );
        },
        PrepararConsulta() {
            this.modals.classic = true;
            this.consultarPermisos();
        },
        consultarArchivos() {
            console.log("consultar");
            this.files = [];
            let url = `api/folder/${this.carpeta}/files`;
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    // console.log("ok", response.data);
                    let files = data.data;
                    console.log("archivos", files);
                    files.forEach((element) => {
                        /*
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );*/
                        this.files.push(element);
                    });
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
        consultarPermisos() {
            console.log("consultar");
            this.permits = [];
            let url = `api/permits`;
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    // console.log("ok", response.data);
                    let permits = data.data;
                    console.log("permits", permits);
                    permits.forEach((element) => {
                        /*
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );*/
                        if (element.name.search("Archivo") != -1) {
                            this.permits.push(element);
                        }
                    });
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
        guardarRegistro() {
            let url = `api/file_user`;
            axios
                .post(
                    url,
                    {
                        files: this.formulario.archivos,
                        user: this.formulario.user,
                        permits: this.formulario.permisos,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    let data = response.data;
                    // console.log("ok", response.data);
                    let permits = data.data;
                    console.log("permits", permits);
                    this.$router.go(0);
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
.tabla_scroll {
    overflow: scroll;
    height: 200px;
}
</style>