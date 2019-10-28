<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-col md="8">
            <div class="mb-3">
              <div>
                <label>Register As Laboratory</label>
                <c-switch class="mx-1" color="primary" variant="pill" v-model="laboratory" />
              </div>
            </div>
          </b-col>
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="text"
                    class="form-control"
                    v-model="name"
                    placeholder="Pharmacy Name"
                    autocomplete="username"
                  />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="email"
                    v-model="email"
                    class="form-control"
                    placeholder="Email"
                    autocomplete="email"
                  />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    v-model="password1"
                    class="form-control"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </b-input-group>

                <b-button variant="success" block @click="createAccountFn()">Create Account</b-button>
                <b-button variant="success" block @click="signInFn()">Sign In</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import loginService from "../../services/login.service";
import messageHandler from "../../handler/messageHandler";
import { Switch as cSwitch } from "@coreui/vue";
export default {
  name: "Register",
  components: {
    cSwitch
  },
  data() {
    return {
      email: null,
      password: null,
      laboratory: false,
      password1: null,
      name: null,

      error: {
        password: false,
        name: false,
        email: false
      }
    };
  },
  methods: {
    signInFn() {
      this.$router.push("signin");
    },
    createAccountFn() {
      // this.$router.push("home");
      this.formValidation();

      if (!this.error.name && !this.error.email && !this.error.password) {
        let obj = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        if (!this.laboratory) {
          loginService
            .registerPharmacyFn(obj)
            .then(res => {
              if (res.data.code == 200) {
                console.log("success");
              } else {
                console.log("fail");
                messageHandler.errorMessage("Failed", res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
              messageHandler.networkError();
            });
        } else {
          loginService
            .registerLaboratoryFn(obj)
            .then(res => {
              if (res.data.code == 200) {
                console.log("success");
              } else {
                console.log("fail");
                messageHandler.errorMessage("Failed", res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
              messageHandler.networkError();
            });
        }
      } else {
        if (this.error.name) {
          messageHandler.errorMessage("Failed", "Name requried");
        } else if (this.error.email) {
          messageHandler.errorMessage("Failed", "Email requried");
        } else {
          messageHandler.errorMessage("Failed", "Password requried");
        }
      }
    },
    formValidation() {
      if (!this.email) {
        this.error.email = true;
      }

      if (!this.password && !this.password1) {
        this.error.password = true;
      } else {
        if (this.password != this.password1) {
          this.error.password = true;
        }
      }

      if (!this.name) {
        this.error.name = true;
      }
    }
  }
};
</script>
