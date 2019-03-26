<template>
    <el-scrollbar wrapClass="scrollbar-wrapper luochi">
        <logo v-show="!isCollapse"></logo> 
        <section :class="{'lc-menu': !isCollapse}">
            
            <el-menu
                mode="vertical"
                :show-timeout="200"
                :default-active="activeIndex"
                :collapse="isCollapse"
                background-color="#f0f2f3"
                text-color="#5d77ad"
                active-text-color="#4a5b79"
                menu-trigger="click"
            >
                <sidebar-item :routes="routes"></sidebar-item>
            </el-menu>
        </section>   
    </el-scrollbar>
</template>
<style>
.el-menu--vertical{height:100%;}
.scrollbar-wrapper.luochi {background-color: #f0f2f3;}
.scrollbar-wrapper.luochi .nest-menu .el-submenu > .el-submenu__title{background-color: #f0f2f3;}
.scrollbar-wrapper.luochi .el-icon-arrow-down:before{display:none;}
.lc-menu{padding: 20px;}
.lc-menu .el-submenu__title{padding-left: 20px !important;}
.scrollbar-wrapper.luochi .el-submenu__title{height: 44px;line-height: 44px;margin-bottom: 10px;background-color: #fff !important;border-radius: 5px;-webkit-border-radius: 5px;color:#5d77ad !important;font-weight: 600;font-size: 16px;padding: 0;}
/*.scrollbar-wrapper.luochi .el-menu--inline>a{margin-top: 10px;}*/
.scrollbar-wrapper.luochi .el-submenu .el-menu-item{height: 36px;line-height: 36px;margin-bottom: 8px;padding-left:0;text-align: center;border-radius: 5px;-webkit-border-radius: 5px;min-width: 0;color: #6b7991 !important;}

.el-menu--vertical .el-submenu__title{padding: 0 !important;}
.el-menu--vertical .el-menu--popup-right-start{margin: 0;}
.el-menu--vertical .child-menu{border-radius: 0 !important;}
#app .sidebar-container .luochi .el-submenu .el-menu-item.is-active{background-color: #f0f2f3 !important;color:#4a5b79;font-weight: bold;}
</style>
<script>
import { APIGetCommonMenu } from '@/api/luochi'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import logo from './logo'

export default {
    data(){
        return {
            activeIndex: '',
            routes: []
        }
    },
    components: { SidebarItem, logo },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened
        }
    },

    mounted(){
        this.init();
    },
    methods: {
        init(){

            APIGetCommonMenu().then(res => {
                let arr = [];
                res.data.forEach( (first, i) => {
                    arr.push({
                        id: first.id,
                        name: first.proLineName,
                        icon: 'prod',
                        path: '/index',
                        children: []
                    })
                    if (first.equipmentVOList && first.equipmentVOList.length > 0){

                        first.equipmentVOList.forEach((sec, j) => {
                            arr[i].children.push({
                                id: sec.proLineId,
                                deviceName: sec.deviceName,
                                name: sec.equipmentName,
                                path: '/details',
                                children: []
                            });

                            if (sec.sparePartVOList && sec.sparePartVOList.length > 0){
                                sec.sparePartVOList.forEach( (third, k) => {

                                    arr[i].children[j].children.push({
                                        id: third.id,
                                        deviceName: third.deviceName,
                                        name: third.sparePartName,
                                        path: '/detail'
                                    })
                                })
                            }
                        })
                    }
                })

                this.routes = arr;
            })
            // setTimeout(() => {

                // let data =  [{
                //     "id": "0632f59f06384434b1a1589520edd89e", //生产线编号
                //     "proLineName": "一号生产线", //生产线名称
                //     "createTime": "2019-02-20T16:00:00.000+0000", //生产线创建时间
                //     "equipmentVOList": [{
                //         "id": "405f6ed449694dcd95d9148aa972bf78", //设备ID
                //         "equipmentName": "2#辊压减速机", //设备名称
                //         "deviceName": "ASK_01_0002", //设备编号
                //         "proLineId": "0632f59f06384434b1a1589520edd89e",//所属生产线id
                //         "createTime": "2019-02-20T16:00:00.000+0000", //设备创建时间
                //         "sparePartVOList": [{
                //             "id": "1e50a184-bfaf-4497-bbad-683b3dda0828",//零件id
                //             "sparePartName": "轴承", //零件名称
                //             "equipmentId": "405f6ed449694dcd95d9148aa972bf78",//零件所属设备id
                //             "deviceName": "ASK_01_0002", //零件所属设备编号
                //             "createTime": "2019-02-22T04:03:47.000+0000" //零件创建时间
                //         }, {
                //             "id": "4235ad1c-6e48-4b42-9928-8742d6f4dca4",
                //             "sparePartName": "三级齿轮",
                //             "equipmentId": "405f6ed449694dcd95d9148aa972bf78",
                //             "deviceName": "ASK_01_0002",
                //             "createTime": "2019-02-22T04:03:46.000+0000"
                //         }, {
                //             "id": "5750138c-d151-49e8-b7c7-caec101420ad",
                //             "sparePartName": "一级齿轮",
                //             "equipmentId": "405f6ed449694dcd95d9148aa972bf78",
                //             "deviceName": "ASK_01_0002",
                //             "createTime": "2019-02-22T04:03:46.000+0000"
                //         }, {
                //             "id": "abda04cc-558a-49f3-8828-8bcaafc15ba9",
                //             "sparePartName": "高速轴",
                //             "equipmentId": "405f6ed449694dcd95d9148aa972bf78",
                //             "deviceName": "ASK_01_0002",
                //             "createTime": "2019-02-22T04:03:47.000+0000"
                //         }, {
                //             "id": "f7ad08d6-9ca7-45ba-9a27-eddc02563b94",
                //             "sparePartName": "二级齿轮",
                //             "equipmentId": "405f6ed449694dcd95d9148aa972bf78",
                //             "deviceName": "ASK_01_0002",
                //             "createTime": "2019-02-22T04:03:46.000+0000"
                //         }]
                //     }]
                // }]

                

                // this.activeIndex = '生产线1';
                // this.routes = [
                //     {
                //         name: '生产线1',
                //         icon: 'prod',
                //         path: '/index',
                //         children: [
                //             {
                //                 name: '立磨减速机',
                //                 path: '/index',
                //                 children: [
                //                     {
                //                         name: '一级齿轮',
                //                         path: '/details?id=1'
                //                     },
                //                     {
                //                         name: '二级齿轮',
                //                         path: '/details?id=2'
                //                     },
                //                     {
                //                         name: '三级齿轮',
                //                         path: '/details?id=3'
                //                     },
                //                     {
                //                         name: '高速轴',
                //                         path: '/details?id=4'
                //                     },
                //                     {
                //                         name: '轴承',
                //                         path: '/details?id=5'
                //                     }
                //                 ]
                //             }
                            
                //         ]
                //     },
                //     {
                //         name: '生产线2',
                //         icon: 'prod',
                //         path: '/index',
                //         children: [
                //             {
                //                 name: '立磨减速机2',
                //                 path: '/index',
                //                 children: [
                //                     {
                //                         name: '一级齿轮',
                //                         path: '/details?id=1'
                //                     },
                //                     {
                //                         name: '二级齿轮',
                //                         path: '/details?id=2'
                //                     },
                //                     {
                //                         name: '三级齿轮',
                //                         path: '/details?id=3'
                //                     }
                //                 ]
                //             }
                            
                //         ]
                //     },
                //     {
                //         name: '生产线3',
                //         icon: 'prod',
                //         path: '/index',
                //         children: [
                //             {
                //                 name: '立磨减速机3',
                //                 path: '/index',
                //                 children: [
                //                     {
                //                         name: '一级齿轮',
                //                         path: '/details?id=1'
                //                     },
                //                     {
                //                         name: '二级齿轮',
                //                         path: '/details?id=2'
                //                     },
                //                     {
                //                         name: '三级齿轮',
                //                         path: '/details?id=3'
                //                     }
                //                 ]
                //             }
                            
                //         ]
                //     },
                // ]
            // }, 500)


        }
    }
}
</script>
