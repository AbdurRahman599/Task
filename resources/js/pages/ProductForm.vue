<script>
import { useProductStore } from '../stores/productStore';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const store = useProductStore();
        const router = useRouter();
        const route = useRoute();

        const form = ref({
            name: '',
            sku: '',
            category_id: null,
            quantity: 0,
            price: 0,
        });

        const isEdit = ref(false);

        onMounted(async () => {
            await store.fetchCategories();
            console.log('Categories fetched:', store.categories);

            if (route.params.id) {
                isEdit.value = true;
                const product = await store.getProductById(route.params.id);
                Object.assign(form.value, product);
            }
        });

        const submitForm = async () => {
            try {
                if (isEdit.value) {
                    await store.updateProduct(route.params.id, form.value);
                    alert('Product updated successfully!');
                } else {
                    await store.createProduct(form.value);
                    alert('Product created successfully!');
                    resetForm();
                }
                router.push('/');
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        };

        return {
            form,
            isEdit,
            categories: store.categories,
            submitForm,
        };
    },
};
</script>

<template>
    <div>
        <h1 class="text-xl font-bold mb-2">{{ isEdit ? 'Edit Product' : 'Create Product' }}</h1>
        <form @submit.prevent="submitForm">
            <label>
                Name:
                <input v-model="form.name" type="text" required />
            </label>

            <label>
                SKU:
                <input v-model="form.sku" type="text" required />
            </label>

            <label>
                Category:
                <select v-model="form.category_id" required>
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </label>

            <label>
                Quantity:
                <input v-model="form.quantity" type="number" required />
            </label>

            <label>
                Price:
                <input v-model="form.price" type="number" step="0.01" required />
            </label>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                {{ isEdit ? 'Update' : 'Create' }}
            </button>
        </form>
    </div>
</template>
