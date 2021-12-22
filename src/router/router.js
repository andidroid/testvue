import { createRouter, createWebHistory } from 'vue-router';


import NotFound from '../pages/errors/NotFound.vue';
import Forbidden from '../pages/errors/Forbidden.vue';
import NetworkError from '../pages/errors/NetworkError.vue';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Admin from '../pages/Admin.vue';
import Test from '../pages/Test.vue';

import store from '../store/store.js';

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/admin', component: Admin, meta: { needsAuth: true, role: 'admin' } },
    { path: '/test', component: Test, meta: { needsAuth: true, role: 'test' } },
    { path: '/notfound', component: NotFound },
    { path: '/forbidden', component: Forbidden },
    { path: '/networkerror', component: NetworkError },
    { path: '/:notFound(.*)', component: NotFound },
    { path: '/:catchAll(.*)', component: NotFound }
  ]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),//createWebHashHistory(),
    routes, // short for `routes: routes`
    scrollBehavior() {
      return { top: 0 }
    }
  })


// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/', redirect: '/teams' },
//     {
//       name: 'teams',
//       path: '/teams',
//       meta: { needsAuth: true },
//       components: { default: TeamsList, footer: TeamsFooter },
//       children: [
//         {
//           name: 'team-members',
//           path: ':teamId',
//           component: TeamMembers,
//           props: true
//         } // /teams/t1
//       ]
//     }, // our-domain.com/teams => TeamsList
//     {
//       path: '/users',
//       components: {
//         default: UsersList,
//         footer: UsersFooter
//       },
//       beforeEnter(to, from, next) {
//         console.log('users beforeEnter');
//         console.log(to, from);
//         next();
//       }
//     },
//     { path: '/:notFound(.*)', component: NotFound }
//   ],
//   linkActiveClass: 'active',
//   scrollBehavior(_, _2, savedPosition) {
//     // console.log(to, from, savedPosition);
//     if (savedPosition) {
//       return savedPosition;
//     }
//     return { left: 0, top: 0 };
//   }
// });

router.beforeEach(function(to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    //next();
    if(store.getters.roles.includes(to.meta.role)) {
      next()
    } else {
      console.log('forbidden, needs '+ to.meta.role);
      next("/forbidden")
    }
  } else {
    next();
  }


  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
  // next();
});

router.afterEach(function(to, from) {
  // sending analytics data
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;