<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3>Register Brands</h3>
                        <form @submit.prevent="onRegister()" enctype="multipart/form-data">

                            <div class="error alert-danger" v-if="!$v.name.required">Name is required.</div>
                            <div class="error alert-danger" v-if="!$v.name.minLength">Name must have at least
                                {{ $v.name.$params.minLength.min }} letters.
                            </div>
                            <div class="error alert-danger" v-if="!$v.employeeId.required">Employee is required.</div>
                            <div class="error alert-danger" v-if="!$v.description.required">Description is required.
                            </div>
                            <div class="error alert-danger" v-if="!$v.description.minLength">Name must have at least
                                {{ $v.description.$params.minLength.min }} letters.
                            </div>
                            <div class="error alert-danger" v-if="!$v.status.required">Status is required.</div>
                            <div class="error alert-danger" v-if="!$v.image.required">Image is required.</div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text"
                                               v-model="name"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <select v-model="employeeId" name="employeeId" id="employeeId"
                                                class="form-control">
                                            <option value="">Employee</option>
                                            <option v-for="employee in employees" :value="employee.id">
                                                {{ employee.username }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" :class="{ 'form-group--error': $v.description.$error }">
                                    <textarea v-model.trim="$v.description.$model" name="description" id="description"
                                              class="form-control form__input" placeholder="Description"
                                              rows="7"></textarea>
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
                                            <input
                                                    :class="{ 'form-group--error': $v.status.$error }"
                                                    class="form-check-input"
                                                    type="radio"
                                                    v-model.trim="$v.status.$model"
                                                    name="status"
                                                    id="ACTIVE"
                                                    value="ACTIVE"
                                            >
                                            <label
                                                    class="form-check-label"
                                                    for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" v-model="status" name="status"
                                                   id="INACTIVE" value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" v-model="status" name="status"
                                                   id="SUSPENDED" value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" v-model="status" name="status"
                                                   id="PENDING" value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="file" @change="onFileSelected" name="image" id="image"
                                               class="form-control">
                                    </div>
                                    <div v-if="isSelected !== false">
                                        <img class="rounded-circle" :src="showImage" style="width: 100px; height: 100px">
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button class="button btn btn-primary" type="submit"
                                                :disabled="submitStatus === 'PENDING'">Register
                                        </button>
                                        <p class="typo__p alert-success" v-if="submitStatus === 'OK'">Registered is successfully!</p>
                                        <p class="typo__p alert-danger" v-if="submitStatus === 'ERROR'">Please fill the
                                            form correctly.</p>
                                        <p class="typo__p alert-warning" v-if="submitStatus === 'PENDING'">
                                            Sending...</p>
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
    import {
        required,
        minLength,
        maxLength,
        between
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'checkAuthEmployee',
        name: "BrandRegister",
        mounted() {
            return this.$store.dispatch('Employees/getEmployees');
        },
        data() {
            return {
                name: '',
                employeeId: '',
                description: '',
                status: '',
                image: '',
                submitStatus: '',
                isSelected: false,
                showImage: '',
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            employeeId: {
                required,
            },
            description: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            status: {
                required,
            },
            image: {
                required,
            },
        },
        computed: {
            ...mapState({
                employees: state => state.Employees.getEmployees,
            })
        },
        methods: {
            onFileSelected(event) {
                this.image = event.target.files[0];
                let fileReader = new FileReader();
                fileReader.readAsDataURL(this.image);
                fileReader.onload = (e) => {
                    this.showImage = e.target.result;
                };
                this.isSelected = true;
            },
            onRegister() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500);
                    const isRegister = {
                        name: this.name,
                        employeeId: this.employeeId,
                        description: this.description,
                        status: this.status,
                        image: this.image,
                    };
                    return this.$store.dispatch('Brands/RegisterBrand', isRegister)
                        .then(() => {
                            this.name = '';
                            this.employeeId = '';
                            this.description = '';
                            this.status = '';
                            this.image = '';
                            this.submitStatus = '';
                            this.isSelected = false;
                            this.showImage = '';
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
