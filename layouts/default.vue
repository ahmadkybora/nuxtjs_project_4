<template>
  <div>
    <Navbar/>
    <Header/>
    <Banner/>
    <Products/>
    <PopularProducts/>
    <ProductCategories/>
    <PopularBrands/>
<!--    <Articles/>
    <ArticleCategories/>-->
    <PopularArticles/>
    <Nuxt/>
<!--    <brands/>-->
    <Footer/>
  </div>
</template>

<script>
  import Navbar from '../layouts/front/Navbar'
  import Header from '../layouts/front/Header'
  import Banner from './front/Banner'
  import Products from './front/products/Products'
  import Footer from './front/Footer'
  import ProductCategories from './front/product-categories/ProductCategories'
  import Brands from './front/brands/Brands'
  import ArticleCategories from './front/article-categories/ArticleCategories'
  import Articles from './front/articles/Articles'
  import PopularProducts from './front/products/PopularProducts'
  import PopularBrands from './front/brands/PopularBrands'
  import PopularArticles from './front/articles/PopularArticles'

  export default {
    name: 'default',
    components: {
      PopularArticles,
      PopularBrands,
      PopularProducts,
      Articles,
      ArticleCategories,
      Brands,
      ProductCategories,
      Footer,
      Products,
      Banner,
      Header,
      Navbar
    }
  }
</script>

<style>

</style>
