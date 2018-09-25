


import Vue from "vue"
import Vuex from "vuex"


import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'  //样式需要单独引入

import VueRouter from "vue-router"
import App from "./App"
import routes from "./router"



Vue.config.devtools = true

Vue.use(Mint)
Vue.use(VueRouter)



//创建路由
const router = new VueRouter({
     routes,
     mode:"history"  //防止我们的url当中包含#标记
})

new Vue({
    el:"#app",
    template:"<App/>",
    components:{App},
    router,
    store
}).$mount("#app")

