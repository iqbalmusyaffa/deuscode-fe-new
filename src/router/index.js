import { createRouter, createWebHistory } from 'vue-router';
import Loginpage from '@/views/Authentication/Loginpage.vue';
import ECommerceView from '@/views/Dashboard/ECommerceView.vue';
import DatapenggunaView from '@/views/DatapenggunaView.vue';
import DataprodukView from '@/views/DataprodukView.vue';
import TambahProdukView from '@/views/TambahprodukView.vue';
import EditProdukView from '@/views/EditprodukView.vue';
import LihatProdukView from '@/views/LihatprodukView.vue';
import DataPinjamanView from '@/views/DatapinjamanView.vue';
import LaporankeuanganView from '@/views/LaporankeuanganView.vue';
import PengajuanpinjamanView from '@/views/PengajuanpinjamanView.vue';
import PengumunanpenggunaView from '@/views/PengumunanpenggunaView.vue';
import KontenwebsiteView from '@/views/KontenwebsiteView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect root path to login page
  },
  {
    path: '/login',
    name: 'login',
    component: Loginpage,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: ECommerceView,
    meta: {
      title: 'Dashboard',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/datapengguna',
    name: 'datapengguna',
    component: DatapenggunaView,
    meta: {
      title: 'Data Pengguna',
      requiresAuth: true, // Requires authentication
      requiresAdmin: true // Requires admin role
    }
  },
  {
    path: '/dataproduk',
    name: 'dataproduk',
    component: DataprodukView,
    meta: {
      title: 'Data Produk',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/tambah-produk',
    name: 'tambahProduk',
    component: TambahProdukView,
    meta: {
      title: 'Tambah Produk',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/edit-produk/:id',
    name: 'editProduk',
    component: EditProdukView,
    meta: {
      title: 'Edit Produk',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/lihat-produk/:id',
    name: 'lihatProduk',
    component: LihatProdukView,
    meta: {
      title: 'Lihat Produk',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/datapinjaman',
    name: 'datapinjaman',
    component: DataPinjamanView,
    meta: {
      title: 'Data Pinjaman',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/laporankeuangan',
    name: 'laporankeuangan',
    component: LaporankeuanganView,
    meta: {
      title: 'Laporan Keuangan',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/pengajuanpinjaman',
    name: 'pengajuanpinjaman',
    component: PengajuanpinjamanView,
    meta: {
      title: 'Pengajuan Pinjaman',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/pengumumanpengguna',
    name: 'pengumumanpengguna',
    component: PengumunanpenggunaView,
    meta: {
      title: 'Pengumuman Pengguna',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/kontenwebsite',
    name: 'kontenwebsite',
    component: KontenwebsiteView,
    meta: {
      title: 'Konten Website',
      requiresAuth: true // Requires authentication
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Web Admin Koperasi dan Jual Beli'}`;

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('userToken');
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }

  // Redirect if already logged in and accessing login page
  if (to.name === 'login' && localStorage.getItem('userToken')) {
    next({ name: 'dashboard' });
  }

  // Admin role check
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      alert('Anda tidak memiliki izin untuk melihat halaman ini.');
      next({ name: 'Home' });
    } else {
      next();
    }
  }
});

export default router;
