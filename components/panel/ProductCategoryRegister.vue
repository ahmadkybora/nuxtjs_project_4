<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode" >Register Product Categories</h3>
                        <h3 v-if="editMode" >Update Product Categories</h3>
                        <form @submit.prevent="editMode ? categoryUpdate(category) : categoryCreate()">

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <select type="text" v-model="category.brand_id" name="brand_id" id="brand-id"
                                                class="form-control">
                                            <option value="">Please Select Brand</option>
                                            <option v-for="brand in brands" :value="brand.id" v-text="brand.title"></option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" v-model="category.title" name="title" id="title"
                                               class="form-control" placeholder="Name">
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea v-model="category.description" name="description" id="description"
                                              class="form-control" placeholder="Description" rows="7"></textarea>
                                    </div>
                                </div>
                            </div>

                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                  <input type="file">
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="category.status" name="status" id="ACTIVE" value="ACTIVE">
                                  <label class="form-check-label" for="ACTIVE">
                                    ACTIVE
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="category.status" name="status" id="INACTIVE" value="INACTIVE">
                                  <label class="form-check-label" for="INACTIVE">
                                    INACTIVE
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="category.status" name="status" id="SUSPENDED" value="SUSPENDED">
                                  <label class="form-check-label" for="SUSPENDED">
                                    SUSPENDED
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="category.status" name="status" id="PENDING" value="PENDING">
                                  <label class="form-check-label" for="PENDING">
                                    PENDING
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <input type="file" class="form-control">
                              </div>
                            </div>
                          </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button v-if="!editMode" class="btn btn-success" type="submit">Register</button>
                                        <button v-if="editMode" class="btn btn-primary" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        middleware: 'checkAuthEmployee',
        name: "ProductCategoryRegister",
        data () {
            return {
                id: '',
                brand_id: '',
                title: '',
                description: '',
            }
        },
        props: ['category', 'editMode'],
        methods: {
            categoryCreate() {
                const isRegister = {
                    brand_id: this.brand_id,
                    title: this.title,
                    description: this.description,
                };
                return this.$store.dispatch('ProductCategories/isProductCategoriesCreate', isRegister)
            },
            categoryUpdate(category) {
                const isUpdate = {
                    id: category.id,
                    brand_id: category.brand_id,
                    title: category.title,
                    description: category.description,
                };
                return this.$store.dispatch('ProductCategories/isProductCategoriesUpdate', isUpdate)
            }
        },
        computed: {
            ...mapState({
                brands: state => state.Brands.getBrands,
            })
        },
        mounted() {
            return this.$store.dispatch('Brands/getBrands')
        }
    }
</script>

<style scoped>

</style>
