<template>
    <div id="app">
        <router-view
            name="header"
            v-if="checkedUser()"
            @logout="logout"
            :admin="admin"
            :nombre="name"
        />
        <notification></notification>
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
import Dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { EventBus } from "@/event-bus";
import Notification from "./components/Notification.vue";
export default {
    components: {
        Modal,
        Notification,
    },
    mounted() {
        this.oirEvento();
        this.token = localStorage.getItem("token");
        this.admin = localStorage.getItem("admin");
        this.name = localStorage.getItem("name");
        if (typeof this.admin == "string") {
            this.admin = this.admin.search("ru") ? true : false;
        }
        //console.log(this.$route.path);
        //console.log("app", this.token);
        console.log("admin", this.admin);
        console.log("admin", typeof this.admin);
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
            name: "",
            admin: false,
            error_m: "",
            error_b: false,
        };
    },
    methods: {
        oirEvento() {
            console.log("pa fuera");
            EventBus.$on("logout", this.logout);
        },
        actualizarLista() {
            console.log("refresca");
            EventBus.$on("refresh", this.logout);
        },
        error(e) {
            console.log("error app", e);
            this.error_m = e;
            this.error_b = true;
        },
        logout() {
            console.log("out");
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            localStorage.removeItem("name");
            localStorage.removeItem("time_token");
            this.token = null;
            this.admin = false;
            this.$router.replace({ name: "login" });
        },
        login(data) {
            this.token = data.token;
            this.name = data.name;
            this.admin = data.admin;
            //console.log("tipo de admin", typeof this.admin);
            localStorage.setItem("token", this.token);
            localStorage.setItem("admin", this.admin);
            localStorage.setItem("name", this.name);
            localStorage.setItem("time_token", new Dayjs());
        },
        LogoutTime() {
            dayjs.extend(isSameOrBefore);
            let init = Dayjs(localStorage.getItem("time_token"));
            let now = init;
            now.extend(isSameOrBefore);

            now.add("15", "minute");
            if (now.isSameOrBefore(init)) {
                this.logout();
            }
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
