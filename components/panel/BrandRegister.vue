<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3>Register Brands</h3>
                        <form @submit.prevent="onRegister()" enctype="multipart/form-data">

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" v-model="name" name="name" id="name"
                                               class="form-control" placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <select v-model="employeeId" name="employeeId" id="employeeId"
                                                class="form-control">
                                            <option value="">Employee</option>
                                            <option v-for="employee in employees" :value="employee.id">{{ employee.username }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea v-model="description" name="description" id="description"
                                              class="form-control" placeholder="Description" rows="7"></textarea>
                                    </div>
                                </div>
                            </div>

                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">

                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="status" name="status" id="ACTIVE" value="ACTIVE">
                                  <label class="form-check-label" for="ACTIVE">
                                    ACTIVE
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="status" name="status" id="INACTIVE" value="INACTIVE">
                                  <label class="form-check-label" for="INACTIVE">
                                    INACTIVE
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="status" name="status" id="SUSPENDED" value="SUSPENDED">
                                  <label class="form-check-label" for="SUSPENDED">
                                    SUSPENDED
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" v-model="status" name="status" id="PENDING" value="PENDING">
                                  <label class="form-check-label" for="PENDING">
                                    PENDING
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <input type="file" @change="onFileSelected" name="image" id="image" class="form-control">
                              </div>
                            </div>
                          </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary" type="submit">Register</button>
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
    import {mapState} from 'vuex';

    export default {
        middleware: 'checkAuthEmployee',
        name: "BrandRegister",
        mounted() {
            return this.$store.dispatch('Employees/getEmployees');
        },
        data () {
            return {
                name: '',
                employeeId: '',
                description: '',
                status: '',
                image: ''
            }
        },
        computed: {
            ...mapState({
                employees: state => state.Employees.getEmployees,
            })
        },
        methods: {
            onFileSelected(event) {
                return this.image = event.target.files[0];
            },
            onRegister() {
                const isRegister = {
                    name: this.name,
                    employeeId: this.employeeId,
                    description: this.description,
                    status: this.status,
                    image: this.image,
                };
                return this.$store.dispatch('Brands/RegisterBrand', isRegister)
            },
        }
    }
</script>

<style scoped>

</style>
