<template>
  <div class="container">
    <!--ProductRegister-->
    <ProductCategoryRegister :category="category" :editMode="editMode"></ProductCategoryRegister>
    <!--//-->
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-4">
            <h3>Product Categories Register</h3>
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
          <th>Brand Name</th>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>State</th>
          <th>Created At / Updated At</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody class="text-center">
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index }}</td>
          <td v-text="category.brand[0].title"></td>
          <td v-text="category.title.substring(0, 10)"></td>
          <td v-text="category.description.substring(0, 10)"></td>
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

            <ProductCategoryShow :showCategory="showCategory"></ProductCategoryShow>
            /
            <a href="#register" @click="categoryEdit(category)"><i class="fas fa-pen text-success"></i></a>
            /
            <a @click="categoryDelete(category.id)"><i class="fas fa-trash text-danger"></i></a>
          </td>
        </tr>
        </tbody>
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>Brand Name</th>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>State</th>
          <th>Action</th>
        </tr>
        </thead>
      </table>

    </div>
  </div>

</template>

<script>
  import $ from 'jquery';
  import ProductCategoryRegister from '../../components/panel/ProductCategoryRegister';
  import ProductCategoryShow from '../../components/panel/modal/ProductCategoryShow';
  import { ProductCategoryService } from '../../services/panel/ProductCategoryService';
  import {mapState} from 'vuex'
  import HelperFunctions from '../../helpers/HelperFunctions';

  window.$ = $;
  export default {
    middleware: 'checkAuthEmployee',
    layout: 'panel',
    name: "Index",
    components: { ProductCategoryRegister, ProductCategoryShow },
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
        category: '',
        editMode: false,
        showCategory: {
          brand: '',
          title: '',
          description: ''
        },
      }
    },
    mounted() {
      return this.$store.dispatch('ProductCategories/getProductCategories');
    },
    computed: mapState({
      categories: state => state.ProductCategories.getProductCategories
    }),
    methods: {
      closeModal() {
        HelperFunctions.closeModal();
      },
      categoryAll() {
        this.getUsers = ProductCategoryService.userAll()
      },
      userPaginate() {

      },
      categoryShow(category) {
        this.showCategory = {
          brand: category.brand[0].title,
          title: category.title,
          description: category.description
        };
      },
      categoryEdit(category) {
        this.editMode = true;
        this.category = category;
      },
      categoryDelete(id) {
        return this.$store.dispatch('ProductCategories/deleteCategory', {id});
      },
      registerCategory() {
        this.editMode = false;
        this.category = '';
        $('#user-register').toggle();
      },
      onFullNameSearch() {
        return ProductCategoryService.onFullNameSearch()
      },
      onUserNameSearch() {
        return ProductCategoryService.onUserNameSearch();
      },
      onEmailSearch() {
        return ProductCategoryService.onEmailSearch();
      },
      onSearch(search) {
        return ProductCategoryService.onSearch(search)
      },
    }
  }
</script>

<style scoped>

</style>
