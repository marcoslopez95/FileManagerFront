<template>
    <div class="mt-5 mx-5">
        <div class="pt-5">
            <Tabla :headers="cabeceras"></Tabla>
        </div>
    </div>
</template>

<script>
import Tabla from "@/pages/components/Tabla.vue";
export default {
    name: "index-user",
    components: {
        Tabla,
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
        };
    },
};
</script>

<style>
</style>