import 'core-js/fn/promise'
import 'whatwg-fetch'
import 'iScss/base.scss'
{{#if_eq analytics "yes"}}
// 网页监控sdk
import 'analytics'
{{/if_eq}}
// 微信分享sdk
import 'assets/libs/jweixin-1.0.0.js' 
{{#if_eq growingIO "yes"}}
// 活动必须的growingio埋点
import 'assets/libs/growingio.js'
{{/if_eq}}
{{#if_eq vuex "yes"}}
import store from 'stores'
{{/if_eq}}

import InVue from 'extends/inVue'
import App from './App.vue'
import { mock, mockMap } from 'config' 
import injectFetch from 'mocks'

let inVue = new InVue({
  {{#if_eq vuex "yes"}}
  store,
  {{/if_eq}}
  render: h => h(App)
})

if (process.env.NODE_ENV !== 'production' && mock) {
  mockMap().then((map) => {
    window.fetch = injectFetch(window.fetch, map)
    inVue.$mount('#app')
  })
} else {
  inVue.$mount('#app')
}

