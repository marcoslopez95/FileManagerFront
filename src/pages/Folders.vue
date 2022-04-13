<template>
    <div class="pt-5">
        <div class="main mt-5">
            <div class="row p-5">
                <Tabla
                    :headers="[
                        '#',
                        'Nombre',
                        'Archivos',
                        'Ultima Modificacion',
                        'Propietario',
                        'Opciones',
                    ]"
                >
                    <tr v-for="(folder, i) in folders" :key="i">
                        <td class="col-1">{{ i + 1 }}</td>
                        <td class="col">{{ folder.name }}</td>
                        <td class="col">{{ folder.files.length }}</td>
                        <td class="col-1">{{ folder.updated_at }}</td>
                        <td class="col-1">{{ folder.created_id }}</td>
                        <td class="col-3">
                            <input type="checkbox" name="" id="" />
                        </td>
                    </tr>
                </Tabla>
            </div>
        </div>
    </div>
</template>
<script>
// import { Parallax } from "@/components";
// import BasicElements from "./components/BasicElementsSection";
// import Navigation from "./components/Navigation";
// import TabsSection from "./components/Tabs";
// import ProgressPagination from "./components/ProgressPagination";
// import Notifications from "./components/Notifications";
// import Typography from "./components/Typography";
// import JavascriptComponents from "./components/JavascriptComponents";
// import CarouselSection from "./components/CarouselSection";
// import NucleoIconsSection from "./components/NucleoIconsSection";
// import SignupForm from "./components/SignupForm";
// import ExamplesSection from "./components/ExamplesSection";
// import DownloadSection from "./components/DownloadSection";
import Tabla from "./components/Tabla.vue";
import axios from "axios";
export default {
    name: "folders",
    bodyClass: "index-page",
    components: {
        Tabla,
        // Parallax,
        // BasicElements,
        // Navigation,
        // TabsSection,
        // ProgressPagination,
        // Notifications,
        // Typography,
        // JavascriptComponents,
        // CarouselSection,
        // NucleoIconsSection,
        // SignupForm,
        // ExamplesSection,
        // DownloadSection,
    },
    data() {
        return {
            folders: "",
        };
    },
    mounted() {
        let url = "/api/folders";
        axios.get(url).then((response) => {
            console.log(response.data);
            let data = response.data;
            this.folders = data.datos;
        });
    },
};
</script>
<style></style>
