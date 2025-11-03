<template>
    <footer class="footer">
        {{ weather.city }}, {{ weather.country }}
    </footer>
</template>

<script setup>
defineProps(["weather"]);
</script>

<style scoped>
.footer {
    width: 60%;
    background: #e0e0e0;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 8px;
    text-align: center;
}
</style>
