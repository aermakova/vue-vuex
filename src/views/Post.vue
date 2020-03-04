<template>
  <div class="app-layout">
    <b-container v-if="post">
      <div class="div" >
        <img :src="post.url || post.thumbnailUrl">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
        <b-button v-b-modal.modal-edit variant="success" class="m-1">Редактировать пост</b-button>
        <b-button v-b-modal.modal-delete variant="danger" class="m-1">Удалить пост</b-button>
      </div>
      <b-modal id="modal-edit" centered title="Редактировать пост" v-slot:modal-footer="{ ok, cancel }">
        <b-form class="mt-4" style="width: 100%" @submit.prevent="onEdit()">
          <b-form-group
                  id="input-group-1"
                  label="Ссылка изображения поста:"
                  label-for="input-1"
                  description="Вставьте ссылку на изображение поста"
          >
            <b-form-input
                    id="input-1"
                    :value="post.url || post.thumbnailUrl"
                    type="url"
                    placeholder="https://img_url"
                    v-model="url"
                    @blur="$v.url.$touch()"
                    :class="status($v.url)"
            ></b-form-input>
            <span v-if="$v.url.$error" style="color: red;font-size: 80%;">
              Вставьте валидную ссылку на изображение
            </span>
          </b-form-group>
          <b-form-group
                  id="input-group-2"
                  label="Название поста:"
                  label-for="input-2"
                  description="Введите название поста"
          >
            <b-form-input
                    id="input-2"
                    :value="post.title"
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
                  label-for="textarea-default"
                  description="Введите описание поста"
          >
            <b-form-textarea
                    id="textarea-default"
                    placeholder="Новый пост о политике"
                    :value="post.body"
                    v-model="body"
                    @blur="$v.body.$touch()"
                    :class="status($v.body)"
            ></b-form-textarea>
            <span v-if="$v.body.$error" style="color: red;font-size: 80%;">
              Введено {{ body.length }} символов. Описание поста должно содержать больше 20-ти символов
            </span>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" :disabled="$v.$invalid" variant="success" class="m-1">
              OK
            </b-button>
            <b-button variant="danger" class="m-1" @click="cancel()">
              Cancel
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal id="modal-delete" centered title="Удалить пост" v-slot:modal-footer="{ ok, cancel }">
        <b-form class="mt-4" style="width: 100%">
          Вы точно хотите удалить пост <b style="text-transform: uppercase">{{ post.title }}</b> ?
          <div class="text-center">
            <b-button variant="success" class="m-1" @click="onDelete">
              OK
            </b-button>
            <b-button variant="danger" class="m-1" @click="cancel()">
              Cancel
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
  import { helpers, required, minLength } from 'vuelidate/lib/validators'
  const urlRegex = helpers.regex('urlRegex', /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);
  export default {
    data() {
      return{
        'title': '',
        'body': '',
        'url': '',
      }
    },
    mounted() {
      console.log(this.post.title);
    },
    props: {
      'id': {
        required: true
      }
    },
    computed: {
      post() {
        const id = this.id;
        return this.$store.getters.GET_POSTS_ID(id);
      },
    },
    methods: {
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      onDelete() {
        console.log('кнопка удалить' + this.post);
        this.$store.commit('DELETE_POST', this.post);
        this.$router.push('/posts');
      },
      onEdit() {
        this.$store.dispatch('UPDATE_POST', {
          'id': this.id,
          'title': this.title,
          'body': this.body,
          'url': this.url,
          'thumbnailUrl': this.url,
        });
        this.$bvModal.hide('modal-edit');
      },
      // onEdit() {
      //   this.$store.dispatch('editPost', this.post);
      // },
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
  }

</script>
<style lang="scss" scoped>
  img{
    max-width: 500px;
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