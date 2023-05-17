<template>
  <v-dialog v-model="loginDialog" width="500">
    <v-container class="pa-0">
      <v-card class="elevation-12">
        <v-card-title class="text-h5 grey lighten-2">
          <v-row no-gutters>
            <v-col class="pa-0">{{
              type !== "signUp" ? "Log In" : "Sign Up"
            }}</v-col>
            <v-spacer></v-spacer>
            <v-btn icon @click="loginDialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-if="error !== ''" class="error-text">
            {{ error.substr(9) }}
          </div>
          <v-form>
            <v-text-field
              v-if="type === 'signUp' && !isForgetPassword"
              prepend-icon="mdi-account"
              name="name"
              label="Name"
              type="text"
              v-model="name"
              clearable
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account"
              name="user"
              label="Email"
              type="text"
              v-model="username"
              clearable
            ></v-text-field>
            <v-text-field
              v-if="!isForgetPassword"
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              clearable
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-h5 grey lighten-2 border-top">
          <v-spacer></v-spacer>
          <v-btn
            v-if="type === 'login'"
            text
            color="primary"
            @click="forgetPassword()"
            >forget password</v-btn
          >
          <v-btn
            v-if="!isForgetPassword"
            color="primary"
            @click="doLogin()"
            :disabled="!canLogin"
            :loading="loader"
            >{{ type !== "signUp" ? "LogIn" : "SignUp" }}</v-btn
          >
          <v-btn
            v-else
            color="primary"
            @click="sendEmail()"
            :disabled="!canReset"
            :loading="emailSending"
            >reset</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <FlashMessage></FlashMessage>
  </v-dialog>
</template>
 
 <script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      isLoggedIn: false,
      loader: false,
      password: "",
      username: "",
      name: "",
      error: "",
      isForgetPassword: false,
      emailSending: false,
      successMessage: "",
    };
  },
  props: {
    loginDialog: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "login",
    },
  },
  methods: {
    // Method to send password reset email
    sendEmail() {
      this.error = "";
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.username)
        .then(() => {
          this.emailSending = false;
          this.flashMessage.info({
            title: "",
            message: "Password reset link sent successfully",
          });
          this.successMessage = "Check your Email and reset password";
          this.isForgetPassword = false;
        })
        .catch((error) => {
          this.emailSending = false;
          this.error = error.message;
        });
    },
    // Method to switch to forget password mode
    forgetPassword() {
      this.isForgetPassword = true;
    },
    // Method to write user data to firebase
    writeUserData(username, name) {
      const db = getDatabase();
      const postListRef = ref(db, "users");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        email: username,
        name: name,
      });
    },
    // Method to read user data from firebase
    readUserData() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/`))
        .then((snapshot) => {
          const arr = [];
          snapshot.forEach((item) => {
            arr.push(item.val());
          });
          return arr;
        })
        .catch((error) => {
          return error;
        });
    },
    // Method to login or signup user
    doLogin() {
      this.loader = true;
      const { username, password } = this;
      if (this.username != "" && this.password != "") {
        if (this.type === "login") {
          firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => {
              this.error = "";
              this.isLoggedIn = true;
              localStorage.setItem("isLogin", true);
              this.redirectPageToHomeScreen();
              const dbRef = ref(getDatabase());
              get(child(dbRef, `users/`))
                .then((snapshot) => {
                  snapshot.forEach((item) => {
                    if (item.val().email === username) {
                      this.$emit("close", {
                        close: true,
                        userInfo: item.val(),
                      });
                      this.loader = false;
                      return;
                    }
                  });
                })
                .catch(() => {
                  this.loader = false;
                });
            })
            .catch((err) => {
              this.error = err.message;
              this.loader = false;
            });
        } else if (this.type === "signUp") {
          firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => {
              this.loader = false;
              this.flashMessage.info({
                title: "",
                message: "User created successfully",
              });
              this.writeUserData(username, this.name);
              this.error = "";
              this.type = "login";
              this.$emit("login", true);
            })
            .catch((error) => {
              this.error = error.message;
              this.loader = false;
            });
        }
      }
    },
    // Method to redirect to home screen
    redirectPageToHomeScreen() {
      this.$router.push({ path: "login", query: {} });
    },
  },
  computed: {
    // Computed property to check if login is possible
    canLogin() {
      return (
        this.username !== "" &&
        this.username !== null &&
        this.password !== "" &&
        this.password !== null
      );
    },
    // Computed property to check if reset is possible
    canReset() {
      return this.username !== "" && this.username !== null;
    },
  },
  watch: {
    // Watcher to check if user is logged in
    isLoggedIn: {
      handler(n) {
        if (n) {
          this.loginDialog = false;
          this.redirectPageToHomeScreen();
        } else {
          this.loginDialog = false;
          this.$router.push({ path: "/" });
        }
      },
    },
  },
};
</script>
 
 <style scoped>
.error-text {
  display: flex;
  justify-content: center;
  color: red;
}
.success-message {
  display: flex;
  justify-content: center;
  color: primary;
}
</style>