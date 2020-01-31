<template>
  <div class="app-layout">
    <b-container>
      <h1>Все посты</h1>
        <card></card>
    </b-container>
  </div>
</template>

<script>

  import Card from "../components/PostItem";
  export default {
    components: {Card}
  }

</script>