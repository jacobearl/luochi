<template>
    <section class="logo-wrap">
        <img :src="logo">
        <div>中国水泥管理平台</div>
        <!-- <div>管理平台</div> -->
    </section>
</template>

<style scoped>
.logo-wrap{margin: 0 20px;padding: 30px 0;text-align: center;font-size: 14px;font-weight: bold;color:#5d77ad;border-bottom:1px solid #e1e1e1;}
.logo-wrap>img{width: 50px;height: 50px;}
.logo-wrap>div{margin: 10px 0 0;}
</style>   
<script>

import logo from 'static/img/logo1.png'
export default {
    data(){
        return {
            logo
        }
    }
}
</script>
