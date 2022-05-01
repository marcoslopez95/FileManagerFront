<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div
            class="page-header-image"
            style="background-image: url('img/login.jpg')"
        ></div>
        <div class="content">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <card type="login" plain>
                        <div slot="header" class="logo-container">
                            <img v-lazy="'img/now-logo.png'" alt="" />
                        </div>

                        <fg-input
                            class="no-border input-lg"
                            addon-left-icon="now-ui-icons users_circle-08"
                            placeholder="Correo Electrónico"
                            type="email"
                            v-model="formulario.email"
                        >
                        </fg-input>

                        <fg-input
                            class="no-border input-lg"
                            addon-left-icon="now-ui-icons objects_key-25"
                            type="password"
                            placeholder="Contraseña"
                            v-model="formulario.password"
                            @keypress="
                                if ($event.keyCode == 13) {
                                    login();
                                }
                            "
                        >
                        </fg-input>
                        <alert type="danger" v-show="validacion.login">
                            <strong>¡Error!</strong> <br />
                            {{ validacion.mensaje }}
                        </alert>
                        <template slot="raw-content">
                            <div class="card-footer text-center">
                                <a
                                    href="#pablo"
                                    class="
                                        btn
                                        btn-primary
                                        btn-round
                                        btn-lg
                                        btn-block
                                    "
                                    @click="login()"
                                    :class="[
                                        formulario.password.length <= 6
                                            ? 'disabled'
                                            : null,
                                    ]"
                                    >Iniciar Sesión</a
                                >
                            </div>
                            <div class="pull-left">
                                <h6>
                                    <a href="#" class="link footer-link"
                                        >Crear Cuenta</a
                                    >
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a href="#" class="link footer-link"
                                        >¿Necesitas Ayuda?</a
                                    >
                                </h6>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
import { Alert } from "@/components";
import axios from "axios";

export default {
    name: "login-page",
    bodyClass: "login-page",
    components: {
        Card,
        MainFooter,
        Alert,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    mounted() {},
    data() {
        return {
            formulario: {
                email: "",
                password: "",
            },
            validacion: {
                login: false,
                mensaje: "",
            },
        };
    },
    methods: {
        login() {
            this.validacion.login = false;
            let url = "/api/login";
            axios
                .post(url, this.formulario)
                .then((response) => {
                    console.log("response", response.data);
                    let data = response.data.success;
                    this.$emit("login", data);
                    this.$router.replace({ path: "home" });
                })
                .catch((error) => {
                    console.log("error", error.response.data);
                    let e = error.response.data;
                    this.validacion.login = true;
                    this.validacion.mensaje = e.message;
                });
        },
    },
};
</script>
<style></style>
