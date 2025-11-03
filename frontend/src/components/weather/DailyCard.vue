<template>
    <div :key="props.day.date" class="day-card">
        <p><strong>{{ formatDate(props.day.date, props.lang) }}</strong></p>
        <img :src="`https://openweathermap.org/img/wn/${props.day.icon}.png`" :alt="props.day.description">
        <p>{{ props.day.min_temp }}° / {{ props.day.max_temp }}°</p>
        <p>{{ props.day.description }}</p>
    </div>
</template>

<script setup>
const props = defineProps(["day", "lang"]);
import { formatDate } from '@/utils/weatherUtil';
</script>

<style scoped>
.day-card {
    background: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
}

.day-card p {
    margin: 5px 0;
}
</style>
