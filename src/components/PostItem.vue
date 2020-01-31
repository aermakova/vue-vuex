<template>
  <b-row v-if="allPosts" class="justify-center">
    <b-card
      :title="post.title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="m-2"
      v-for="post in allPosts"
      :id="'post' + post.id"
      :key="'post' + post.id"
    >
      <b-card-text>
        {{ post.body }}
      </b-card-text>

      <b-button href="#" :to="{name:'post', params: {id:post.id}}" variant="primary">Go somewhere</b-button>

    </b-card>
  </b-row>
</template>
<script>
  export default {
    computed: {
      allPosts(){
        return this.$store.getters.getPosts;
      }
    },
    mounted() {
      this.$store.dispatch('loadPosts')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
