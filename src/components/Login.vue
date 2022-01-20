<template>
   <v-dialog v-model="loginDialog" width="500">
	<v-container class="pa-0">
                  <v-card class="elevation-12">
                     <v-card-title class="text-h5 grey lighten-2">
          <v-row no-gutters>
			<v-col class="pa-0">Login</v-col>
			<v-spacer></v-spacer>
				<v-btn icon @click="loginDialog = false"><v-icon>mdi-close</v-icon></v-btn>
		</v-row>
        </v-card-title>
                     <v-card-text>
						<div v-if="error !== ''" class="error-text">{{error}}</div>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="user"
                              label="User"
                              type="text"
							v-model="username"
							clearable
                           ></v-text-field>
                           <v-text-field
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
						color="primary"
						@click="doLogin()"
						:disabled="!canLogin"
						:loading="loader">Login</v-btn>
                     </v-card-actions>
                  </v-card>
	</v-container>
</v-dialog>
</template>
<script>
import {  mapActions } from 'vuex'
export default {
  name: "LoginPage",
  components: {

  },
  data() {
    return {
		isLoggedIn: false,
		loader: false,
		password: "",
		username: "",
		error: ''
    };
  },
  props: {
    loginDialog: {
		type: Boolean,
		default: false
	}
  },
  methods: {
	...mapActions('login', {
                login: 'login'
            }),
                reset() {
                this.$refs.form.reset();
            },
            doLogin() {
                const { username, password } = this;
                if(this.username != "" && this.password != "") {
                    this.login({ username, password });
					this.$nextTick(() =>{
					this.isLoggedIn=this.$store.state.login.isLogin;
					if(!this.isLoggedIn) {
						this.error = "Invalid Username/Password";
					} else {
						this.error = ''
						this.$emit('close',true);
					}
					});

                }
            },
	cancel() {
		this.$emit('')
	},
	redirectPageToHomeScreen() {
		this.$router.push({ path: 'login' , query: { user: this.username}})
	}
  },
  computed: {
	canLogin() {
		return (this.username !== ""  && this.username !== null)
		&& (this.password !== "" && this.password !== null);
	}
  },
  watch: {
	isLoggedIn:{
		handler(n) {
		if(n) {
             this.loginDialog = false;
			this.redirectPageToHomeScreen();
		}
		else {
			this.loginDialog = false;
			this.$router.push({ path: '/' })
		}
	}
	}
  }
}
</script>
<style scoped>
.error-text {
	display: flex;
	justify-content: center;
	color: red;
}
</style>
