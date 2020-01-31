<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/posts">Все посты</router-link></b-nav-item> |
        <b-nav-item href="#"><router-link to="/add-post">Добавить новый пост</router-link></b-nav-item>
      </b-navbar-nav>
      <b-nav-form class="ml-auto">
        <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
    </b-navbar>
  </div>
</template>

<script>

  export default {
    name: 'AppHeader'
  }

</script>