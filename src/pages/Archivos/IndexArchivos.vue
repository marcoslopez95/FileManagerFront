<template>
    <div class="mt-5 mx-5">
        <div class="pt-5" table-responsive>
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
                    <td>
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
                        <a href="#" title="Eliminar">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                fill="currentColor"
                                class="
                                    bi bi-file-earmark-excel-fill
                                    text-danger
                                "
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"
                                />
                            </svg>
                        </a>
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

export default {
    name: "index-archivos",
    components: {
        Tabla,
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
        this.nombre = this.$route.params.nombre;
        this.token = localStorage.getItem("token");
        //console.log("token", this.token);
        this.ConsultarCarpetas();
    },
    methods: {
        async ConsultarCarpetas() {
            let url = `api/folder/${this.nombre}/files`;
            await axios
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