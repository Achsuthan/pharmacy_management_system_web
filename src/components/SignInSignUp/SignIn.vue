<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <div class="mb-3">
            <div>
              <label>Login As Laboratory</label><c-switch class="mx-1" color="primary"  variant="pill" v-model="laboratory" />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      autocomplete="username email"
                      v-model="email"
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
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="loginFn()">Login</b-button>
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Don't you have account form pharmacy? Click Register Now and create new pharmacy account.</p>
                  <b-button
                    variant="primary"
                    class="active mt-3"
                    @click="registerFn()"
                  >Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
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
  name: "Login",
  components: {
    cSwitch
  },
  data() {
    return {
      email: null,
      password: null,
      laboratory: false,
    };
  },
  methods: {
    registerFn() {
      this.$router.push("signup");
    },
    loginFn() {
      if (this.email && this.password) {
        let obj = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("setLoading", true)
        if(!this.laboratory){
          loginService
          .loginPharmacy(obj)
          .then(res => {
            this.$store.dispatch("setLoading", false)
            if (res.data.status == 200) {
              console.log("success");
              var user = res.data.details
              user.isPharmacy = true
              console.log(user)
              localStorage.setItem("user", JSON.stringify(user))
              this.$store.dispatch("setUser", user)
              this.$router.push("home")
              this.$store.dispatch("setLoading", false);
            } else {
              this.$store.dispatch("setLoading", false)
              console.log("fail");
              messageHandler.errorMessage("Failed", res.data.message);
            }
          })
          .catch(error => {
            this.$store.dispatch("setLoading", false)
            console.log(error);
            messageHandler.networkError();
          });
        }
        else {
          loginService
          .loginLaboratoryFn(obj)
          .then(res => {
            if (res.data.status == 200) {
              var user = res.data.details
              user.isPharmacy = false
              localStorage.setItem("user", JSON.stringify(user))
              this.$store.dispatch("setLoading", false)
              this.$store.dispatch("setUser", user)
              this.$router.push("home")
              console.log("success");
            } else {
              this.$store.dispatch("setLoading", false)
              console.log("fail");
              messageHandler.errorMessage("Failed", res.data.message);
            }
          })
          .catch(error => {
            this.$store.dispatch("setLoading", false)
            console.log(error);
            messageHandler.networkError();
          });
        }
      } else {
        messageHandler.errorMessage("Failed", "Email and Password required");
      }
    }
  }
};
</script>
