

//可以认为是store的计算属性
export default {
    getTotalPigs:state =>{
        return state.addSowPigs;
    },

    //获取mileStoneId
    getMileTypes:state =>{
        console.log("types:" + JSON.stringify(state.TYPES));
        return state.TYPES;
    },

    /**
     * 获取后备猪列表
     */
    getPigsByMileid_Rev:(state) =>{
        return state.addSowPigs.filter(pig => pig.milestoneId == state.TYPES.REVERSETYPE);
    },

    /**
     * 通过id获取当前阶段的猪列表
     */
     getPigsByMileid:(state) =>(id)=>{
        return state.addSowPigs.filter(pig => pig.milestoneId == id);
     }

}