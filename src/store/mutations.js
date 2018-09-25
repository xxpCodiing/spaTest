
const ADD_SETSOWPIG = 'ADD_SETSOWPIG'
const SET_SINGLEPIG = 'SET_SINGLEPIG'

export default {
    
    //设置添猪向导-母猪数据
    [ADD_SETSOWPIG](state,sowPigData){
         state.addSowPigs = sowPigData;
    },

    //改变某一头猪对象
    [SET_SINGLEPIG](state,index,pigData){
        state.addSowPigs[index] = pigData;
    }

}
