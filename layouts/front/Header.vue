<template>
    <div class="container">
        <div class="row">
            <div class="col" v-for="item in items" :key="item.id">
                <div :style="item.color">
                    <nuxt-link class="btn" v-text="item.title" :to="item.route" prefetch></nuxt-link>
                    <div class="text-center" :style="item.color"><i :class="item.icon"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderItems from '../../api/front/HeaderItems.json';

    export default {
        name: 'Header',
        data() {
            return {
                items: HeaderItems
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: aquamarine;
        border-radius: 15px;
    }

    .container {
        background-color: skyblue;
        border-radius: 15px;
    }
</style>
