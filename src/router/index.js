import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts',
    name: 'posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/post/:id',
    props: true,
    name: 'post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/add-post',
    name: 'add-post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AddPost.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: "/"
});

export default router
