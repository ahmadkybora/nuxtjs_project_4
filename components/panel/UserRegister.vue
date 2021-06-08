<template>
  <div class="container" id="register" style="display: block;" ref="register">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="jumbotron">
            <h3 v-if="!editMode">Register Users</h3>
            <h3 v-if="editMode">Update Users</h3>
            <form @submit.prevent="editMode ? userUpdate(user) : userCreate()">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" v-model="user.first_name" name="first_name" id="first-name"
                           class="form-control" placeholder="First Name">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" v-model="user.last_name" name="last_name" id="last-name"
                           class="form-control" placeholder="Last Name">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" v-model="user.username" name="username" id="username"
                           class="form-control" placeholder="User Name">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="email" v-model="user.email" name="email" id="email"
                           class="form-control" placeholder="Email">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="number" v-model="user.mobile" name="mobile" id="mobile"
                           class="form-control" placeholder="Mobile">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" v-model="user.home_phone" name="home_phone" id=home-phone
                           class="form-control" placeholder="Home Phone">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" v-model="user.zip_code" name="zip_code" id="zip-code"
                           class="form-control" placeholder="Zip Code">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="password" v-model="user.password" name="password" id="password"
                           class="form-control" placeholder="Password">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="password" v-model="user.confirmation_password" name="confirmation_password"
                           id="confirmation-password"
                           class="form-control" placeholder="Password Confirmation">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                                    <textarea v-model="user.home_address" name="home_address" id="home-address"
                                              class="form-control" placeholder="Home Address" rows="3"></textarea>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                                    <textarea v-model="user.work_address" name="work_address" id="work-address"
                                              class="form-control" placeholder="Work Address" rows="3"></textarea>
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
                      <input class="form-check-input" type="radio" v-model="user.state" name="status" id="ACTIVE" value="ACTIVE">
                      <label class="form-check-label" for="ACTIVE">
                        ACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="user.state" name="status" id="INACTIVE" value="INACTIVE">
                      <label class="form-check-label" for="INACTIVE">
                        INACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="user.state" name="status" id="SUSPENDED" value="SUSPENDED">
                      <label class="form-check-label" for="SUSPENDED">
                        SUSPENDED
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="user.state" name="status" id="PENDING" value="PENDING">
                      <label class="form-check-label" for="PENDING">
                        PENDING
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="file" class="form-control">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <button v-if="!editMode" class="btn btn-success" type="submit">Register</button>
                    <button v-if="editMode" class="btn btn-primary" type="submit">Update</button>
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
  import { mapState } from 'vuex';

  export default {
    middleware: 'checkAuthEmployee',
    name: "UserRegister",
    data() {
      return {
        id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        mobile: '',
        home_phone: '',
        zip_code: '',
        password: '',
        confirmation_password: '',
        home_address: '',
        work_address: '',
      }
    },
    props: ['user', 'editMode'],
    computed: {
      ...mapState({
        users: state => state.Users.getUsers,
        showUser: state => state.Users.isUser,
        //editUser: state => state.Users.isUser,
        //deleteUser: state => state.Users.isUser,
      })
    },
    methods: {
      userCreate() {
        const isRegister = {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          mobile: this.mobile,
          home_phone: this.home_phone,
          zip_code: this.zip_code,
          password: this.password,
          confirmation_password: this.confirmation_password,
          home_address: this.home_address,
          work_address: this.work_address,
        };
        return this.$store.dispatch('Users/isUserRegister', isRegister)
      },
      userUpdate(user) {
        const isUpdate = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          home_phone: user.home_phone,
          zip_code: user.zip_code,
          password: user.password,
          confirmation_password: user.confirmation_password,
          home_address: user.home_address,
          work_address: user.work_address,
        }
        return this.$store.dispatch('Users/isUserUpdate', isUpdate)
      },
    }
  }
</script>

<style scoped>

</style>
