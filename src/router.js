import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Folders from './pages/Folders.vue';
import Home from './pages/Home.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainNavbarNorte from './layout/MainNavbarNorte.vue';
import MainFooter from './layout/MainFooter.vue';
import IndexUserVue from './pages/Users/IndexUser.vue';
import IndexCarpetas from '@/pages/Carpetas/IndexCarpetas.vue'
import IndexArchivos from '@/pages/Archivos/IndexArchivos.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/home',
      name: 'home',
      components: { default: Home, header: MainNavbarNorte, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/carpetas',
      name: 'carpetas',
      components: { default: IndexCarpetas, header: MainNavbarNorte, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/carpeta/:nombre',
      name: 'carpeta',
      components: {
        default: IndexArchivos,
        header: MainNavbarNorte,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      components: {
        default: IndexUserVue,
        header: MainNavbarNorte,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbarNorte },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
