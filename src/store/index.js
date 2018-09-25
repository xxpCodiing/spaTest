import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    addSowPigs:[], //需要添加的母猪数据
    TYPES:{
        REVERSETYPE:1,
        BORNTYPE:3,
        FEEDINGTYPE:4,
        BREAKMILKTYPE:6,
    },

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
   /* modules: {
        a: moduleA,
        b: moduleB
      }*/
});