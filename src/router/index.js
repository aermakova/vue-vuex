import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'

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
    component: Posts
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
    props: true
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: () => import('../views/AddPost.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: "/"
});

export default router
