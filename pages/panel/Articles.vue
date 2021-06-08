<template>
  <div class="container">
    <!--UserRegister-->
    <ArticleRegister :article="article" :editMode="editMode"></ArticleRegister>
    <!--//-->
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-4">
            <h3>Product Register</h3>
          </div>
          <div class="col-md-3 offset-5">
            <button @click="registerUser()" class="btn btn-success">
              <span><i class="fa fa-user-plus"></i>Register</span>
            </button>
            <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close</button>
          </div>
        </div>
      </div>
      <table class="table table-striped tab-content table-bordered table-responsive">
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>
            <form class="form-inline" @submit.prevent="onFullNameSearch()">
              <div class="form-group">
                <input type="text" v-model="full_name_search" name="full-name" id="full-name"
                       class="form-control" placeholder="Full Name">
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-sm btn-success"><i
                  class="fas fa-search"></i></button>
              </div>
            </form>
          </th>
          <th>
            <form class="form-inline" @submit.prevent="onUserNameSearch()">
              <div class="form-group">
                <input type="text" v-model="username_search" name="username" id="username"
                       class="form-control" placeholder="User Name">
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-sm btn-success"><i
                  class="fas fa-search"></i></button>
              </div>
            </form>
          </th>
          <th>
            <form class="form-inline" @submit.prevent="onEmailSearch()">
              <div class="form-group">
                <input type="email" v-model="email_search" name="email" id="email" class="form-control"
                       placeholder="Email">
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-sm btn-success"><i
                  class="fas fa-search"></i></button>
              </div>
            </form>
          </th>
          <th>
            <select class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </th>
          <th>#</th>
          <th>#</th>
        </tr>
        </thead>
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Status</th>
          <th>Created At / Updated At</th>
          <th>Option</th>
        </tr>
        </thead>
        <tbody class="text-center">
        <tr v-for="(article, index) in articles" :key="article.id">
          <td>{{ index }}</td>
          <td v-text="article.category[0].title"></td>
          <td v-text="article.category[0].author.username"></td>
          <td v-text="article.title"></td>
          <td v-text="article.description.substring(0, 15)"></td>
          <td>
            <img class="rounded-circle" :src="article.icon" style="width: 50px; height: 50px">
          </td>
          <td>
            <button v-if="article.status === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                    v-text="article.status">ACTIVE
            </button>
            <button v-if="article.status === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                    v-text="article.status">INACTIVE
            </button>
            <button v-if="article.status === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                    v-text="article.status">SUSPENDED
            </button>
            <button v-if="article.status === 'PENDING'" class="btn btn-danger btn-sm disabled"
                    v-text="article.status">PENDING
            </button>
          </td>
          <td>{{ article.created_at + ' ' + article.updated_at }}</td>
          <td>
            <a @click="articleShow(article)" data-toggle="modal" data-target="#exampleModal">
              <i class="fas fa-eye text-primary"></i>
            </a>

            <ArticleShow :showArticle="showArticle"></ArticleShow>
            /
            <a href="#register" @click="articleEdit(article.id)"><i class="fas fa-pen text-success"></i></a>
            /
            <a @click="articleDelete(article.id)"><i class="fas fa-trash text-danger"></i></a>
          </td>
        </tr>
        </tbody>
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Title</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Status</th>
          <th>Created At / Updated At</th>
          <th>Option</th>
        </tr>
        </thead>
      </table>

    </div>
  </div>

</template>

<script>
  import $ from 'jquery';
  import ArticleRegister from '../../components/panel/ArticleRegister';
  import ArticleShow from '../../components/panel/modal/ArticleShow';
  import { ArticleService } from '../../services/panel/ArticleService';
  import HelperFunctions from '../../helpers/HelperFunctions';

  import {mapState} from 'vuex'

  window.$ = $;
  export default {
    middleware: 'checkAuthEmployee',
    layout: 'panel',
    name: "Users",
    components: { ArticleRegister, ArticleShow },
    data() {
      return {
        token: JSON.parse(window.localStorage.getItem('token')),
        state_search: '',
        full_name_search: '',
        username_search: '',
        email_search: '',
        search: '',
        dialog: '',
        page: 1,
        employee: {},
        employees: {},
        getUsers: {},
        pagination: {
          total: 0,
          per_page: 0,
          last_page: 0,
          from: 0,
          to: 0,
          current_page: 1
        },
        offset: 4,
        name: '',
        description: '',
        article: '',
        editMode: false,
        showArticle: {
          category: '',
          title: '',
          description: '',
          author: '',
        },
      }
    },
    mounted() {
      return this.$store.dispatch('Articles/getArticles');
    },
    computed: {
      ...mapState({
        articles: state => state.Articles.getArticles,
        //showArticle: state => state.Articles.isUser,
        editArticle: state => state.Articles.isUser,
        //deleteUser: state => state.Users.isUser,
      })
    },
    methods: {
      closeModal() {
        HelperFunctions.closeModal();
      },
      articleAll() {
        this.getUsers = ArticleService.All()
      },
      articlePaginate() {

      },
      articleShow(article) {
        this.showArticle = {
          category: article.category[0].title,
          title: article.title,
          description: article.description,
          author: article.category[0].author.username,
        }
        //return this.$store.dispatch('Articles/showArticle', {id});
        //this.showArticle = article;
        //console.log(this.showArticle.category[0])
      },
      articleEdit(article) {
        this.editMode = true;
        this.article = article;
      },
      articleDelete(id) {
        return this.$store.dispatch('Articles/deleteArticle', {id});
      },
      registerUser() {
        this.editMode = false;
        this.article = '';
        $('#user-register').toggle();
      },
      onFullNameSearch() {
        return ArticleService.onFullNameSearch()
      },
      onUserNameSearch() {
        return ArticleService.onUserNameSearch();
      },
      onEmailSearch() {
        return ArticleService.onEmailSearch();
      },
      onSearch(search) {
        return ArticleService.onSearch(search)
      },
    }
  }
</script>

<style scoped>

</style>
