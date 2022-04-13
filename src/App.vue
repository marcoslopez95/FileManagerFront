<template>
    <div id="app">
        <router-view
            name="header"
            v-if="checkedUser()"
            @logout="logout"
            :admin="admin"
        />
        <div class="wrapper">
            <router-view
                @login="login"
                @desautenticado="desautenticado"
                @error="error"
            />
        </div>
        <router-view name="footer" />
        <!-- ------------------------ -->

        <modal :show.sync="error_b" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    class="bi bi-x text-danger"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                </svg>
                Error
            </h4>
            <p align="center">
                {{ error_m }}
            </p>
            <template slot="footer"> </template>
        </modal>
    </div>
</template>
<script>
import { Modal } from "@/components";
export default {
    components: {
        Modal,
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.admin = localStorage.getItem("admin");
        console.log(this.$route.path);
        console.log("app", this.token);
        if (
            !this.token &&
            (this.$route.path != "/login" || this.$route.path != "/registro")
        ) {
            console.log("redirigir a login");
            this.$router.push({ path: "login" });
        } else if (
            this.token &&
            (this.$route.path == "/login" || this.$route.path == "/registro")
        ) {
            console.log("redirigir a home");
            this.$router.push({ path: "home" });
        }
    },
    data() {
        return {
            user: "",
            token: "",
            admin: false,
            error_m: "",
            error_b: false,
        };
    },
    methods: {
        error(e) {
            console.log("error app", e);
            this.error_m = e;
            this.error_b = true;
        },
        logout() {
            console.log("out");
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            this.token = null;
            this.admin = false;
            this.$router.replace({ name: "login" });
        },
        login(data) {
            this.token = data.token;
            this.admin = data.admin;
            localStorage.setItem("token", this.token);
            localStorage.setItem("admin", this.admin);
        },
        checkedUser() {
            // return true;
            if (this.token == "" || this.token == false || this.token == null) {
                return false;
            }
            return true;
        },
        desautenticado() {
            this.logout();
        },
    },
};
</script>
