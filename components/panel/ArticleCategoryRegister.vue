<template>
  <div class="container" id="register" style="display: block;" ref="register">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="jumbotron">
            <h3>Register Article Categories</h3>
            <form @submit.prevent="onRegister()">

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <input type="text" v-model="name" name="name" id="name"
                           class="form-control" placeholder="Name">
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
                      <input class="form-check-input" type="radio" name="status" id="ACTIVE" value="ACTIVE">
                      <label class="form-check-label" for="ACTIVE">
                        ACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="INACTIVE" value="INACTIVE">
                      <label class="form-check-label" for="INACTIVE">
                        INACTIVE
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="SUSPENDED" value="SUSPENDED">
                      <label class="form-check-label" for="SUSPENDED">
                        SUSPENDED
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="PENDING" value="PENDING">
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
  export default {
    middleware: 'checkAuthEmployee',
    name: "ArticleCategoryRegister",
    data() {
      return {
        name: '',
        description: '',
      }
    },
    methods: {
      onRegister() {
        const isRegister = {
          name: this.name,
          description: this.description,
        };
        //AuthService.register(isRegister);
      },
    }
  }
</script>

<style scoped>

</style>
