// @/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
      path: '/', 
      redirect: '/home' 
    },
    {
      path: '/home', 
      component: () => import('@/views/home/index.vue'), 
      name: "home", 
      meta: {
          title: '首页',
        },
    },
    
    // {
    //     path: '/control', 
    //     component: () => import('@/views/control/index.vue'), 
    //     name: "control", 
    //     meta: {
    //         title: '控制模式',
    //     },
    // },
    {
        path: '/program', 
        component: () => import('@/views/program/index.vue'), 
        name: "program", 
        meta: {
            title: '编程',
        },
    },
    {
        path: '/safety', 
        component: () => import('@/views/safety/index.vue'), 
        name: "safety", meta: {
            title: '系统安全',
        },
    },
    {
        path: '/status', 
        component: () => import('@/views/status/index.vue'), 
        name: "status", 
        meta: {
            title: '系统状态',
        },
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
