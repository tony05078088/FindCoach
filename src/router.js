import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail';
import CoachList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import CoachContact from './pages/requests/ContactCoach';
import RequestReceived from './pages/requests/RequestReceived';
import UserAuth from './pages/Auth/UserAuth';
import NotFound from './pages/NotFound';
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
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestReceived },
    { path: '/auth', component: UserAuth },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
