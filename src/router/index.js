import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import LayoutLuochi from '../views/layoutLuochi/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [{
        path: '/login',
        roles: [],
        hidden: true,
        component: () => import ('@/views/login/index')
    }, {
        path: '/404',
        roles: [],
        hidden: true,
        component: () => import ('@/views/404')
    },

    {
        path: '/',
        // component: Layout,
        // redirect: '/home',
        component: LayoutLuochi,
        redirect: '/index/index',
        name: '首页',
        roles: [],
        hidden: true,
        children: [{
            path: 'home',
            component: () => import ('@/views/index/index')
        }]
    },

    {
        path: '/index',
        // component: Layout,
        component: LayoutLuochi,
        redirect: '/index/index',
        name: '综合评估',
        roles: ['superAdmin', 'admin'],
        meta: {
            title: '综合评估',
            icon: 'example'
        },
        hidden: true,
        children: [
            {
                path: 'index',
                // name: '综合评估',
                meta: {
                    title: '综合评估',
                    icon: 'example'
                },
                component: () => import ('@/views/index/index')
            },
            {
                path: 'details',
                name: '评分概览',
                meta: {
                    title: '评分概览',
                    icon: 'qun'
                },
                hidden: true,
                component: () => import ('@/views/index/details')
            },
            {
                path: 'detail',
                name: '评分详情',
                meta: {
                    title: '评分详情',
                    icon: 'qun'
                },
                hidden: true,
                component: () => import ('@/views/index/detail')
            },
            {
                path: 'realtimeScore',
                name: '设备实时分值',
                meta: {
                    title: '设备实时分值',
                    icon: 'qun'
                },
                hidden: true,
                component: () => import ('@/views/index/realtimeScore')
            }
            
        ]
    },

 

    {
        path: '*',
        roles: [],
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})