<template>
    <header class="header">
        <div class="search-group">
            <input 
                :value="city" 
                :placeholder="t('header.input_placeholder')" 
                id = "city-input"
                @keyup.enter="handleSearch" 
            >
            <button type="submit" @click="handleSearch">
                {{ t('header.search_button') }}
            </button>
        </div>
        <select :value="currentLang" @change="handleLangChange">
            <option v-for="(name, code) in availableLocales" :key="code" :value="code">
                {{ name }}
            </option>
        </select>
    </header>
</template>

<script setup>
import { availableLocales } from '@/composables/useLocalization';

const props = defineProps(["city", "currentLang", "t"]);
const emit = defineEmits(["update:city", "update:lang"]);

const handleSearch = () => {
    emit('update:city', document.getElementById("city-input").value);
};

const handleLangChange = (event) => {
    emit('update:lang', event.target.value);
};

</script>

<style scoped>
.header {
    width: 60%;
    display: flex;
    justify-content: space-between;
    background: #e0e0e0;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
}

.search-group {
    display: flex;
    gap: 10px;
}

.search-group input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
}

.search-group button {
    padding: 8px 16px;
    background: #a730a1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
