<template>
    <div class="mt-5 mx-5">
        <div class="pt-5">
            <Tabla :headers="cabeceras">
                <tr v-for="(user, i) in users" :key="i">
                    <td>
                        {{ i + 1 }}
                    </td>
                    <td>
                        {{ user.name }}
                    </td>
                    <td>
                        {{ user.last_names }}
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td class="m-0 p-0">
                        <archivos-user
                            :id="user.id"
                            :folders="folders"
                            :admin="user.isAdmin"
                        />
                    </td>
                    <td class="p-0">
                        <botones-user />
                    </td>
                </tr>
            </Tabla>
        </div>
    </div>
</template>

<script>
import Tabla from "@/pages/components/Tabla.vue";
import axios from "axios";
import ArchivosUser from "./ArchivosUser.vue";
import BotonesUser from "@/pages/Users/Botonera/BotonesUser";
export default {
    name: "index-user",
    components: {
        Tabla,
        BotonesUser,
        ArchivosUser,
    },
    data() {
        return {
            cabeceras: [
                "#",
                "Nombres",
                "Apellidos",
                "Correo Electrónico",
                "Archivos Permitidos",
                "Acciones",
            ],
            users: [],
            folders: [],
            files: [],
        };
    },
    mounted() {
        this.consultarUsuarios();
        this.consultarCarpetas();
    },
    methods: {
        consultarUsuarios() {
            this.users = [];
            console.log("consultar");
            let url = `api/users`;
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
                    //console.log("ok", response.data);
                    let users = data.data;
                    // console.log("archivos", archivos);
                    users.forEach((element) => {
                        /*
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );*/
                        this.users.push(element);
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
        consultarCarpetas() {
            console.log("consultar");
            let url = `api/folders`;
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
                    //console.log("ok", response.data);
                    let folders = data.data;
                    // console.log("archivos", archivos);
                    folders.forEach((element) => {
                        /*
                        element.updated_at = dayjs(element.updated_at).format(
                            "DD/MM/YYYY - HH:MM"
                        );*/
                        this.folders.push(element);
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
    },
};
</script>

<style>
</style>