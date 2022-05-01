<template>
    <navbar position="fixed" menu-classes="ml-auto" class="bg-light">
        <template>
            <!-- <router-link v-popover:popover1 class="navbar-brand" to="/"> -->
            <router-link class="navbar-brand" to="/home"> Home </router-link>
            <!-- <el-popover
                ref="popover1"
                popper-class="popover"
                placement="bottom"
                width="200"
                trigger="hover"
            >
                <div class="popover-body">
                    Designed by Invision. Coded by Creative Tim
                </div>
            </el-popover> -->
        </template>

        <template slot="navbar-menu">
            <li class="nav-item" v-show="admin == true">
                <a class="nav-link" href="/usuarios">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-person"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"
                        />
                    </svg>
                    <p>Usuarios</p>
                </a>
            </li>
            <li class="nav-item" v-show="admin == true">
                <a
                    class="nav-link"
                    href="https://www.creative-tim.com/product/vue-now-ui-kit"
                    target="_blank"
                >
                    <i class="now-ui-icons objects_key-25"></i>
                    <p>Permisos</p>
                </a>
            </li>

            <!-- ---------------------- -->
            <li class="nav-item">
                <router-link class="nav-link" to="/carpetas">
                    <a>
                        <i class="now-ui-icons files_single-copy-04"></i>
                        <p>Carpetas</p>
                    </a>
                </router-link>
            </li>

            <!-- <drop-down
                tag="li"
                title="Components"
                icon="now-ui-icons design_app"
                class="nav-item"
            >
                <nav-link to="/">
                    <i class="now-ui-icons business_chart-pie-36"></i> All
                    components
                </nav-link>
                <a
                    href="https://demos.creative-tim.com/vue-now-ui-kit/documentation"
                    target="_blank"
                    class="dropdown-item"
                >
                    <i class="now-ui-icons design_bullet-list-67"></i>
                    Documentation
                </a>
            </drop-down>
            <drop-down
                tag="li"
                title="Examples"
                icon="now-ui-icons design_image"
                class="nav-item"
            >
                <nav-link to="/landing">
                    <i class="now-ui-icons education_paper"></i> Landing
                </nav-link>
                <nav-link to="/login">
                    <i class="now-ui-icons users_circle-08"></i> Login
                </nav-link>
                <nav-link to="/profile">
                    <i class="now-ui-icons users_single-02"></i> Profile
                </nav-link>
            </drop-down> -->
            <li class="nav-item">
                <!-- <a
                    class="nav-link btn btn-neutral"
                    href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
                    target="_blank"
                >
                    <i class="now-ui-icons arrows-1_share-66"></i>
                    <p>Upgrade to PRO</p>
                </a> -->
            </li>

            <li class="nav-item">
                <!-- <a
                    class="nav-link"
                    rel="tooltip"
                    title="Follow us on Twitter"
                    data-placement="bottom"
                    href="https://twitter.com/CreativeTim"
                    target="_blank"
                >
                    <i class="fab fa-twitter"></i>
                    <p class="d-lg-none d-xl-none">Twitter</p>
                </a> -->
            </li>
            <li class="nav-item">
                <!-- <a
                    class="nav-link"
                    rel="tooltip"
                    title="Like us on Facebook"
                    data-placement="bottom"
                    href="https://www.facebook.com/CreativeTim"
                    target="_blank"
                >
                    <i class="fab fa-facebook-square"></i>
                    <p class="d-lg-none d-xl-none">Facebook</p>
                </a> -->
            </li>
            <li class="nav-item">
                <!-- <a
                    class="nav-link"
                    rel="tooltip"
                    title="Follow us on Instagram"
                    data-placement="bottom"
                    href="https://www.instagram.com/CreativeTimOfficial"
                    target="_blank"
                >
                    <i class="fab fa-instagram"></i>
                    <p class="d-lg-none d-xl-none">Instagram</p>
                </a> -->
                <drop-down
                    tag="li"
                    :title="'Bienvenido, ' + nombre"
                    icon="now-ui-icons users_single-02"
                    class="nav-item"
                >
                    <a class="btn btn-neutral dropdown-item" @click="logout()">
                        <i class="now-ui-icons ui-1_simple-remove"></i> Salir
                    </a>
                </drop-down>
            </li>
        </template>
    </navbar>
</template>

<script>
import { DropDown, Navbar } from "@/components";
import { Popover } from "element-ui";

export default {
    name: "main-navbar-norte",
    props: {
        transparent: Boolean,
        colorOnScroll: Number,
        admin: Boolean,
        nombre: String,
    },
    components: {
        DropDown,
        Navbar,
        [Popover.name]: Popover,
    },
    mounted() {},
    data() {
        return {};
    },
    methods: {
        logout() {
            this.$emit("logout");
            this.$router.replace({ path: "login" });
        },
    },
};
</script>

<style scoped>
@media screen and (max-width: 991px) {
    .sidebar-collapse .navbar-collapse .dropdown-menu .dropdown-item {
        color: #000000;
    }
}
</style>
