<template>
  <div class="app-layout add-post">
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
                id="input-group-1"
                label="Ссылка изображения поста:"
                label-for="input-1"
                description="Вставьте ссылку на изображение поста"
        >
          <b-form-input
                  id="input-1"
                  v-model="post.thumbnailUrl"
                  type="text"
                  required
                  placeholder="https://img_url"
          ></b-form-input>
        </b-form-group>
        <b-form-group
                id="input-group-2"
                label="Название поста:"
                label-for="input-2"
                description="Введите название поста"
        >
          <b-form-input
                  id="input-2"
                  v-model="post.title"
                  type="text"
                  required
                  placeholder="Новый пост"
          ></b-form-input>
        </b-form-group>

        <b-form-group
                id="input-group-3"
                label="Описание поста"
                label-for="input-3"
                description="Введите описание поста"
        >
          <b-form-input
                  id="input-3"
                  v-model="post.body"
                  required
                  placeholder="Новый пост о политике"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" style="margin: 10px;">Добавить</b-button>
        <b-button type="reset" variant="danger" style="margin: 10px;">Сбросить</b-button>
      </b-form>
      <PostItem v-if="post.title" :post="post"></PostItem>
    </b-container>
  </div>
</template>

<script>
  import PostItem from "../components/PostItem";

  export default {
    data() {
      return {
        post: {
          id: '',
          thumbnailUrl: '',
          title: '',
          body: '',
        },
        show: true
      }
    },
    computed: {
      newId() {
        let date = new Date().toLocaleString('en',
          {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          });
        let postId = (this.$store.getters.GET_POSTS.length + 1) + '_' + date;
        return postId;
      },
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.post.id = this.newId;
        this.$store.dispatch('ADD_POST', this.post);
        this.$router.push('/posts');
      },
      onReset(evt) {
        evt.preventDefault();
        this.post.thumbnailUrl = '';
        this.post.title = '';
        this.post.body = '';
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    components: {
      PostItem
    }
  }
</script>

<style lang="scss">
  .app-layout{
    padding: 5rem 0;
  }
  article.m-2{
    margin: 0 auto!important;
  }
  img{
    display: block;
    margin: 0 auto;
  }
  .add-post{
    .btn-post-item{
      display: none;
    }
  }
</style>