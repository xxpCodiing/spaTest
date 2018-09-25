
export default{

    //设置总得母猪数据
    setAddSowPigData({commit,state},pigls){
        commit('ADD_SETSOWPIG',pigls);
    },

    //设置单头母猪数据
    setSinglePigData({commit,state},index,pigData){
        commit('SET_SINGLEPIG',index,pigData);
    },
}