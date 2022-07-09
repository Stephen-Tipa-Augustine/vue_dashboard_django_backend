<template>
<!-- eslint-disable max-len -->
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h1 text-success mb-2"><strong>KAYOOLA PASSENGER EXPERIENCE SYSTEM (KPES)</strong></h1>
                    <h2 class="h4 text-gray-800 mb-4">Web Portal</h2>
                  </div>
                  <div v-if="error" class="row">
                    <p class="text-center text-danger">
                    {{error}}
                    </p>
                  </div>
                  <!-- login form -->
                  <form @submit.prevent="login" class="user">
                    <div class="row">
                      <div class="col-12">
                        <label>Email
                          <input type="email" class="form-control form-control-user" placeholder="john@..."
                               required autofocus v-model="form.email">
                        </label>
                      </div>
                      <div class="col-12">
                        <label>Password:
                          <input type="password" class="form-control form-control-user" placeholder="Password"
                               required v-model="form.password">
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small" style="margin-top: 10px;">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Remember Me</label>
                      </div>
                    </div>
                    <input type="submit" value="Login" class="btn btn-info btn-user btn-block">
                    <p id="signup-container">
                      <strong>Don't have an account? </strong>
                      <u>
                        <a class="nav-link" id="signup-btn" @click="register">Create One</a>
                      </u>
                    </p>

                    <!-- Modal to show the loading effect during login -->
                    <div class="busy-modal" id="modal">
                        <div class="busy-modal-content">
                          <div style="width: 100%; display: block;">
                            <p style="text-align: center">
                              Logging in...
                            </p>
                            <BusyLoader />
                          </div>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BusyLoader from "../components/BusyLoader.vue";
export default {
  components: {BusyLoader},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
      users: [],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    loadingModal() {
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      // When the user clicks anywhere outside of the modal, close it
      // eslint-disable-next-line func-names
      window.onclick = function (event) {
        // eslint-disable-next-line eqeqeq
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    },
    async login() {
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      // Send a POST request to the API
      this.$store.dispatch('login', this.form).then((res) => {
        modal.style.display = 'none';
        this.$router.replace({name: 'dashboard'});
      }).catch((error) => {
        // Log the error
        modal.style.display = 'none';
        this.error = error
      });

    },
    register() {
      this.$router.replace({ name: 'register' });
    },
  },
};
</script>

<style scoped>
#signup-container{
  margin-top: 20px;
}
#signup-btn{
  display: inline;
  color: blue;
  cursor: pointer;
  text-underline: blue;
}
#signup-btn:hover{
  color: deepskyblue;
  text-shadow: #6b6d7d;
}
#notice{
  font-size: smaller;
  color: saddlebrown;
}

.busy-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.busy-modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: fit-content; /* Could be more or less, depending on screen size */
}

.bg-login-image {
  background-image: url("/img/avatars/auth-img.jpg");
  background-position: center;
  background-size: cover;
}

</style>
