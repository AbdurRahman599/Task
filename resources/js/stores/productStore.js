import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [],
        categories: [],
        pagination: {},
        product: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchProducts(page = 1) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/products?page=${page}`);
                this.products = response.data.data;
                this.pagination = {
                    current_page: response.data.current_page,
                    total_pages: response.data.last_page,
                    total_items: response.data.total,
                };
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch products.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchCategories() {
            this.loading = true;
            try {
                const response = await axios.get('/categories'); // Call your API endpoint
                this.categories = response.data; // Store the fetched categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                this.loading = false;
            }
        },

        async getProductById(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/products/${id}`);
                this.product = response.data;
                return this.product; // Return the product for local use
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch the product.';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createProduct(data) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post('/products', data);
                this.products.unshift(response.data); // Add the new product to the list
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create the product.';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateProduct(id, data) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`/products/${id}`, data);
                const index = this.products.findIndex((product) => product.id === id);
                if (index !== -1) {
                    this.products[index] = response.data; // Update the product in the list
                }
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update the product.';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async deleteProduct(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`/products/${id}`);
                this.products = this.products.filter((product) => product.id !== id); // Remove the deleted product
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete the product.';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
