<template>
    <el-card shadow="hover">
            
        <section class="dq-wrap ub ub-ver">
            <img :src="imgs[colorType]" class="dq-ico">

            <p v-if="colorType === '0'" class="f26 fb c-red dq-tit">出现问题</p>
            <p v-if="colorType === '1'" class="f26 fb c-green dq-tit">处理建议</p>

            <ul class="dq-ul ub-f1 ub ub-ver f20">
                <li class="ub-f1">齿侧间隙较大，齿面出现磨损怎么办？</li>
                <li class="ub-f1">齿侧间隙较大，齿面出现磨损怎么办？</li>
                <li class="ub-f1">齿侧间隙较大，齿面出现磨损怎么办？</li>
                <li class="ub-f1">齿侧间隙较大，齿面出现磨损怎么办？</li>
                <li class="ub-f1">齿侧间隙较大，齿面出现磨损怎么办？</li>
            </ul>
        </section>
    </el-card>
</template>

<script>

import wen_red from 'static/img/wen_red.png'
import wen_green from 'static/img/wen_green.png'


export default {
    props: [ 'colorType' ],
    data(){
        return {
            imgs: [ wen_red, wen_green ]
        }
    },

    mounted(){

    },
    methods:{
        

    }
}

</script>


<style scope>
.dq-wrap{position: absolute;top:0;left:0;width:100%;height:100%;}
.dq-ico{position:absolute;left:0;top:0;width: 20%;}
.dq-tit{padding: 15% 0 3% 15%;margin: 0;}
.dq-ul{padding: 0 2% 0 11%;margin-top: 10px;}
</style>




