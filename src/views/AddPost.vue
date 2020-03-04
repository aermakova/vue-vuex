<template>
  <div class="app-layout add-post">
    <b-container>
      <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
                id="input-group-11"
                label="Ссылка изображения поста:"
                label-for="input-11"
                description="Вставьте ссылку на изображение поста"
        >
          <b-form-input
                  id="input-11"
                  v-model="url"
                  @blur="$v.url.$touch()"
                  :class="status($v.url)"
                  type="url"
                  placeholder="https://img_url"
          ></b-form-input>
          <span v-if="$v.url.$error" style="color: red;font-size: 80%;">
              Вставьте валидную ссылку на изображение
            </span>
        </b-form-group>
        <b-form-group
                id="input-group-12"
                label="Название поста:"
                label-for="input-12"
                description="Введите название поста"
        >
          <b-form-input
                  id="input-12"
                  type="text"
                  placeholder="Новый пост"
                  v-model="title"
                  @blur="$v.title.$touch()"
                  :class="status($v.title)"
          ></b-form-input>
          <span v-if="$v.title.$error" style="color: red;font-size: 80%;">
              Название не должно быть пустым
            </span>
        </b-form-group>

        <b-form-group
                id="input-group-13"
                label="Описание поста"
                label-for="textarea-default1"
                description="Введите описание поста"
        >
          <b-form-textarea
                  id="textarea-default1"
                  placeholder="Новый пост о политике"
                  v-model="body"
                  @blur="$v.body.$touch()"
                  :class="status($v.body)"
          ></b-form-textarea>
          <span v-if="$v.body.$error" style="color: red;font-size: 80%;">
              Введено {{ body.length }} символов. Описание поста должно содержать больше 20-ти символов
            </span>
        </b-form-group>

        <b-button type="submit" variant="primary" style="margin: 10px;">Добавить</b-button>
        <b-button type="reset" variant="danger" style="margin: 10px;">Сбросить</b-button>
      </b-form>
      <PostItem v-if="title" :post="newPost"></PostItem>
    </b-container>
  </div>
</template>

<script>
  import PostItem from "../components/PostItem";
  import { helpers, required, minLength } from 'vuelidate/lib/validators'
  const urlRegex = helpers.regex('urlRegex', /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);

  export default {
    data() {
      return {
        id: '',
        url: '',
        title: '',
        body: '',
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
        return (this.$store.getters.GET_POSTS.length + 1) + '_' + date;
      },
      newPost() {
        return {
          'id': this.newId,
          'title': this.title,
          'body': this.body,
          'url': this.url,
          'thumbnailUrl': this.newThumbnailUrl,
        };
      },
      newThumbnailUrl() {
        return this.url;
      }
    },
    methods: {
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      onSubmit(evt) {
        evt.preventDefault();
        this.$store.dispatch('ADD_POST', this.newPost);
        this.$router.push('/posts');
      },
      onReset(evt) {
        evt.preventDefault();
        this.url = '';
        this.title = '';
        this.body = '';
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    validations: {
      url: {
        required,
        urlRegex,
        maxLength: minLength(10),
      },
      title: {
        required,
        maxLength: minLength(1),
      },
      body: {
        required,
        maxLength: minLength(20),
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
  input:-internal-autofill-selected{
    background-color: #fff;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #EFE inset !important;
    &.dirty{
      -webkit-box-shadow: 0 0 0 30px #EFE inset !important;
    }
    &.error{
      -webkit-box-shadow: 0 0 0 30px #FDD inset !important;
    }
  }
  .dirty {
    border-color: #5A5;
    background-color: #EFE!important;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background-color: #FDD!important;
  }
</style>