<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/posts">Все посты</router-link></b-nav-item> |
        <b-nav-item href="#"><router-link to="/add-post">Добавить новый пост</router-link></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

  export default {
    name: 'AppHeader'
  }

</script>