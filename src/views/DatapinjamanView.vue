<script setup lang="ts">
import { ref, computed } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Data Pinjaman')
const loans = ref([
  { loanType: 'Pinjaman Dana', name: 'Yoga Firmansyah', id: '13', date: '13-03-2023', status: 'Pengguna aktif', data: 'Disetujui', action: 'Aktif' },
  { loanType: 'Pinjaman Dana', name: 'Nabila Azzahra', id: '13', date: '13-04-2023', status: 'Pengguna aktif', data: 'Disetujui', action: 'Aktif' },
  { loanType: 'Pinjaman Dana', name: 'Vaiza', id: '13', date: '13-05-2024', status: 'Pengguna aktif', data: 'Disetujui', action: 'Selesai' },
  // Add more loans as needed
])

const rowsPerPage = ref(20)
const rowsPerPageOptions = [1, 5, 10, 20, 50]
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(loans.value.length / rowsPerPage.value))
const paginatedLoans = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  return loans.value.slice(start, end)
})

const addLoan = () => {
  console.log('Add loan logic')
}

const editLoan = (loanId: string) => {
  console.log(`Edit loan ${loanId}`)
}

const deleteLoan = (loanId: string) => {
  console.log(`Delete loan ${loanId}`)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->

      <div class="table-container p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
        <div class="header flex items-center justify-between mb-4">
          <h1 class="text-2xl font-semibold">Pinjaman</h1>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            @click="addLoan"
          >
            Tambahkan
          </button>
        </div>

        <!-- Filter Section -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <label for="rowsPerPage" class="block text-sm font-medium text-gray-700">Show</label>
            <select
              id="rowsPerPage"
              class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              v-model="rowsPerPage"
            >
              <option v-for="option in rowsPerPageOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div>
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pinjaman</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pinjaman</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Pinjaman</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="loan in paginatedLoans" :key="loan.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ loan.loanType }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ loan.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ loan.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ loan.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{'bg-green-100 text-green-800': loan.status === 'Pengguna aktif', 'bg-red-100 text-red-800': loan.status !== 'Pengguna aktif'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ loan.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{'bg-green-100 text-green-800': loan.data === 'Disetujui', 'bg-red-100 text-red-800': loan.data !== 'Disetujui'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ loan.data }}
                  </span>
                  <span :class="{'bg-green-100 text-green-800': loan.action === 'Aktif', 'bg-yellow-100 text-yellow-800': loan.action === 'Selesai'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ loan.action }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="editLoan" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button @click="deleteLoan" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="mt-4 flex items-center justify-between">
          <button
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Previous
          </button>
          <button
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style>
/* Add any additional custom styles here */
</style>
