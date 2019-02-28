/* Layout */
import Layout from '../views/layout/Layout'

const superAdmin = [{
        path: '/login',
        component: () => import ('@/views/login/index'),
        hidden: true
    }, {
        path: '/404',
        component: () => import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: '首页',
        hidden: true,
        children: [{
            path: 'home',
            component: () => import ('@/views/home/index')
        }]
    },

    {
        path: '/leekassit',
        component: Layout,
        redirect: '/leekassit/send',
        name: '韭菜助手',
        meta: {
            title: '韭菜助手',
            icon: 'tree'
        },
        children: [
            {
                path: 'send',
                name: '推送动态',
                meta: {
                    title: '推送动态',
                    icon: 'example'
                },
                component: () => import ('@/views/leekassit/send')
            },
            {
                path: 'sendMonitor',
                name: '监控结果推送',
                meta: {
                    title: '监控结果推送',
                    icon: 'example'
                },
                component: () => import ('@/views/leekassit/sendMonitor')
            },
            {
                path: 'check',
                name: '密圈文章审核',
                meta: {
                    title: '密圈文章审核',
                    icon: 'eye'
                },
                component: () => import ('@/views/leekassit/check')
            }
        ]
    },

    {
        path: '/robot',
        component: Layout,
        redirect: '/robot/send',
        name: '微信机器人',
        meta: {
            title: '微信机器人',
            icon: 'user'
        },
        children: [
            {
                path: 'send',
                name: '消息发送',
                meta: {
                    title: '消息发送',
                    icon: 'form'
                },
                component: () => import ('@/views/robot/send')
            },
            {
                path: 'list',
                name: '消息列表',
                meta: {
                    title: '消息列表',
                    icon: 'table'
                },
                component: () => import ('@/views/robot/list')
            }
        ]
    },

    {
        path: '/web3',
        component: Layout,
        redirect: '/web3/index',
        name: '以太坊contract',
        meta: {
            title: '以太坊contract',
            icon: 'user'
        },
        children: [
            {
                path: 'index',
                name: '以太坊contract',
                meta: {
                    title: '以太坊contract',
                    icon: 'form'
                },
                component: () => import ('@/views/web3/index')
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const admin = [{
        path: '/login',
        component: () => import ('@/views/login/index'),
        hidden: true
    }, {
        path: '/404',
        component: () => import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/robot',
        name: '微信机器人',
        hidden: true
    },

    {
        path: '/robot',
        component: Layout,
        redirect: '/robot/send',
        name: '微信机器人',
        meta: {
            title: '微信机器人',
            icon: 'user'
        },
        children: [
            {
                path: 'send',
                name: '消息发送',
                meta: {
                    title: '消息发送',
                    icon: 'form'
                },
                component: () => import ('@/views/robot/send')
            },
            {
                path: 'list',
                name: '消息列表',
                meta: {
                    title: '消息列表',
                    icon: 'table'
                },
                component: () => import ('@/views/robot/list')
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const visitor = [{
        path: '/login',
        component: () => import ('@/views/login/index'),
        hidden: true
    }, {
        path: '/404',
        component: () => import ('@/views/404'),
        hidden: true
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const rolesRouter = {
    'superAdmin' : superAdmin,
    'admin' : admin,
    'visitor': visitor
}


export default rolesRouter
