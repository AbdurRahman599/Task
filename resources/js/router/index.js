import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../pages/ProductList.vue';
import ProductForm from '../pages/ProductForm.vue';

const routes = [
    {
        path: '/',
        name: 'ProductList',
        component: ProductList,
    },
    {
        path: '/product/create',
        name: 'ProductCreate',
        component: ProductForm,
    },
    {
        path: '/product/edit/:id',
        name: 'ProductEdit',
        component: ProductForm,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
