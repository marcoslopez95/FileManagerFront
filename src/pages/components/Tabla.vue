<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-for="(header, i) in headers" :key="i">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>
<script>
export default {
    name: "Tabla",
    props: {
        headers: { type: Array, require: true },
    },
    data() {
        return {};
    },
    mounted() {},
};
</script>
<style></style>
