<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Edit Profile</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Username"
                      placeholder="Username"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="password"
                      label="Password"
                      placeholder="Your password"
                      v-model="user.password">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="Email"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
            Update Profile
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: {
          username: 'jdoe',
          email: 'john.doe@algebra.hr',
          password: 'admin123',
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
