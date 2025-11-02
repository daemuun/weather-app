import { ref, computed } from 'vue'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = { ru, en }

export function useLocalization() {
    const currentLang = ref(localStorage.getItem('lang') ||
        (navigator.language.includes('ru') ? 'ru' : 'en')
    )

    const t = computed(() => (key) => {
        const keys = key.split('.')
        let value = locales[currentLang.value]

        for (const k of keys) {
            value = value?.[k]
            if (!value) return key
        }
        return value
    })

    const setLanguage = (lang) => {
        currentLang.value = lang
        localStorage.setItem('lang', lang)
    }

    return { t, currentLang, setLanguage }
}
