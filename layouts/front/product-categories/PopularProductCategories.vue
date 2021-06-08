<template>
    <div class="container">
        <h3>Popular ProductCategories</h3>

        <carousel :autoplay="true" :nav="false">
            <div v-for="category in popularProductCategories" :key="category.id" class="col-md-2">
                <div class="card" style="width: 15rem; border-radius: 15px">
                    <img v-if="!loading"
                         class="card-img-top circle float-right"
                         src="../../../assets/loader.gif"
                         alt="Card image cap"
                         style="width: 230px; height:150px;">
                    <img v-else class="card-img-top float-right" :src="category.icon" alt="Card image cap" style="width:150px;">
                    <div class="card-body">
                        <!--<h5 class="card-title" v-text="category.title.substring(0, 10)"></h5>
                        <p class="card-text" v-text="category.description.substring(0, 10)"></p>-->
                        <h5 class="card-title" v-text="category.title"></h5>
                        <p class="card-text" v-text="category.description"></p>
                        <p class="card-text">Price: {{ category.price }}</p>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col"><a><i class="text-primary fas fa-info"></i></a></div>
                            <div class="col"><a><i class="text-success fas fa-shopping-basket"></i></a></div>
                            <div class="col"><a><i class="text-danger fas fa-heart"></i></a></div>
                            <div @click="likes(category)" class="col">
                                <a><i class="text-primary fa fa-thumbs-down"></i></a>
                            </div>
                            <div @click="dislikes(category)" class="col">
                                <a><i class="text-primary fa fa-thumbs-up"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </carousel>

    </div>
</template>

<script>
  import $ from 'jquery';
  window.$ = $;
  import carousel from 'vue-owl-carousel'
  import ProductItems from '../../../api/front/ProductCategoryItems.json'
  import { mapState } from 'vuex';

  export default {
    name: "PopularProductCategories",
    components: { carousel },

    data() {
      return {
        items: ProductItems,
        loading: true,
      }
    },
    mounted() {
      this.loading = false;
        return this.$store.dispatch('productCategories/isProductCategories');
    },
    computed: mapState({
        popularProductCategories: state => state.productCategories.isProductCategories
    }),
    methods: {
      likes(product) {
        let likes = {
          product: product.id,
          state: 'LIKE',
        };
        return this.$store.dispatch('likes', likes);
      },
      dislikes(product) {
        let dislikes = {
          product: product.id,
          state: 'DISLIKE',
        };
        return this.$store.dispatch('dislikes', dislikes);
      }
    }
  }
</script>

<style scoped>

</style>
