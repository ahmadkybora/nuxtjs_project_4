<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div v-for="item in items" :key="item.id">
                        <div class="col-md">
                            <div class="card text-center" :style="item.color">
                                <div class="card-header">
                                    <nuxt-link v-text="item.title" :to="item.route"></nuxt-link>
                                </div>
                                <div class="card-body text-success"><i :class="item.icon"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderItems from '../../api/panel/HeaderItems.json';

    export default {
        middleware: 'checkAuthEmployee',
        name: "Header",
        data() {
            return {
                items: HeaderItems
            }
        }
    }
</script>

<style scoped>

</style>
