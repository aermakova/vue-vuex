<template>
  <div class="app-layout">
    <b-container>
      <h1>Все посты</h1>
      <div class="row" v-if="allPosts.length > 2" >
        <div class="col-12 mb-4 search-wrap">
          <b-form-input v-model="searchPost" placeholder="Найти пост"></b-form-input>
          <Search :filteredPosts="filteredPosts" v-if="this.searchPost.length > 3"></Search>
        </div>
      </div>
      <b-row class="justify-center">
        <div class="col-md-6 col-lg-3" v-for="post in allPosts" :key="'post' + post.id">
          <PostItem :post="post"></PostItem>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import PostItem from "../components/PostItem";
  import Search from "../components/Search";
  export default {
    components: {PostItem, Search},
    data() {
      return {
        searchPost: ''
      }
    },
    mounted() {
      // this.$store.dispatch('loadPosts', this.postCount);
      // this.$store.dispatch('loadPostsImg', this.postCount)
      console.log(this.$store.state.posts);
    },
    computed: {
      allPosts() {
        return this.$store.getters.GET_POSTS;
      },
      filteredPosts() {
        let posts = this.allPosts;
        if (this.searchPost.length > 3) {
          posts = posts.filter(b => b.title.toLowerCase().indexOf(this.searchPost.toLowerCase()) >= 0);
        }
        return posts;
      },
    },
  }

</script>

<style scoped>
  .search-wrap{
    position: relative;
  }
  .col-md-6{
    margin-bottom: 20px;
  }
  img{
    width: 100%;
  }
</style>