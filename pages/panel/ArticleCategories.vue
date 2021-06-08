<template>
  <div class="container">
    <!--UserRegister-->
    <ArticleCategoryRegister/>
    <!--//-->
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-4">
            <h3>Product Register</h3>
          </div>
          <div class="col-md-3 offset-5">
            <button @click="registerCategory()" class="btn btn-success">
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
          <th>Author</th>
          <th>Title</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Status</th>
          <th>Created At / Updated At</th>
          <th>Option</th>
        </tr>
        </thead>
        <tbody class="text-center">
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index }}</td>
          <td v-text="category.author.username"></td>
          <td v-text="category.title.substring(0, 5)"></td>
          <td v-text="category.description.substring(0, 5)"></td>
          <td>
            <img class="rounded-circle" :src="category.icon" style="width: 50px; height: 50px">
          </td>
          <td>
            <button v-if="category.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                    v-text="category.state">ACTIVE
            </button>
            <button v-if="category.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                    v-text="category.state">INACTIVE
            </button>
            <button v-if="category.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                    v-text="category.state">SUSPENDED
            </button>
            <button v-if="category.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                    v-text="category.state">PENDING
            </button>
          </td>
          <td>{{ category.created_at + ' ' + category.updated_at }}</td>
          <td>
            <a @click="categoryShow(category)" data-toggle="modal" data-target="#exampleModal">
              <i class="fas fa-eye text-primary"></i>
            </a>

            <ArticleCategoryShow :showCategory="showCategory"></ArticleCategoryShow>
            /
            <a href="#register" @click="categoryEdit(category.id)"><i class="fas fa-pen text-success"></i></a>
            /
            <a @click="categoryDelete(category.id)"><i class="fas fa-trash text-danger"></i></a>
          </td>
        </tr>
        </tbody>
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>Author</th>
          <th>Slug</th>
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
  import ArticleCategoryRegister from '../../components/panel/ArticleCategoryRegister';
  import ArticleCategoryShow from '../../components/panel/modal/ArticleCategoryShow';
  import { ArticleCategoryService } from '../../services/panel/ArticleCategoryService';
  import HelperFunctions from '../../helpers/HelperFunctions';

  import {mapState} from 'vuex'

  window.$ = $;
  export default {
    middleware: 'checkAuthEmployee',
    layout: 'panel',
    name: "Users",
    components: { ArticleCategoryRegister, ArticleCategoryShow },
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
        showCategory: {
          title: '',
          description: '',
          author: '',
        }
      }
    },
    mounted() {
      return this.$store.dispatch('ArticleCategories/getArticleCategories');
    },
    computed: {
      ...mapState({
        categories: state => state.ArticleCategories.getArticleCategories,
        //showCategory: state => state.ArticleCategories.isUser,
        editUser: state => state.ArticleCategories.isUser,
        //deleteUser: state => state.Users.isUser,
      })
    },
    methods: {
      closeModal() {
        HelperFunctions.closeModal();
      },
      userAll() {
        this.getUsers = ArticleCategoryService.userAll()
      },
      userPaginate() {

      },
      categoryShow(category) {
        this.showCategory = {
          title: category.title,
          description: category.description,
          author: category.author[0].username,
        }
      },
      categoryEdit(id) {
        return this.$store.dispatch('ArticleCategories/editUser', {id});
      },
      categoryDelete(id) {
        return this.$store.dispatch('ArticleCategories/deleteUser', {id});
      },
      registerCategory() {
        $('#article-categories-register').toggle();
      },
      onFullNameSearch() {
        return ArticleCategoryService.onFullNameSearch()
      },
      onUserNameSearch() {
        return ArticleCategoryService.onUserNameSearch();
      },
      onEmailSearch() {
        return ArticleCategoryService.onEmailSearch();
      },
      onSearch(search) {
        return ArticleCategoryService.onSearch(search)
      },
    }
  }
</script>

<style scoped>

</style>
