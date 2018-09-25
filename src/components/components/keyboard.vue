<template>
  <div class="keyboard ub ubt bg_w">
       <ul class="ub-f1 keydata clearfloat">
       <li class="keyitme ub ub-ac ub-pc ubb ubr" @click="itemClick(1)">1</li>
       <li class="keyitme ub ub-ac ub-pc ubb ubr" @click="itemClick(2)">2</li> 
       <li class="keyitme ub ub-ac ub-pc ubb" @click="itemClick(3)">3</li>  
       <li class="keyitme ub ub-ac ub-pc ubb ubr" @click="itemClick(4)">4</li>  
       <li class="keyitme ub ub-ac ub-pc ubb ubr" @click="itemClick(5)">5</li>  
       <li class="keyitme ub ub-ac ub-pc ubb" @click="itemClick(6)">6</li>  
       <li class="keyitme ub ub-ac ub-pc ubt ubr" @click="itemClick(7)">7</li>  
       <li class="keyitme ub ub-ac ub-pc ubt ubr" @click="itemClick(8)">8</li> 
       <li class="keyitme ub ub-ac ub-pc ubt" @click="itemClick(9)">9</li>  
       <li class="keyitme ub ub-ac ub-pc ubr ubt" @click="pointClick('.')">.</li>  
       <li class="keyitme ub ub-ac ub-pc ubr ubt" @click="itemClick(0)">0</li>
       <li class="eliminate ub ub-ac ub-pc ubt" @click="clear()">清除</li>   
       </ul>
       <ul class="ub keybtn ub-ver">
            <li class="btnitme  btnicon ub ub-ac ub-pc bg_w ubl" @click="backStep"></li> 
            <li class="btnitme ub ub-ac ub-pc ubl body_bg ubt" @click="next()">{{nextext}}</li>
       </ul>
    </div>
</template>

<script>
export default {
    name:"keyboard",
    props:['editval','keybordset','nextext'],
    data(){return{}},
    computed:{
        maxLeng:function(){
            return this.getLeng();
        },
        maxVal:function(){
            return this.getmaxVal();
        },
        minVal:function(){
            return this.getminVal();
        },
        isInteger:function(){
            return this.getIsInteger();
        },
    },
    methods:{
        itemClick:function(val){
              
              if(this.keybordset.disable ) {return;}
                
              if(!this.isInteger && this.maxLeng){ //
                    if(this.editval && this.editval.length == this.maxLeng){
                        alert("输入长度不能超过"+ this.maxLeng +"位",2000,5);
                        return;
                    }
              }
              
              if(this.maxVal){
                    if(this.editval){
                        var futrueVal = parseFloat(this.editval+"" + val) ;
                        if(futrueVal > this.maxVal){
                            alert("输入不能大于"+ this.maxVal);
                            return;
                        }
                    }else{
                        if(parseFloat(val) > this.maxVal){
                            val = this.maxVal;
                            alert("当前输入不能大于"+ this.maxVal);
                        }
                    }
              }
              
                
              this.$emit('fulldata',val);
         },
         
         //小树点
         pointClick:function(){
            if(this.keybordset.disable) {return;}
            if(this.isInteger) { //是整数
                return ;
            }
            
            if(this.editval.toString().indexOf(".") >= 0){
                return;
            }
            
            this.itemClick(".");
         },
         //清空
         clear:function(){
            this.$emit('clear');
         },
         //退格
         backStep:function(){
            if(this.editval){
                if(this.editval.toString().length == 1){
                    this.clear();
                }else{
                    var newVal = this.editval.substring(0,this.editval.length -1);
                    this.$emit('fulldata',newVal,1);
                }
            }
         },
         
         next:function(){
              switch(this.nextext){
                    case "下一项":
                        this.$emit('nextitem');
                    break;
                    case "下一条":
                        this.$emit('nextobj');
                    break;
                    case "下一步":
                        this.$emit('commit');
                    break;
                    case "提交":
                        this.$emit('commit');
                    break;
                    
              }
         },
         
         getLeng:function(){
            return  this.keybordset.length;
         },
         getmaxVal:function(){
            return this.keybordset.maxVal ;
         },
         getminVal:function(){
            return this.keybordset.minVal ;
         },
         getIsInteger:function(){
            return this.keybordset.isInteger;
         }
         
    },

}
</script>

