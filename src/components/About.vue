<template>
    <div id="about">
        this is about page
    </div>
</template>


<script>
    import {Toast} from 'mint-ui'
    export default{
        nama:"about",
        created(){
            Toast({
                message: '提示',
                position: 'bottom',
                duration: 5000
            });

        }
    }


</script>