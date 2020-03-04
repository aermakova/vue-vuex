<template>
  <article class="div m-2"
           style="max-width: 20rem;"
           :id="post.id"
  >
    <img :src="post.thumbnailUrl">
    <router-link :to="{name:'post', params: {id:post.id}}"><h5>{{ post.title }}</h5></router-link>
    <p>{{ post.body }}</p>
    <b-button href="#" :to="{name:'post', params: {id:post.id}}"  variant="primary" class="btn-post-item" style="color: #fff">Открыть пост</b-button>
  </article>
</template>
<script>
  export default {
    props: {
      'post': {
        type: Object,
        required: true
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .justify-center{
    justify-content: center;
  }
  img{
    max-width: 100%;
  }
</style>
