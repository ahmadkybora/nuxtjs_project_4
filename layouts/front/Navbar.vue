<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div v-if="isAuthenticated">
                    <p>Welcome: </p>
                    <h5 v-text="fullName"></h5>
                </div>
            </div>
            <div class="col-lg-5 col-md-4">
                <form>
                    <div class="row">
                        <div class="col-md-11">
                            <div class="form-group">
                                <input type="text" v-model="search" name="search" id="search" class="form-control"
                                       placeholder="What Do You Mind...">
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <button class="btn bbtn" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="row">
                    <div v-if="isAuthenticated" class="offset-lg-6 col-lg-6 offset-md-6 col-md-6">
                        <button @click="isUserLogout()" class="btn btn-warning" style="border-radius: 15px;">Logout</button>
                        <button class="btn btn-success" style="border-radius: 15px;">Profile</button>
                        <nuxt-link to="/profile/cart" ><i class="fa fa-cart-plus fa-2x text-secondary" aria-hidden="true"></i></nuxt-link>
                    </div>
                    <div v-else>
                        <nuxt-link class="bbtn btn" to="/login">Login</nuxt-link>
                        <nuxt-link class="bbtn btn" to="/register">Register</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Navbar',
        data() {
            return {
                search: '',
            }
        },
        computed: {
            ...mapState({
                fullName: state => state.Auth.isUser,
                isAuthenticated: state => state.Auth.tokenUser
            }),
        },
        methods: {
            isUserLogout(){
                return this.$store.dispatch('Auth/isUserLogout');
            }
        },
        mounted() {
            //console.log(this.fullName)
        }
    }
</script>

<style scoped>
    .container-fluid {
        height: 100px;
    }

    .bbtn {
        background-color: aquamarine;
        border-radius: 15px;
    }
</style>
