import { createRouter, createWebHistory } from 'vue-router';
//import CoachDetail from './pages/coaches/CoachDetail';
//import CoachRegistration from './pages/coaches/CoachRegistration';
//import CoachContact from './pages/requests/ContactCoach';
//import RequestReceived from './pages/requests/RequestReceived';
//import UserAuth from './pages/Auth/UserAuth';
import CoachList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store/index';

const CoachDetail = () => import('./pages/coaches/CoachDetail');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration');
const CoachContact = () => import('./pages/requests/ContactCoach');
const RequestReceived = () => import('./pages/requests/RequestReceived');
const UserAuth = () => import('./pages/Auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: CoachContact } // /coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});
// Global navigation guard
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('coaches');
  } else {
    next();
  }
});

export default router;
