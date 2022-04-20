import { createRouter, createWebHistory } from "vue-router";

import store from "../store/store.js";

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }
const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/pages/Home.vue"),
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "home" */ "@/pages/About.vue"),
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/pages/Admin.vue"),
    meta: { needsAuth: true, role: "admin" },
  },
  {
    path: "/test",
    component: () => import(/* webpackChunkName: "test" */ "@/pages/Test.vue"),
    meta: { needsAuth: true, role: "test" },
  },
  {
    path: "/notfound",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/pages/errors/NotFound.vue"),
  },
  {
    path: "/forbidden",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/pages/errors/Forbidden.vue"),
  },
  {
    path: "/networkerror",
    component: () =>
      import(
        /* webpackChunkName: "errors" */ "@/pages/errors/NetworkError.vue"
      ),
  },
  {
    path: "/:notFound(.*)",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/pages/errors/NotFound.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/pages/errors/NotFound.vue"),
  },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(), //createWebHashHistory(),
  routes, // short for `routes: routes`
  scrollBehavior() {
    return { top: 0 };
  },
});

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

router.beforeEach(function (to, from, next) {
  console.log("Global beforeEach");
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log("Needs auth!");
    //next();
    if (store.getters.roles.includes(to.meta.role)) {
      next();
    } else {
      console.log("forbidden, needs " + to.meta.role);
      next("/forbidden");
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

router.afterEach(function (to, from) {
  // sending analytics data
  console.log("Global afterEach");
  console.log(to, from);
});

export default router;
