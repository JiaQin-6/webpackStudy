import { createI18n } from 'vue-i18n';
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh_tw',
    messages: {
        'zh_tw': window.i18n_zh_tw,
        'en_us': window.i18n_en_us,
    }
});
export default i18n;
