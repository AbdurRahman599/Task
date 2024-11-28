<template>
    <div>
        <h1 class="text-xl font-bold">Product List</h1>
        <button @click="navigateToCreate" class="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
        </button>

        <table class="table-auto w-full mt-4">
            <thead>
            <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.sku }}</td>
                <td>{{ product.category.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                    <button @click="editProduct(product.id)" class="text-blue-500">Edit</button>
                    <button @click="deleteProduct(product.id)" class="text-red-500">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>

        <div v-if="pagination.total_pages > 1">
            <button v-for="page in pagination.total_pages" :key="page" @click="fetchProducts(page)">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script>
import { useProductStore } from '../stores/productStore';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useProductStore();
        const router = useRouter();

        store.fetchProducts();

        const navigateToCreate = () => router.push('/product/create');
        const editProduct = (id) => router.push(`/product/edit/${id}`);

        const deleteProduct = async (id) => {
            if (confirm('Are you sure you want to delete this product?')) {
                await store.deleteProduct(id);
                await store.fetchProducts();
            }
        };

        return {
            products: store.products,
            navigateToCreate,
            editProduct,
            deleteProduct,
        };
    },
};
</script>

