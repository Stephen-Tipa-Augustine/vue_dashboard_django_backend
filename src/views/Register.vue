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
                    <h2 class="h4 text-gray-800 mb-4"><strong>Registration</strong></h2>
                  </div>
                  <div v-if="error" class="row">
                    <p class="text-center text-danger">
                      {{error}}
                    </p>
                  </div>
                  <div v-if="serverError" class="row">
                    <p class="text-center text-danger">
                      {{serverError}}
                    </p>
                  </div>
                  <!-- login form -->
                  <form @submit.prevent="register" class="user">
                    <div class="row">
                      <div class="col-md-6">
                        <label>Username:
                        <input type="text" class="form-control" placeholder="Jane Doe" required
                               autofocus v-model="form.username">
                      </label>
                      </div>
                      <div class="col-md-6">
                        <label>Email:
                          <input type="email" class="form-control"
                                 placeholder="jane@jane.com" required v-model="form.email">
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label>First Name:
                          <input type="text" class="form-control"
                               placeholder="John" required v-model="form.firstName">
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label>Last Name:
                          <input type="text" class="form-control"
                                 placeholder="Paul" required v-model="form.lastName">
                        </label>
                      </div>
                      <div class="col-md-12">
                        <label>Phone Number:
                          <input type="text" class="form-control"
                                 placeholder="+256777777777" required v-model="form.phone">
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label>Password:
                          <input type="password" class="form-control" @change="validatePassword"
                               placeholder="********" required v-model="form.password">
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label>Confirm Password:
                          <input type="password" class="form-control" @change="validateConfirmPassword"
                               placeholder="********" required v-model="form.passwordConfirm">
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small" style="margin-top: 10px;">
                        <input type="checkbox" class="custom-control-input" style="margin-right: 5px;"
                               v-model="form.termsAccepted" id="customCheck">
                        <label class="custom-control-label" style="vertical-align: center" for="customCheck">
                          I Accept Terms and Conditions
                        </label>
                      </div>
                    </div>
                    <button type="submit" :disabled="!form.termsAccepted || error"
                    class="btn btn-info btn-user btn-block" style="margin-top: 10px">
                      Register
                    </button>
                    <p id="signup-container">
                      <strong>Already have an account? </strong>
                      <u><a class="nav-link" id="signup-btn" @click="login">Login</a></u>
                    </p>
                    <!-- Modal to show the loading effect during registration -->
                    <div class="busy-modal" id="modal">
                        <div class="busy-modal-content">
                          <div style="width: 100%; display: block;">
                            <p style="text-align: center">
                              {{loaderText}}
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
  name: 'SignUp',
  data() {
    return {
      form: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        termsAccepted: false,
      },
      loaderText: 'Registering ...',
      error: null,
      serverError: null,
      users: [],
      applicationVerifier: null,
      registering: false,
    };
  },
  mounted() {
  },
  methods: {
    validateEmail() {
      this.users.forEach(() => {
        if (!this.form.email.contains('@')) {
          this.error = 'Invalid Email!'
            + ' Your email: name@domain...';
        }
      });
      this.error = null;
    },
    validateName() {
      const names = this.form.name.split(' ');
      if (names.length < 1) {
        this.error = 'Enter your name please!';
      } else {
        this.error = null;
      }
    },
    validatePassword() {
      const { password } = this.form;
      if (password.length < 8) {
        this.error = 'Your password is too short, it must be 8 characters long';
      } else {
        this.error = null;
      }
    },
    validateConfirmPassword() {
      const { password, passwordConfirm } = this.form;
      if (password !== passwordConfirm) {
        this.error = 'The confirm value does not match the password you entered!';
      } else {
        this.error = null;
      }
    },
    async register() {
      this.error = null
      this.loaderText = 'Registering ...';
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      this.$store.dispatch('register', this.form)
          .then(() => {
            this.loaderText = 'logging in ...';
            this.$store.dispatch('login', {
              email: this.form.email,
              password: this.form.password,
            })
            .then(() => {
              modal.style.display = 'none';
              this.$router.replace({name: 'dashboard'});
            })
            .catch((error) => {
              modal.style.display = 'none';
              this.serverError = error
            });
          })
          .catch((error) => {
            modal.style.display = 'none';
            this.serverError = error
          });
    },
    login() {
      this.$router.replace({ name: 'login' });
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
.bg-login-image {
  background-image: url("/img/avatars/auth-img.jpg");
  background-position: center;
  background-size: cover;
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


</style>
