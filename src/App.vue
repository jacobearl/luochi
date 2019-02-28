<template>
  	<div id="app" :class="[isTest]">
    	<router-view></router-view>
  	</div>
</template>

<script>
export default {
  	name: 'App',
  	data(){
  		return {
  			isTest: ''
  		}
  	},
  	mounted(){

  		this.checkTest();
  	},
  	methods: {

  		checkTest(){

  			if (location.href.indexOf("test2.") > -1){  //测试服变色

  				this.isTest = 'test'
  			}
  		}
  	}
}
</script>
<style>
#app.test .navbar, #app.test .el-menu{background-color: #f08080 !important;color:#fff !important;}
/*#app.test .el-menu-item.is-active{background-color: #ff4500 !important;}*/
</style>
