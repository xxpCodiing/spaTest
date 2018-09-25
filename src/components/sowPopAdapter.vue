
<template>
    <div>
       <div class="popmain bg_w popmeasure" v-show="curAdapter=='sowTypeAdapter'">
            <div class="closeicon" @click="closePop()"></div>
            <div class="title font_one ubb um_text text-center">
                母猪种类
            </div>
            <ul class="text-center pigtype" v-for="(item,index) in pigTypeArray">
                <li @click="pigTypeSle(item.varName)" class="click-active">{{item.varName}}</li>
            </ul> 
        </div>
        <div class="popmain bg_w popmeasure sowTotalpopm"  v-show="curAdapter=='sowTotalAdapter'">
            <div class="closeicon"  @click="closePop()"></div>
            <h1 class="font_one text-center um_text Poptitle">请填写母猪详情</h1>
            <div class="info row body_bg">
                <span class="col-xs-4 itme">总头数:</span>
                <input  class="col-xs-7 itme text-right" type="number" v-model="totCount">
                <span  class="col-xs-1 itme text-right">(头)</span>
            </div>
            <div class="info row body_bg">
                <span class="col-xs-4 itme">耳标开始序号:</span>
                <input  class="col-xs-8 itme text-right" type="tel"  v-model="begintag">
            </div>
            <div class="info row body_bg">
                <span class="col-xs-4 itme">耳标前缀:</span>
                <input  class="col-xs-8 itme text-right" type="text"  placeholder="可不填写" v-model="preinfo">
            </div>
            <div class="btn_pop text-center col_w top_bg" @click="submitCount()" >
                确定
            </div>
        </div> 
        <div class="popmain bg_w popmeasure"  v-show="curAdapter=='earTagAdapter'">
                <div class="closeicon"  @click="closePop()"></div>
                <div class="title font_one text-center" >请选择您的{{curType}}</div>
                <div class="allear ubb text-right body_text">
                    <span class="elect uba "></span>
                    <span class="alleartext">显示全部耳标</span>
                </div>
                <div class="typebox row earTagpop body_text"  > 
                    <div class="col-xs-6  itme text-center" v-for="(item,index) in exceptArr"  @click="setTypeTo(index)" :class="{'type_y':item.milestoneId==1,'type_r':item.milestoneId==3,'type_b':item.milestoneId==4,'type_d':item.milestoneId==6,active:item.milestoneId}">
                        <div class="itme_box uba col-xs-12"><input type="text" class="col-xs-9 main_text" disabled="" v-model="item.earTag"></div>
                    </div>
                </div>
                <div class="row ubt btn_pop">
                    
                    <div class="col-xs-6 text-center btnstyle col_w" @click="sureSlec()">
                        确定
                    </div>
                </div>
         </div>
    </div>
</template>

<script>
 import {Toast} from 'mint-ui'
 import {mapState,mapActions,mapGetters} from 'vuex'
 import {getSowTypeList,getSOwTypeList_new,getSOwTypeListx} from '../api/getData'

export default {
    name:'sowpopadapter',
    data(){
        return {
            pigTypeArray:["母猪1","母猪2","母猪3","母猪4","母猪5","母猪6"],
            totCount:0,
            begintag:0,
            preinfo:'',
        }
    },
    props:['curAdapter','curType','curMilid'],
    methods:{
        ...mapActions([
            'setSinglePigData',
        ]),
        closePop:function(){
            this.$emit("closePop");            
        },
        pigTypeSle:function(typeName){
            this.$emit("setType",typeName);
        },
        //设置母猪总数
        submitCount:function(){
            if(!this.totCount){
                Toast({
                    message: '请填写母猪数量',
                    position: 'middle',
                    duration: 2000
                });
            }
            if(!(this.begintag+"")){
                Toast({
                    message: '请填写耳标开始序号',
                    position: 'middle',
                    duration: 2000
                });
            }
            this.$emit("setCount",this.totCount,this.begintag,this.preinfo);
        },

        //获取没有被选择的母猪
        getExceptArray:function(){
           
            var totalArray = this.getTotalPigs;
            var excArray = new Array(); var i;
            if(totalArray && totalArray.length >0){
                for(i=0; i<totalArray.length; i ++){
                    if(!totalArray[i].milestoneId || totalArray[i].milestoneId == this.curMilid){  
                        excArray.push(totalArray[i]);
                    }    
                }
            }
            return excArray;
        },  


        //设置类型
        setTypeTo:function(index){
            var fatherIndex = this.exceptArr[index].fatherIndex;
            var curPig = this.exceptArr[index];   
            if(!curPig.milestoneId){
                curPig.milestoneId = this.curMilid;
            }else{
                curPig.milestoneId = "";
            }     
            
           
            //this.setSinglePigData(fatherIndex,curPig);
            //console.log(JSON.stringify(this.$store.state.addSowPigs));
        },

        

        //确定选择好了
        sureSlec:function(){
            this.closePop();
        },

        //获取母猪种类
        async getPigType(){
            let pigTypeData = await getSOwTypeList_new();  
            console.log("新的种类列表：" + JSON.stringify(pigTypeData));
            this.pigTypeArray = pigTypeData.data;
        },

        //请求成功
        succCall:function(data){
            alert("成功：" + data);
        },
        //请求失败
        failCall:function(data){
            alert("失败了,亲");
        }
        

    },

    computed:{
        ...mapGetters([
            'getTotalPigs'
        ]),
        exceptArr:function(){
            return this.getExceptArray();
        }
    },

    created:function(){
        
    },

    mounted:function(){
        this.getPigType();
    },

}
</script>
<style scoped>
    .click-active:active{
        background-color: #fff;
    }
    
</style>


