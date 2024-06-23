<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <div class="table-container p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-semibold">Data Pengguna</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.phone }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{'bg-green-100 text-green-800': user.status === 'Active', 'bg-red-100 text-red-800': user.status === 'Inactive'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="text-indigo-600 hover:text-indigo-900" @click="openEditUserModal(user)">Edit</button>
                  <button class="text-red-600 hover:text-red-900 ml-4" @click="deleteUser(user.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination Controls -->
          <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/utils/axiosInstance.js'; // Ensure the .js extension is included
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

// Interfaces for User and ModalUser
interface User {
  id: number;
  name: string;
  status: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  roleId: number;
}

interface ModalUser {
  id?: number;
  name: string;
  status: string;
  email: string;
  phone: string;
  statusId: number;
  roleId: number;
}

// Refs for data and state management
const pageTitle = ref('Data Pengguna');
const users = ref<User[]>([]);
const rowsPerPage = ref(5);
const rowsPerPageOptions = [1, 5, 10, 20, 50];
const currentPage = ref(1);

const showAddUserModal = ref(false);
const showEditUserModal = ref(false);

const newUser = ref<ModalUser>({
  name: '',
  status: '',
  email: '',
  phone: '',
  statusId: 0,
  roleId: 0,
});

const editUserData = ref<ModalUser>({
  id: 0,
  name: '',
  status: '',
  email: '',
  phone: '',
  statusId: 0,
  roleId: 0,
});

const error = ref(null);
const isLoading = ref(true);

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get('/user/');
    users.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch data';
    console.error('Error fetching users:', err);
  } finally {
    isLoading.value = false;
  }
};

const addUser = async () => {
  try {
    const response = await axiosInstance.post('/user/', newUser.value);
    users.value.push(response.data);
    closeAddUserModal();
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const updateUser = async () => {
  try {
    const response = await axiosInstance.put(`/user/${editUserData.value.id}`, editUserData.value);
    const index = users.value.findIndex(user => user.id === editUserData.value.id);
    if (index !== -1) {
      users.value[index] = response.data;
    }
    closeEditUserModal();
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (userId: number) => {
  try {
    await axiosInstance.delete(`/user/${userId}`);
    users.value = users.value.filter(user => user.id !== userId);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleRowsPerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  rowsPerPage.value = parseInt(target.value);
  currentPage.value = 1; // Reset to first page when rows per page changes
};

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(users.value.length / rowsPerPage.value);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return users.value.slice(start, end);
});

// Modal control methods
const openAddUserModal = () => {
  showAddUserModal.value = true;
};

const closeAddUserModal = () => {
  showAddUserModal.value = false;
  newUser.value = {
    name: '',
    status: '',
    email: '',
    phone: '',
    statusId: 0,
    roleId: 0,
  };
};

const openEditUserModal = (user: User) => {
  showEditUserModal.value = true;
  editUserData.value = { ...user };
};

const closeEditUserModal = () => {
  showEditUserModal.value = false;
  editUserData.value = {
    id: 0,
    name: '',
    status: '',
    email: '',
    phone: '',
    statusId: 0,
    roleId: 0,
  };
};

// Fetch users on component mount
onMounted(fetchUsers);
</script>

<style scoped>
/* Add your styles here */
</style>
