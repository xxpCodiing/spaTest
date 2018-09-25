
<template>
    <div   id="sowPig" >
           <sowpopadapter class="popbox" :class="popclass" :cur-adapter="currentAdapter" v-on:closePop="closePop" :cur-type="currentSleType"  :cur-milid="currentSleMilId"
            v-on:setType="setType"  v-on:setCount="setCount" v-on:setTypeDetail = "setTypeDetail"

           ></sowpopadapter>    

            <div class="header_box bg_w">
                <div class="header sowpig">
                    <div class="col-xs-6 col-md-6 text-left" @click="backPage()">
                        <span class="backtrack"></span>
                    </div>
                    <div class="col-xs-6 text-right col-md-6" @click="jump()">
                        跳过步骤
                    </div>
                </div>
                <div class="guidance guidanceOne"></div>
            </div>
            <div class="entering_main" >
                <div class="sowpig entering_list" @click="pigTypeChoose()">
                    <h1 class="font_one text-center body_text">请选择您猪场的母猪种类？</h1>
                    <div class="list text-center bg_w " >
                        {{sowTypeShow}}
                    </div>
                </div>
                <div class="sowpig entering_list" @click="pigCountSet()">
                    <h1 class="font_one text-center body_text">请输入本次要录入母猪总头数？</h1>
                    <div class="list text-center bg_w "  >
                        {{sowCountShow}}
                    </div>
                </div>
                <div v-show="totCount>0">
                <div class="entering_list" @click="earTagSet('引种后备猪',1)">
                    <h1 class="font_one text-center body_text">请选择本次录入引种后备母猪头数？</h1>
                    <div class="list text-center bg_w ut-s"  >
                        {{hbShow}}
                    </div>
                </div>
                <div class="entering_list" @click="earTagSet('妊娠猪',3)">
                    <h1 class="font_one text-center body_text">请选择本次录入妊娠母猪头数？</h1>
                    <div class="list text-center bg_w ut-s" >
                        {{rsShow}}
                    </div>
                </div>
                <div class="entering_list" @click="earTagSet('哺乳猪',4)">
                    <h1 class="font_one text-center body_text">请选择本次录入哺乳母猪头数？</h1>
                    <div class="list text-center bg_w ut-s" >
                        {{brShow}}
                    </div>
                </div>
                <div class="entering_list" @click="earTagSet('断奶空怀猪',6)">
                    <h1 class="font_one text-center body_text">请选择本次录入空怀母猪头数？</h1>
                    <div class="list text-center bg_w ut-s" >
                        {{dnShow}}
                    </div>
                </div>
                </div>
            </div>
            <div class="btn_box" @click="nextStep()">
                <div class="user_btn text-center col_w">
                    <span>下一步</span>
                </div>
            </div>
        </div>
</template>
    
<style>
    @import '../assets/css/bootstrap.css';
    @import '../assets/css/resets.css';
    @import '../assets/css/introduction.css';
</style>

<script>
import sowpopadapter from './sowPopAdapter'
import {Toast} from 'mint-ui'
import {mapState,mapActions,mapGetters} from 'vuex'

export default {
     name:"sowpig",
     data(){
        return{
            sowType:"",
            sowTypeShow:"选择种类",
            sowCountShow:"输入头数",
            totCount:0,
            currentAdapter:"",
            isOpenPop : false,
            pigCount:0,
            begin:"",
            preinfo:"",

            currentSleMilId:"",
            currentSleType:"",
        }
     },
     components:{
        sowpopadapter:sowpopadapter,
     },

    methods:{
        ...mapActions([
            'setAddSowPigData',
        ]),

        //中间土司
        makeToast_midd:function(msg,timer){
            Toast({
                    message: msg,
                    position: 'middle',
                    duration: timer
                });
        },

        //返回
        backPage:function(){
            //this.$router.push("/")
            this.$router.back();
        },
        //跳过
        jump:function(){
            alert("跳过");
        },
        //种类选择
        pigTypeChoose:function(){
           this.currentAdapter = 'sowTypeAdapter';
           this.isOpenPop = true;
        },
        //耳标选择
        earTagSet:function(type,index){
            this.currentSleType = type;
            this.currentSleMilId = index;
            this.currentAdapter = 'earTagAdapter';
            this.isOpenPop = true;
        },

        //头数设置
        pigCountSet:function(){
            this.currentAdapter = 'sowTotalAdapter';
            this.isOpenPop = true;
        },

        //下一步
        nextStep:function(){
            var totalArray = this.getTotalPigs;  
            if(!this.sowTypeShow || this.sowTypeShow.length < 5){
                this.makeToast_midd("请选择母猪种类",2000);return;
            }
            if(!totalArray || totalArray.length == 0){
                this.makeToast_midd("还没有母猪需要添加",2000);return;
            }
            if(this.getTypeCount(1) == 0 && this.getTypeCount(3) == 0 && this.getTypeCount(4) == 0 && this.getTypeCount(6) == 0 ){
                this.makeToast_midd("请分配添加母猪的种类",2000);return;
            }
            this.$router.push('reversePig')
        },

        //关闭弹窗
        closePop:function(){
            this.isOpenPop = false;
        },

        //设置母猪类型
        setType:function(typeName){
            this.sowTypeShow = "您选择的是：" + typeName;
            this.closePop();
        },

        //设置母猪数量
        setCount:function(count,begin,preinfo){
            this.pigCount = count;
            this.begin = begin;
            this.preinfo = preinfo;
            this.totCount = count;
            this.sowCountShow = "母猪头数:" + this.pigCount + "头";
            this.closePop();
            var sowPigLs = this.sowPigProduc();
            this.$store.commit('ADD_SETSOWPIG',sowPigLs);
            this.setAddSowPigData(sowPigLs);
           // console.log(JSON.stringify(this.$store.state.addSowPigs));
        },

        //生成母猪数据
        sowPigProduc:function(){
            if(!this.pigCount){
                this.makeToast_midd("没有找到母猪头数",2000);return;
            }
            var i; var sowArray = new Array();
            for(i=0;i < this.pigCount; i++){
                var earTag = this.preinfo + (parseInt(this.begin) + i);
                var pig = {
                    "earTag":earTag,
                    "milestoneId":"",
                    "sowType":"",
                    "stateDays":"",
                    "birthTimes":"",
                    "childData":{
                        "birthCount":"",
                        "livingCount":"",
                        "birthWeight":"",
                    },
                    "fatherIndex":i,
                }
                sowArray.push(pig); 
            }
            return sowArray;
        },
         //获取某阶段猪头数
        getTypeCount:function(type){
            var totalArray = this.getTotalPigs;  
            var count = 0 ; var j;
            if(totalArray.length >0){               
                for(j=0; j < totalArray.length ;j ++){
                    if(totalArray[j].milestoneId == type){
                        count = count + 1;
                    }
                }
            }
            return count;
        },

        //设置具体的某种猪
        setTypeDetail:function(typeCount){
             this.closePop();
        },


    },

    computed:{
        ...mapGetters([
            'getTotalPigs'
        ]),
       
        hbShow:function(){ //后备显示
            var count = this.getTypeCount(1);
            if(count){
                return "后备猪" + count + "头";                    
            }else{
                return "后备猪";
            }
        },
        rsShow:function(){ //妊娠显示
        
            var count = this.getTypeCount(3);
            if(count){
                return "妊娠猪" + count + "头";                    
            }else{
                return "妊娠猪";
            }               
        },
        brShow:function(){ //哺乳显示     
            var count = this.getTypeCount(4);
            if(count){
                return "哺乳猪" + count + "头";                    
            }else{
                return "哺乳猪";
            }                          
        },
        dnShow:function(){ //断奶显示
            
            var count = this.getTypeCount(6);
            if(count){
                return "断奶猪" + count + "头";                    
            }else{
                return "断奶猪";
            }                                      
        },

        popclass:function(){
            return {
                "uhide":!this.isOpenPop,
                "sowpop":this.currentAdapter == 'sowTotalAdapter',
                "Speciespop":this.currentAdapter == 'sowTypeAdapter',
                "Earconpop":this.currentAdapter == 'earTagAdapter',
            };
        },
    },
    created(){

    }

    

}
</script>

