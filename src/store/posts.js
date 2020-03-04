//import axios from 'axios'

export default {
  state: {
    posts: [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      },
    ],
    //images: [],
    error: null,
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
      // for (let [index, post] of state.posts.entries()) {
      //  post.url = state.images[index].url;
      //  post.thumbnailUrl = state.images[index].thumbnailUrl;
      // }
    },
    // setPostsImg(state, payload) {
    //   state.images = payload;
    // },
    ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    DELETE_POST(state, post) {
      let index = state.posts.indexOf(post);
      state.posts.splice(index, 1);
    },
    UPDATE_POST(state, post) {
      const index = state.posts.findIndex(p => p.id == post.id)
      state.posts.splice(index, 1, {
        'id': post.id,
        'title': post.title,
        'body': post.body,
        //'url': post.url,
        'thumbnailUrl': post.thumbnailUrl,
      })
    },
  },
  getters: {
    GET_POSTS: state => state.posts,
    GET_POSTS_ID (state) {
      return postId => {
        return state.posts.find(example => example.id === postId);
      }
    }
  },
  actions: {
    async ADD_POST({commit}, post) {
      commit('ADD_POST', post);
    },
    async UPDATE_POST(context, post) {
      setTimeout(() => {
        context.commit('UPDATE_POST', post)
      }, 100)
    },
    async DELETE_POST({commit}, post) {
      commit('DELETE_POST', post);
    },
    // async loadPosts(ctx, count) {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/posts?_limit=' + count)
    //     .then(data => {
    //        ctx.commit('SET_POSTS', data.data);
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // loadPostsImg(ctx, count) {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/photos?_limit=' + count)
    //     .then(data => {
    //       ctx.commit('setPostsImg', data.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },

  },
}
