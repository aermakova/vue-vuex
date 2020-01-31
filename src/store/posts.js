import axios from 'axios'
export default {
  state: {
    posts: [],
    error: null
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    loadPosts (ctx) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(data => {
          ctx.commit('setPosts', data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    getPosts: state => state.posts,
  },
}
