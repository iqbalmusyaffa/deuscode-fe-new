<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <h1 class="text-2xl font-semibold">Lihat Produk</h1>
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.stock }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="getImageUrl(product.image)" alt="Product Image" class="w-16 h-16 object-cover" v-if="product.image" />
                <span v-else>No Image</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.User?.name || 'Unknown' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  User: {
    name: string;
  };
}

const products = ref<Product[]>([]); // Define the type for products
const isLoading = ref(true);
const error = ref<string | null>(null); // Allow error to be either string or null

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    console.log(response.data); // Debugging line to check the structure of the data
    products.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch products';
    console.error('Error fetching products:', err);
  } finally {
    isLoading.value = false;
  }
};

const getImageUrl = (imagePath: string | null) => {
  return imagePath ? `http://localhost:3000/${imagePath}` : '';
};

onMounted(fetchProducts);
</script>

<style scoped>
/* Add your styles here */
</style>
