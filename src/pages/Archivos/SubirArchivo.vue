<template>
    <div>
        <n-button type="primary" @click.native="modals.classic = true">
            Crear Carpeta
        </n-button>
        <!-- Classic Modal -->
        <modal
            :show.sync="modals.classic"
            headerClasses="justify-content-center"
        >
            <h4 slot="header" class="title title-up">Crear Carpeta</h4>
            <p>
                <fg-input
                    v-model="formulario.name"
                    :class="[
                        formulario.name.length <= 4
                            ? 'has-danger'
                            : 'has-success',
                    ]"
                    placeholder="Nombre de la carpeta"
                />
            </p>
            <p>
                <fg-input
                    placeholder="Breve descripción de la carpeta"
                    v-model="formulario.description"
                    :class="[
                        formulario.description.length <= 10
                            ? 'has-danger'
                            : 'has-success',
                    ]"
                />
            </p>
            <template slot="footer">
                <div class="col"></div>
                <n-button
                    type="info"
                    @click.native="modals.classic = false"
                    class="font-weight-bold"
                    :disabled="!ValidatedInputs()"
                    @click="CrearCarpeta()"
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
export default {
    name: "crear-carpeta",
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
                name: "",
                description: "",
            },
        };
    },
    methods: {
        ValidatedInputs() {
            let bool =
                this.formulario.name.length > 4 &&
                this.formulario.description.length > 10;
            console.log("btn carpeta", bool);
            return bool;
        },
        CrearCarpeta() {
            let token = localStorage.getItem("token");
            let url = "/api/folders";
            axios
                .post(url, this.formulario, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("store_folder", response.data);
                })
                .catch((error) => {
                    let e = error.response.data;
                    console.log("error_folder", e.data);
                    this.formulario.name = "";
                    this.formulario.description = "";
                    this.$emit("error", e.data);
                });
        },
    },
};
</script>

<style>
</style>