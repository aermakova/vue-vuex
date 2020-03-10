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
      <b-row class="justify-center"
             id="posts"
             :per-page="perPage"
             :current-page="currentPage"
      >
        <div class="col-md-6 col-lg-4"
             v-for="post in allPostsCollections"
             :key="'post' + post.id"
        >
          <PostItem :post="post"></PostItem>
        </div>
      </b-row>
      <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              aria-controls="posts"
              @click="pageNumber(currentPage)"
      ></b-pagination>

    </b-container>
  </div>
</template>

<script>

  import PostItem from "../components/PostItem";
  import Search from "../components/Search";
  import { mapActions } from 'vuex'
  export default {
    components: {PostItem, Search},
    data() {
      return {
        searchPost: '',
        perPage: 10,
        currentPage: 1,
        postCount: 40
      }
    },
    computed: {
      totalRows() {
        return this.allPosts.length;
      },
      allPosts() {
        return this.$store.getters.GET_POSTS;
      },
      allPostsCollections() {
        let from = (this.currentPage -1) * this.perPage;
        let to = from + this.perPage;
        return this.allPosts.slice(from, to);
      },
      filteredPosts() {
        let posts = this.allPosts;
        if (this.searchPost.length > 3) {
          posts = posts.filter(b => b.title.toLowerCase().indexOf(this.searchPost.toLowerCase()) >= 0);
        }
        return posts;
      },
    },
    methods: {
      ...mapActions([
        'LOAD_POSTS',
        'this.postCount'
      ]),
      ...mapActions([
        'LOAD_POSTS_IMG',
        'this.postCount'
      ]),
      pageNumber(currentPage) {
        this.currentPage = currentPage;
      }
    }
  }

</script>

<style>
  .search-wrap{
    position: relative;
  }
  .col-md-6{
    margin-bottom: 20px;
  }
  article img{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  p{
    word-break: break-all;
  }
</style>