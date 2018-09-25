<template>
    <div class="up ub-ver">
        <keyboard :keybordset="keyboardSet" :editval="curDays" :nextext="editState" v-on:fulldata="fullData" v-on:clear="clear" v-on:nextobj="nextObj" v-on:commit="commit"> </keyboard>
        <div class="body_box">
            <div class="Tnav top_bg ub col_w">
                <div class="ub navicon ub-ac ub-pc" @click="backPage()">
                    <div class="fa fa-angle-left fa-2x"></div>
                </div>
                <div class="ub-f1 tx-c ulev-3 ">
                    <span>引种后备</span>
                    <span>总
                        <strong class="ulev1 font_bold">{{yz_total}}</strong>头</span>
                </div>
                <div class="ub" @click="submit()">
                    提交
                </div>
            </div>
            <div class="guidance guidanceone"></div>
            <div class="piginfo ub ub-ver bg_w">
                <h1 class="tx-c fontt_h">耳标:{{curEarTag}}</h1>
                <div class="ub ub-f1 entering body_text ubt">
                    <div class="ub-f1 ub ub-ac fontt_one">
                        正在录入第
                        <span class="col_b font_bold">{{editIndex+1}}</span>头
                    </div>
                    <!-- 可以点击时显示成黑色  amendmore-->
                    <div class="ub-f1 amenddata tx-r fontt_one">
                        修改已录入数据
                        <i class="body_text fa fa-angle-right fa-2x"></i>
                    </div>
                </div>
            </div>

            <div class="datamain datahintp  fontt_one body_text">
                <p class="tx-c fontt_one um_text hintp">
                    填写天数或者出生日期
                </p>
                <div class="itme ub numberday uba bor-r ">
                    <div class="ub itme_name">
                        出生天数
                    </div>
                    <div class="sc-bg-active uinput itme_value  ub ub-ac ub-f1  bc-border">
                        <input placeholder="" type="text" class="ub-f1 ub tx-r ub-ac fontt_one" disabled v-model="curDays" />
                        <div class="string"></div>
                    </div>
                    <div class="ub itme_unit tx-c">
                        (天)
                    </div>
                </div>
                <div class="elevator tx-c ubt">
                    <span>或</span>
                </div>
                <div class="itme ub dateline  uba bor-r">
                    <div class="ub itme_name">
                        出生日期
                    </div>
                    <div class="sc-bg-active uinput itme_value  ub-ac  ub ub-f1  bc-border">
                        <input placeholder="" type="text" class="ub-f1 ub tx-r ub-ac fontt_one" disabled v-model="bornDate" />
                        <div class="string"></div>
                    </div>
                    <div class="ub itme_time"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import "../../assets/fonts/font-awesome.min.css";
@import "../../assets/css/ui-box.css";
@import "../../assets/css/ui-base.css";
@import "../../assets/css/resets.css";
@import "../../assets/css/feeding.css";
@import "../../assets/css/keyboard.css";
</style>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { getCurrentDate, minusDate } from "../utils/util"
import keyboard from '../components/keyboard'
export default {
    name: "sowReversePig",
    data () {
        return {
            keyboardSet: {
                length: "3",
                maxVal: "365",
                minVal: "",
                disable: false, //键盘是否可用
                isInteger: true, //是否整数
            },
            focusItem: "bornDays",
            editIndex: 0, //当前编辑位置

            curMilsId: 1,

            rsMilsId: 3,
            brMilsId: 4,
            khMilsId: 6,

            curPigs: [],

        }
    },
    components: {
        keyboard: keyboard,
    },
    methods: {
        /**
         * 返回
         */
        backPage: function () {
            this.$router.back();
        },

        /**
         * 初始化
         */
        init: function () {
            this.curPigs = this.getPigsByMileid_Rev;
            console.log("当前猪列表：" + JSON.stringify(this.curPigs));
        },

        //提交
        submit: function () {
            alert("提交");
        },
        //填满
        fullData: function () {
            alert("填满");
        },
        //清空
        clear: function () {
            alert("情况");
        },
        //下一项
        nextObj: function () {
            alert("下一项");
        },
        //确定
        commit: function () {
            alert("确定");
        }



    },

    computed: {
        ...mapGetters([
            'getTotalPigs', 'getPigsByMileid_Rev', 'getMileTypes'
        ]),

        //总头数
        yz_total: function () {
            return this.curPigs.length;
        },

        //当前编辑的母猪
        curEditObj: function () {
            if (this.yz_total > 0) {
                return this.curPigs[this.editIndex];
            } else {
                return '';
            }
        },
        //当前耳标 
        curEarTag: function () {
            if (this.curEditObj) {
                return this.curEditObj.earTag;
            } else {
                return "未知耳标";
            }
        },

        //阶段天数
        curDays: function () {
            if (this.curEditObj) {
                return this.curEditObj.stateDays;
            } else {
                return '0';
            }
        },

        //出生日期
        bornDate: function () {
            var today = getCurrentDate();
            if (!this.curDays) {
                return today;
            } else {
                return minusDate(today, parseInt(this.curDays));
            }
        },

        editState: function () {
            return "确定";
        },

    },

    mounted: function () {
        this.init();
    },
}
</script>
