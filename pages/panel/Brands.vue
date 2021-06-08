<template>
  <div class="container">
    <!--UserRegister-->
    <BrandRegister/>
    <!--//-->
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-4">
            <h3>Brands Register</h3>
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
          <th>Name</th>
          <th>Description</th>
          <th>Employee</th>
          <th>Image</th>
          <th>Status</th>
          <th>Created At / Updated At</th>
          <th>Option</th>
        </tr>
        </thead>
        <tbody class="text-center">
        <tr v-for="(brand, index) in brands" :key="brand.id">
          <td>{{ index }}</td>
          <td v-text="brand.name"></td>
          <td v-text="brand.description"></td>
          <td v-text="brand.employeeId"></td>
          <td>
            <img class="rounded-circle" :src="brand.image" style="width: 50px; height: 50px">
          </td>
          <td>
            <button v-if="brand.status === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                    v-text="brand.status">ACTIVE
            </button>
            <button v-if="brand.status === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                    v-text="brand.status">INACTIVE
            </button>
            <button v-if="brand.status === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                    v-text="brand.status">SUSPENDED
            </button>
            <button v-if="brand.status === 'PENDING'" class="btn btn-danger btn-sm disabled"
                    v-text="brand.status">PENDING
            </button>
          </td>
          <td>{{ brand.createdAt + ' ' + brand.updatedAt }}</td>
          <td>
            <a @click="brandShow(brand.id)" data-toggle="modal" data-target="#exampleModal">
              <i class="fas fa-eye text-primary"></i>
            </a>

            <BrandShow :showBrand="showBrand"></BrandShow>
            /
            <a href="#register" @click="brandEdit(brand.id)"><i class="fas fa-pen text-success"></i></a>
            /
            <a @click="brandDelete(brand.id)"><i class="fas fa-trash text-danger"></i></a>
          </td>
        </tr>
        </tbody>
        <thead class="text-center">
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Gender</th>
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
  import BrandRegister from '../../components/panel/BrandRegister';
  import BrandShow from '../../components/panel/modal/BrandShow';
  import { BrandService } from '../../services/panel/BrandService';
  import {mapState} from 'vuex';
  import HelperFunctions from '../../helpers/HelperFunctions';

  window.$ = $;
  export default {
    middleware: 'checkAuthEmployee',
    layout: 'panel',
    name: "Users",
    components: { BrandRegister, BrandShow },
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
        showBrand: {
          title: '',
          description: '',
        }
      }
    },
    mounted() {
      return this.$store.dispatch('Brands/getBrands');
    },
    computed: {
      ...mapState({
        brands: state => state.Brands.getBrands,
        //showBrand: state => state.Brands.isUser,
        editBrand: state => state.Brands.isUser,
        //deleteUser: state => state.Users.isUser,
      })
    },
    methods: {
      closeModal() {
        HelperFunctions.closeModal();
      },
      userAll() {
        this.getUsers = BrandService.All()
      },
      userPaginate() {

      },
      brandShow(brand) {
        this.showBrand = {
          title: brand.title,
          description: brand.description,
        }
      },
      brandEdit(id) {
        return this.$store.dispatch('Brands/editBrand', {id});
      },
      brandDelete(id) {
        return this.$store.dispatch('Brands/deleteBrand', {id});
      },
      registerUser() {
        $('#user-register').toggle();
      },
      onFullNameSearch() {
        return BrandService.onFullNameSearch()
      },
      onUserNameSearch() {
        return BrandService.onUserNameSearch();
      },
      onEmailSearch() {
        return BrandService.onEmailSearch();
      },
      onSearch(search) {
        return BrandService.onSearch(search)
      },
    }
  }
</script>

<style scoped>

</style>
