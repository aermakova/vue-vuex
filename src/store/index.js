import Vue from 'vue';
import Vuex from 'vuex';
//import posts from "./posts";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["posts", "images"]
    })
  ],
  state: {
    posts: [],
    images: [],
    error: null,
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
      for (let [index, post] of state.posts.entries()) {
        post.url = state.images[index].url;
        post.thumbnailUrl = state.images[index].thumbnailUrl;
      }
    },
    SET_POSTS_IMG(state, payload) {
      state.images = payload;
    },
  },
  actions: {
    async LOAD_POSTS(ctx, count) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts?_limit=' + count)
        .then(data => {
          ctx.commit('SET_POSTS', data.data);
        })
        .catch(error => {
          console.log(error)
        })
    },
    async LOAD_POSTS_IMG(ctx, count) {
      axios
        .get('https://jsonplaceholder.typicode.com/photos?_limit=' + count)
        .then(data => {
          ctx.commit('SET_POSTS_IMG', data.data);
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    GET_POSTS: state => state.posts,
  },
})
