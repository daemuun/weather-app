<template>
    <div id="content">
        <WeatherHeader 
            :city="city" 
            :currentLang="currentLang" 
            :t="t" 
            @update:city="$emit('update:city', $event)"
            @update:lang="$emit('update:lang', $event)" 
        />
        <WeatherMain :weather="weather" :t="t" :currentLang="currentLang" />
        <WeatherFooter :weather="weather" />
    </div>
</template>

<script setup>
import WeatherHeader from '@/components/weather/WeatherHeader.vue';
import WeatherMain from '@/components/weather/WeatherMain.vue';
import WeatherFooter from '@/components/weather/WeatherFooter.vue';

defineProps(["weather", "t", "currentLang", "city"]);
defineEmits(["update:city", "update:lang"]);
</script>

<style scoped>
#content {
    padding: 20px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
