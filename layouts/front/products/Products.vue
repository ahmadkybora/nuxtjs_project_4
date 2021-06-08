<template>
    <div class="container">
        <h3>Products</h3>
        <!--//-->
        <carousel :autoplay="true" :nav="false">
            <div v-for="product in products" :key="product.id" class="col-md-2">
                <div class="card" style="width: 15rem; border-radius: 15px">
                    <!--//-->
                    <img v-if="loading"
                         class="card-img-top circle float-right"
                         src="../../../assets/loader.gif"
                         alt="Card image cap"
                         style="width: 230px; height:150px;">
                    <!--//-->
                    <img v-else
                         class="card-img-top
                         float-right"
                         :src="'localhost:8000/storage/' + product.icon"
                         alt="Card image cap"
                         style="width: 230px; height:150px;">
                    <!--//-->
                    <!--<img v-else
                         class="card-img-top circle float-right"
                         src="https://placeimg.com/200/200/any?1"
                         alt="Card image cap"
                         style="width: 230px; height:150px;">-->
                    <!--//-->
                    <div class="card-body">
                        <h5 class="card-title" v-text="product.title"></h5>
                        <p class="card-text" v-text="product.description"></p>
                        <p class="card-text">Price: {{ product.price }}</p>
                    </div>
                    <!--//-->
                    <div class="card-footer">
                        <div class="row">
                            <div class="col" v-for="item in items" :key="item.id">
                                <span :class="item.color">
                                    <a @click="info(item.route, product.id)"><i :class="item.icon"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!--//-->
                </div>
            </div>
        </carousel>
        <!--//-->
        <!--<div class="owl-carousel owl-theme owl-loaded">
            <div class="owl-stage-outer">
                <div class="owl-stage">
                    <div class="owl-item">...</div>
                    <div class="owl-item">...</div>
                    <div class="owl-item">...</div>
                </div>
            </div>
            <div class="owl-nav">
                <div class="owl-prev">prev</div>
                <div class="owl-next">next</div>
            </div>
            <div class="owl-dots">
                <div class="owl-dot active"><span></span></div>
                <div class="owl-dot"><span></span></div>
                <div class="owl-dot"><span></span></div>
            </div>
        </div>-->
        <!--//-->
    </div>
</template>

<script>
    import $ from 'jquery';

    window.$ = $;
    import carousel from 'vue-owl-carousel'
    import {mapState} from 'vuex'
    import ProductItems from '../../../api/front/ProductItems.json';

    export default {
        name: "Products",
        components: {carousel},
        data() {
            return {
                loading: true,
                items: ProductItems,
            }
        },
        mounted() {
            this.loading = false;
            return this.$store.dispatch('Products/isProducts');
        },
        computed: {
            ...mapState({
                products: state => state.Products.isProducts
            })
        },
        methods: {
            info(item, productId) {
                switch (item) {
                    case "/profile/cart/add":
                        var totalQty = 1;
                        this.$store.dispatch('Carts/addToCart', {productId, totalQty});
                        break;

                    case "/product/show":
                        alert(2);
                        break;

                    case "/favorite":
                        alert(3);
                        break;

                    case "/dislike":
                        alert(4);
                        break;

                    case "/like":
                        alert(5);
                        break;
                }
            },
        }
    }
</script>

<style scoped>

</style>
