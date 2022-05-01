<template>
    <div class="mt-5 mx-5">
        <div class="pt-5" table-responsive>
            <crear-archivo :carpeta="nombre" />
            <Tabla :headers="cabeceras">
                <tr v-for="(archivo, i) in archivos" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                        <img
                            :src="VerificarArchivo(archivo.name)"
                            height="30px"
                        />
                        {{ archivo.name }}
                    </td>
                    <td>{{ archivo.description }}</td>
                    <td>{{ archivo.updated_at }}</td>
                    <td class="col-2">
                        <botones-accion
                            :id="archivo.id"
                            :nombre="archivo.name"
                        />
                    </td>
                </tr>
            </Tabla>
        </div>
    </div>
</template>

<script>
import Tabla from "@/pages/components/Tabla.vue";
import axios from "axios";
import dayjs from "dayjs";
import BotonesAccion from "./Botonera/BotonesAccion.vue";
import CrearArchivo from "@/pages/Archivos/CrearArchivo";
import { EventBus } from "@/event-bus";

export default {
    name: "index-archivos",
    components: {
        Tabla,
        BotonesAccion,
        CrearArchivo,
    },
    props: {},
    data() {
        return {
            cabeceras: [
                "#",
                "Nombre del archivo",
                "Descripción",
                "Fecha de Actualización",
                "Acciones",
            ],
            token: "",
            archivos: [],
            nombre: "",
        };
    },
    mounted() {
        //console.log();
        this.actualizarLista();
        this.nombre = this.$route.params.nombre;
        this.token = localStorage.getItem("token");
        //console.log("token", this.token);
        this.ConsultarCarpetas();
    },
    methods: {
        actualizarLista() {
            console.log("refresca");

            EventBus.$on("refresh_files", this.ConsultarCarpetas);
        },
        ConsultarCarpetas() {
            this.archivos = [];
            console.log("consultar");
            let url = `api/folder/${this.nombre}/files`;
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    let data = response.data;
                    //console.log("ok", response.data);
                    let archivos = data.data;
                    // console.log("archivos", archivos);
                    archivos.forEach((element) => {
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );
                        this.archivos.push(element);
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
        VerificarArchivo(name) {
            if (name.search(".xls") != -1) {
                return "/ICO/file_type_excel.ico";
            } else if (name.search(".csv") != -1) {
                return "/ICO/file_type_csv.ico";
            } else if (name.search(".doc") != -1) {
                return "/ICO/file_type_word.ico";
            }
        },
        ArchivoExcel(name) {
            // console.log("nombre", name);
            // console.log("ext", name.search(".xls"));
        },
    },
};
</script>

<style>
</style>