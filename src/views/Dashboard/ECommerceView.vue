<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import ChartOne from '@/components/Charts/ChartOne.vue'
import ChartThree from '@/components/Charts/ChartThree.vue'
import ChartTwo from '@/components/Charts/ChartTwo.vue'
import ChatCard from '@/components/ChatCard.vue'
import MapOne from '@/components/Maps/MapOne.vue'
import TableOne from '@/components/Tables/TableOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';

const data = ref(null);

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  const token = localStorage.getItem('accessToken'); // Mengambil token dari localStorage
  try {
    const response = await axios.get('/api/dashboard-data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    data.value = response.data;
  } catch (error: any) {
    console.error('Failed to fetch dashboard data:', error);
    if (error.response && error.response.status === 401) {
      alert('Session expired. Please login again.');
      import.meta.env.VUE_ROUTER.push('/login');
    }
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Chart One Start -->
      <ChartOne />
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <ChartTwo />
      <!-- ====== Chart Two End -->

      <!-- ====== Chart Three Start -->
      <ChartThree />
      <!-- ====== Chart Three End -->

      <!-- ====== Map One Start -->
      <MapOne />
      <!-- ====== Map One End -->

      <!-- ====== Table One Start -->
      <div class="col-span-12 xl:col-span-8">
        <TableOne />
      </div>
      <!-- ====== Table One End -->

      <!-- ====== Chat Card Start -->
      <ChatCard />
      <!-- ====== Chat Card End -->
    </div>
  </DefaultLayout>
</template>
