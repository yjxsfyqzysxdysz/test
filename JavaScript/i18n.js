import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: '',
  messages: ''
})

const loadedLanguages = [''] // 默认语言
const loadedModules = []

const setI18nLanguage = lang => {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

/**
 * @description 异步加载语言
 * @param {String} lang 语言
 */
export const loadLanguageAsync = lang => {
  if (i18n.locale !== lang) {
    if (loadedLanguages.indexOf(lang) === -1) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/assets/langs/${lang}/index`).then(res => {
        i18n.setLocaleMessage(lang, res.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

/**
 * @description 按照模块打包
 * @param {String} lang
 * @param {Array} module
 */
export const loadLanguageAsync2 = (lang, module) => {
  if (typeof module === 'string') {
    module = [module]
  }
  let needModules = module.filter(e => !loadedModules(e))
  if (needModules.length) {
    return Promise.all(module.map(e => import(/* webpackChunkName: "lang-[request]" */ `@/assets/langs/${lang}/${e}`))).then(res => {
      i18n.setLocaleMessage(lang, Object.assign({}, ...res.map(f => f.default), i18n.getLocaleMessage(lang)))
      loadedModules.push(...needModules)
      i18n.locale = ''
      return setI18nLanguage(lang)
    })
  } else {
    return Promise.resolve(lang)
  }
}
