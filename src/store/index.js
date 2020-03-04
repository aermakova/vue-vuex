import Vue from 'vue';
import Vuex from 'vuex';
import posts from "./posts";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts
  },
  plugins: [
    createPersistedState({
      paths: ["posts.posts", "posts.images"]
    })
  ],
})
