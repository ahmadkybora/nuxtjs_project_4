<template>
    <div class="container">
        <!--UserRegister-->
        <UserRegister :user="user" :editMode="editMode"></UserRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Register</h3>
                    </div>
                    <div class="col-md-3 offset-5">
                        <button @click="registerUser()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close</button>
                    </div>
                </div>
            </div>
            <table class="table table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>
                        <form class="form-inline" @submit.prevent="onFullNameSearch()">
                            <div class="form-group">
                                <input type="text" v-model="full_name_search" name="full-name" id="full-name"
                                       class="form-control" placeholder="Full Name">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>
                    </th>
                    <th>
                        <!--<form class="form-inline" @submit.prevent="onUserNameSearch()">
                            <div class="form-group">
                                <input type="text" v-model="username_search" name="username" id="username"
                                       class="form-control" placeholder="User Name">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>-->
                    </th>
                    <th>
                        <!--<form class="form-inline" @submit.prevent="onEmailSearch()">
                            <div class="form-group">
                                <input type="email" v-model="email_search" name="email" id="email" class="form-control"
                                       placeholder="Email">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>-->
                    </th>
                    <th>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                            <option value="PENDING">PENDING</option>
                        </select>
                    </th>
                    <th>#</th>
                    <th>#</th>
                </tr>
                </thead>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index }}</td>
                    <td>{{ user.first_name + ' ' + user.last_name }}</td>
                    <td v-text="user.username"></td>
                    <td v-text="user.email"></td>
                    <td v-if="user.gender === 0">Male</td>
                    <td v-else-if="user.gender === 1">Female</td>
                    <td>
                        <img class="rounded-circle" :src="user.icon" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="user.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="user.state">ACTIVE
                        </button>
                        <button v-if="user.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="user.state">INACTIVE
                        </button>
                        <button v-if="user.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="user.state">SUSPENDED
                        </button>
                        <button v-if="user.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="user.state">PENDING
                        </button>
                    </td>
                    <td>{{ user.created_at + ' ' + user.updated_at }}</td>
                    <td>
                        <a @click="userShow(user)" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <UserShow :showUser="showUser"></UserShow>
                        <!-- Modal -->
                        <!--<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p v-text="showUser.first_name"></p>
                                        <p v-text="showUser.last_name"></p>
                                        <p v-text="showUser.username"></p>
                                        <p v-text="showUser.email"></p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                        /
                        <a href="#register" @click="userEdit(user)"><i class="fas fa-pen text-success"></i></a>
                        /
                        <a @click="userDelete(user.id)"><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
            </table>

        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import UserRegister from '../../components/panel/UserRegister';
    import UserShow from '../../components/panel/modal/UserShow';
    import { UserService } from '../../services/panel/UserService';
    import HelperFunctions from '../../helpers/HelperFunctions';

    import { mapState } from 'vuex'

    window.$ = $;
    export default {
        middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Users",
        components: { UserRegister, UserShow },
        data() {
            return {
                //editMode: false,
                token: JSON.parse(window.localStorage.getItem('token')),
                state_search: '',
                full_name_search: '',
                username_search: '',
                email_search: '',
                search: '',
                dialog: '',
                page: 1,
                employee: {},
                employees: {},
                getUsers: {},
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
                user: '',
                editMode: false,
                showUser: {
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                },
            }
        },
        mounted() {
            //return UserService.user;
            return this.$store.dispatch('Users/getUsers');
        },
        computed: {
            ...mapState({
                users: state => state.Users.getUsers,
                //showUser: state => state.Users.isUser,
                editUser: state => state.Users.isUser,
                //deleteUser: state => state.Users.isUser,
            })
        },
        methods: {
            closeModal() {
                HelperFunctions.closeModal();
            },
            userAll() {
                this.getUsers = UserService.userAll()
            },
            userPaginate() {

            },
            userShow(user) {
                this.showUser = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                };
                //return this.$store.dispatch('Users/showUser', {id});
            },
            userEdit(user) {
                this.editMode = true;
                this.user = user;
            },
            userDelete(id) {
                return this.$store.dispatch('Users/deleteUser', {id});
            },
            registerUser() {
                this.editMode = false;
                this.user = '';
                $('#user-register').toggle();
            },
            onFullNameSearch() {
                return UserService.onFullNameSearch()
            },
            onUserNameSearch() {
                return UserService.onUserNameSearch();
            },
            onEmailSearch() {
                return UserService.onEmailSearch();
            },
            onSearch(search) {
                return UserService.onSearch(search)
            },
        }
    }
</script>

<style scoped>

</style>
