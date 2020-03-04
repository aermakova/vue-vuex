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
        <b-form class="mt-4" style="width: 100%">
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
                    :value="post.title"
                    type="text"
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
                    :value="post.body"
                    required
                    placeholder="Новый пост о политике"
            ></b-form-input>
          </b-form-group>
          <div class="text-center">
            <b-button variant="success" class="m-1" @click="onEdit">
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
  //import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    data() {
      return{
        //'id': this.post.id,
        'title': '',
        'body': '',
        //'url': this.post.url,
        'thumbnailUrl': '',
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
          //'url': this.url,
          'thumbnailUrl': this.thumbnailUrl,
        })
      },
      // onEdit() {
      //   this.$store.dispatch('editPost', this.post);
      // },
    }
  }

</script>
<style lang="scss" scoped>
  img{
    max-width: 500px;
  }
</style>