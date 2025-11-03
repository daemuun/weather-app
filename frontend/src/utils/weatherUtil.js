export function formatDate(dateString, lang) {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang, {
        day: 'numeric',
        month: 'short'
    });
}
