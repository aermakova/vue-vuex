<template>
  <div class="search">
    <div class="text-left">найдено <b>{{ filteredPosts.length }}</b> результатов
    </div>
    <table striped hover>
      <tr v-for="filteredPost in filteredPosts" :key="'post' + filteredPost.id">
        <td class="text-left"><img :src="filteredPost.thumbnailUrl" style="width: 50px"></td>
        <td class="text-left"><router-link :to="{name:'post', params: {id:filteredPost.id}}"><h5>{{ filteredPost.title }}</h5></router-link></td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      'filteredPosts': {
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .search{
    position: absolute;
    left: 15px;
    right: 15px;
    top: 40px;
    z-index: 1;
    background: #fff;
  }
</style>
