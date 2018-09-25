<template>
    <div class="box_main text-center col_w">
        <div class="skip" @click="closePage">{{clo}}</div>
        <h1 class="font_one">开启您的智慧养猪之旅</h1>
        <div class="entrance" @click="loadPage"><span>基本数据录入</span></div>
    <loading></loading>
    </div>
    
</template>

<style lang="css" scoped>
    @import '../assets/css/bootstrap.css';
    @import '../assets/css/introduction.css';
    @import '../assets/css/resets.css';
</style>
<script>
    import loading from './loading'
    import{getEnvData,getSOwTypeList_new} from '../api/getData'
    import { Indicator } from 'mint-ui';
    export default {
        name:'welcome',
        data(){
            return {
                "clo":"关闭",
            }
        },
        components:{
            loading:loading,
        },
        props:[],
        methods:{
             closePage:function(){
                 alert("关闭窗口");
             },
             loadPage:function(){
                 this.$router.push('sowpig')
             },
            /**
             * 获取配置信息
             */
            async getEnv(){
                /*Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'triple-bounce'
                });*/
                var envData = await getEnvData();
                //Indicator.close();
                console.log("环境信息：" + JSON.stringify(envData));
            },

            /**
             * 获取猪种类 测试用
             */
            async getpigType(){
                
                var pigTypes = await getSOwTypeList_new();
                console.log("猪种类列表：" + JSON.stringify(pigTypes));
            },

        },
        mounted:function(){
            this.getEnv();
            this.getpigType();
        },

    }

</script>
