<template>
    <div class="container">
        <!--ProductRegister-->
        <ProductRegister :product="product" :editMode="editMode"></ProductRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Register</h3>
                    </div>
                    <div class="col-md-3 offset-5">
                        <button @click="registerProduct()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close
                        </button>
                    </div>
                </div>
            </div>
            <!------------------------//------------------------>
            <ProductSearch></ProductSearch>
            <!------------------------//------------------------>
            <table class="table table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Category Title</th>
                    <th>Product Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Icon</th>
                    <th>State</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="(product, index) in products" :key="product.id">
                    <td>{{ index }}</td>
                    <!-- <td v-text="product.category.title.substring(0, 5)"></td>-->
                    <td v-text="product.title.substring(0, 5)"></td>
                    <td v-text="product.description.substring(0, 5)"></td>
                    <td v-text="product.price"></td>
                    <td>
                        <img class="rounded-circle" :src="product.icon" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="product.status === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="product.status">ACTIVE
                        </button>
                        <button v-if="product.status === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="product.status">INACTIVE
                        </button>
                        <button v-if="product.status === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="product.status">SUSPENDED
                        </button>
                        <button v-if="product.status === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="product.status">PENDING
                        </button>
                    </td>
                    <td>{{ product.created_at + ' ' + product.updated_at }}</td>
                    <td>
                        <a @click="productShow(product)" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <ProductShow :showProduct="showProduct"></ProductShow>
                        /
                        <a href="#register" @click="productEdit(product)"><i class="fas fa-pen text-success"></i></a>
                        /
                        <a @click="productDelete(product.id)"><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Category Title</th>
                    <th>Product Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Icon</th>
                    <th>State</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
            </table>
            <!---------pagination----------->
            <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    <li v-if="pagination.current_page > 1" :disabled="pagination.current_page <= 1"
                        class="page-item">
                        <a @click.prevent="changePage(pagination.current_page - 1)"
                           disabled="disabled"
                           class="page-link" href="#" tabindex="-1">
                            Previous
                        </a>
                    </li>
                    <li v-for="page in pages" :key="page === pagination.current_page" class="page-item">
                        <a @click.prevent="changePage(page)" class="page-link btn btn-primary" href="#">{{ page }}</a>
                    </li>
                    <li v-if="pagination.current_page < pagination.last_page" class="page-item">
                        <a @click.prevent="changePage(pagination.current_page + 1)" class="page-link"
                           href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <!---------pagination----------->
            <!--<nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>-->
            <!--<paginate
                    :pageCount="10"
                    :containerClass="'pagination'"
                    :clickHandler="clickCallback">
            </paginate>-->
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import ProductRegister from '../../components/panel/ProductRegister';
    import ProductShow from '../../components/panel/modal/ProductShow';
    import {ProductService} from '../../services/panel/ProductService';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../helpers/HelperFunctions';
    import ProductSearch from '../../components/panel/search/ProductSearch';
    import Vue from 'vue';
    import VuejsPaginate from 'vuejs-paginate'

    Vue.component('paginate', VuejsPaginate);

    window.$ = $;
    export default {
        middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Index",
        components: {ProductRegister, ProductShow, ProductSearch},
        data() {
            return {
                token: window.localStorage.getItem('token-employee'),
                state_search: '',
                full_name_search: '',
                username_search: '',
                email_search: '',
                search: '',
                dialog: '',
                page: 10,
                employee: {},
                products: {},
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
                product: '',
                editMode: false,
                showProduct: {
                    category: '',
                    title: '',
                    price: '',
                    description: ''
                },
                productSearch: {}
            }
        },
        mounted() {
            this.getProducts();
            return this.$store.dispatch('Products/getProducts');
        },
        computed: {
            // this is set and get computed products
            ...mapState({
                getPro: {
                    get () {
                        return state => state.Products.getProducts
                    },
                    set: function (getPro) {
                        this.products = getPro.data;
                        this.pagination = getPro.getProducts
                    },
                },
                //products: state => state.Products.getProducts,
            }),
            pages() {
                let pagesArray = [];
                var form = this.pagination.current_page - this.offset;
                if (form < 1) {
                    form = 1
                }
                var to = form + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                while (form <= to) {
                    pagesArray.push(form);
                    form++;
                }
                return pagesArray;
            },
        },
        /*watch: {
          ...mapState({
            isUpdate: state => state.Products.isUpdate
          }),
          if(isUpdate){
            return this.$store.dispatch('Products/getProducts');
          }
        },*/
        methods: {
            changePage(page) {
                this.pagination.current_page = page;
                this.getProducts(page);
            },
            getProducts(page = 1) {
                this.$http.get(this.$http.defaults.baseURL + `panel/product?page= ${page}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                    .then((res) => {
                        this.pagination.per_page = res.data.data.per_page;
                        this.pagination.last_page = res.data.data.last_page;
                        this.pagination.from = res.data.data.from;
                        this.pagination.to = res.data.data.to;
                        this.pagination.current_page = res.data.data.current_page;
                        this.pagination.total = res.data.data.total;
                        this.products = res.data.data.data;
                    })
                    .catch(() => {
                        console.log('handle server error from here');
                    });
            },
            /*clickCallback(page) {
                console.log(page)
            },*/
            closeModal() {
                HelperFunctions.closeModal();
                this.product = '';
            },
            userAll() {
                this.getUsers = ProductService.userAll()
            },
            userPaginate() {

            },
            productShow(product) {
                this.showProduct = {
                    category: product.category[0].title,
                    title: product.title,
                    price: product.price,
                    description: product.description
                };
                //console.log(this.showProduct.category[0].title)
            },
            productEdit(product) {
                this.editMode = true;
                this.product = product;
            },
            productDelete(id) {
                return this.$store.dispatch('Products/deleteProduct', {id});
            },
            registerProduct() {
                this.editMode = false;
                this.product = '';
                $('#product-register').toggle();
            },
            onFullNameSearch() {
                return ProductService.onFullNameSearch()
            },
            onUserNameSearch() {
                return ProductService.onUserNameSearch();
            },
            onEmailSearch() {
                return ProductService.onEmailSearch();
            },
            onSearch(search) {
                return ProductService.onSearch(search)
            },
        }
    }
</script>

<style scoped>

</style>
