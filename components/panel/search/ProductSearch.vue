<template>
    <div class="container">
        <form @submit.prevent="onSearch()">
            <div class="input-group">
                <input type="text" v-model="search" name="search" id="search"
                       class="form-control" placeholder="Please search....">
                <div class="input-group-btn">
                    <button class="btn btn-success" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { ProductService } from '../../../services/panel/ProductService';
    export default {
        name: "ProductSearch",
        data() {
            return {
                search: ''
            }
        },
        methods: {
            onSearch() {
                return ProductService.onSearch()
            }
        }
    }
</script>

<style scoped>

</style>
