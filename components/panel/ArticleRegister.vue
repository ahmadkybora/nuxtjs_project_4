<template>
  <div class="container" id="register" style="display: block;" ref="register">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="jumbotron">
            <h3 v-if="!editMode">Register Articles</h3>
            <h3 v-if="editMode">Update Articles</h3>
            <form @submit.prevent="editMode ? articleUpdate(article) : articleCreate()">

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="article.title" name="name" id="title"
                           class="form-control" placeholder="Insert Title">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <select v-model="article.category_id" name="category_id" id="category-id"
                            class="form-control">
                      <option value="">Please Select Category</option>
                      <option v-for="category in categories" :value="category.id" v-text="category.title"></option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                                    <textarea v-model="article.description" name="description" id="description"
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
                      <input class="form-check-input" type="radio" v-model="article.status" name="status" id="ACTIVE" value="ACTIVE">
                      <label class="form-check-label" for="ACTIVE">
                        ACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="article.status" name="status" id="INACTIVE" value="INACTIVE">
                      <label class="form-check-label" for="INACTIVE">
                        INACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="article.status" name="status" id="SUSPENDED" value="SUSPENDED">
                      <label class="form-check-label" for="SUSPENDED">
                        SUSPENDED
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="article.status" name="status" id="PENDING" value="PENDING">
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
    name: "ArticleRegister",
    data() {
      return {
        id: '',
        title: '',
        category_id: '',
        description: '',
        icon: '',
      }
    },
    props: ['article', 'editMode'],
    methods: {
      articleCreate() {
        const isRegister = {
          title: this.title,
          category_id: this.category_id,
          description: this.description,
        };
        return this.$store.dispatch('Articles/isArticleRegister', isRegister)
      },
      articleUpdate(article) {
        const isUpdate = {
          id: article.id,
          title: article.title,
          category_id: article.category_id,
          description: article.description,
        };
        return this.$store.dispatch('Articles/isArticleUpdate', isUpdate)
      },
    },
    computed: {
      ...mapState({
        categories: state => state.ArticleCategories.getArticleCategories
      })
    },
    mounted() {
      return this.$store.dispatch('ArticleCategories/getArticleCategories')
    }
  }
</script>

<style scoped>

</style>
