<template>
    <alert
        v-show="notificacion.show"
        :type="notificacion.type"
        class="bottom-0 right-0 p-3"
        style="z-index: 99999; right: 0; top: 0; position: absolute"
    >
        <div class="alert-icon">
            <i class="now-ui-icons" :class="notificacion.ico"></i>
        </div>
        <strong>{{ notificacion.title }}</strong> {{ notificacion.body }} ({{
            expired
        }})
    </alert>
</template>

<script>
import { Alert } from "@/components";
import { EventBus } from "@/event-bus";
export default {
    components: {
        Alert,
    },
    props: {
        expired: { type: Number, default: 5 },
    },
    data() {
        return {
            notificacion: {
                show: false,
                type: "",
                ico: "",
                title: "",
                body: "",
            },
            interval: null,
        };
    },
    destroyed() {
        clearInterval(this.interval);
    },
    methods: {
        escucharEvento() {
            EventBus.$on("notificacion_", this.mostrarAlerta);
        },
        mostrarAlerta(notificacion) {
            console.log("notificacion", notificacion);
            this.notificacion = notificacion;
            this.notificacion.show = true;
            this.expired = 5;
            this.countdown();
        },
        countdown() {
            this.interval = setInterval(() => {
                if (this.expired === 0) {
                    console.log("out");

                    clearInterval(this.interval);
                } else {
                    console.log(this.expired);
                    this.expired -= 1;
                    //this.countdown = moment.utc(this.expired * 1000).subtract(1, 'seconds').format('HH:mm:ss');
                }
            }, 1000);
            updated();
        },
    },
    mounted() {
        //this.countdown();
        this.escucharEvento();
    },
    watch: {
        expired: function (nuevo, viejo) {
            if (nuevo === 0) {
                this.notificacion.show = false;
            }
        },
    },
    updated() {},
};
</script>

<style>
</style>