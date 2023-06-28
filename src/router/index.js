import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router';
// import axios from 'axios';
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index/index.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/index/home.vue'),
    },
];
const router = createRouter({
    //创建路由实例
    history: createWebHistory(),
    routes
});
//定义全局导航守卫
router.beforeEach((to, from, next) => {
    next();
});
export default router;
