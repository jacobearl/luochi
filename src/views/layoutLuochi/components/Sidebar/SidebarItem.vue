<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" >

            <el-submenu :index="item.name" :key="item.name" class="item-wrap">
                <router-link :to="'/index/realtimeScore?id=' + item.id + '&name=' + item.name" slot="title">
                    <svg-icon v-if="item.icon" :icon-class="item.icon" style="width: 20px;height:20px;margin-right:5px;"></svg-icon>
                    <span v-if="item.name" class="f18">{{item.name}}</span>
                </router-link>

                <template v-for="(child, i) in item.children">
                    <!-- <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.name"></sidebar-item> -->

                    <el-submenu :index="child.name" :key="child.name" class="child-wrap">

                        <div slot="title" class="child-menu">
                            
                            <router-link :to="item.path + child.path + '?deviceName=' + child.deviceName" :key="child.name + i" >
                                <div>
                                    
                                  <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
                                  <span v-if="child.name" slot="title" class="f17">{{child.name}}</span>
                                </div>
                            </router-link>
                        </div>


                        <router-link v-for="childOfChild in child.children" :to="item.path + childOfChild.path + '?deviceName=' + childOfChild.deviceName" :key="child.path + childOfChild.path + '?id=' + childOfChild.id">
                            <el-menu-item :index="child.name + childOfChild.name">
                                  <svg-icon v-if="childOfChild.icon" :icon-class="childOfChild.icon"></svg-icon>
                                  <span v-if="childOfChild.name" slot="title" class="f16">{{childOfChild.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>

                </template>
            </el-submenu>

        </template>
    </div>
</template>
<style>
.item-wrap > .el-menu{padding: 0 10px;}
.child-wrap > .el-submenu__title{padding-left: 0 !important;text-align: center;height: 38px !important;line-height: 38px !important;}
</style>
<style scoped>
.child-menu{/*background-color: #dcdee1 !important;*/background-color: #d9d9d9 !important; color: #4a5b79 !important; font-weight: bold;border-radius: 5px;-webkit-border-radius: 5px;}
</style>
<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    }
}
</script>
