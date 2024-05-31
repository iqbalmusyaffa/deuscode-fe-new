import { createRouter, createWebHistory } from 'vue-router';
import Loginpage from '@/views/Authentication/Loginpage.vue';
import ECommerceView from '@/views/Dashboard/ECommerceView.vue';
import DatapenggunaView from '@/views/DatapenggunaView.vue';
import DataprodukView from '@/views/DataprodukView.vue';
import TambahProdukView from '@/views/TambahprodukView.vue';
import EditProdukView from '@/views/EditprodukView.vue';
import LihatProdukView from '@/views/LihatprodukView.vue';
import DataPinjamanView from '@/views/DatapinjamanView.vue';

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
    }
  },
  {
    path: '/datapengguna',
    name: 'datapengguna',
    component: DatapenggunaView,
    meta: {
      title: 'Data Pengguna',
    }
  },
  {
    path: '/dataproduk',
    name: 'dataproduk',
    component: DataprodukView,
    meta: {
      title: 'Data Produk',
    }
  },
  {
    path: '/tambah-produk',
    name: 'tambahProduk',
    component: TambahProdukView,
    meta: {
      title: 'Tambah Produk',
    }
  },
  {
    path: '/edit-produk/:id',
    name: 'editProduk',
    component: EditProdukView,
    meta: {
      title: 'Edit Produk',
    }
  },
  {
    path: '/lihat-produk/:id',
    name: 'lihatProduk',
    component: LihatProdukView,
    meta: {
      title: 'Lihat Produk',
    }
  },
  {
    path: '/datapinjaman',
    name: 'datapinjaman',
    component: DataPinjamanView,
    meta: {
      title: 'Data Pinjaman',
    }
  },
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
    const token = localStorage.getItem('token');
    if (!token) {
      // User is not authenticated, redirect to login page
      next({ name: 'login' });
    } else {
      // User is authenticated, proceed to the route
      next();
    }
  } else {
    // Route does not require authentication, proceed
    next();
  }

  // If the user is already authenticated and tries to access the login page,
  // redirect them to the dashboard
  if (to.name === 'login' && localStorage.getItem('token')) {
    next({ name: 'dashboard' }); // Redirect to dashboard if already authenticated
  }
});

export default router;
