<template>
   <v-dialog v-model="loginDialog" width="500">
	<v-container class="pa-0">
                  <v-card class="elevation-12">
                     <v-card-title class="text-h5 grey lighten-2">
          <v-row no-gutters>
			<v-col class="pa-0">{{(type !== 'signUp')?'Log In':'Sign Up'}}</v-col>
			<v-spacer></v-spacer>
				<v-btn icon @click="loginDialog = false"><v-icon>mdi-close</v-icon></v-btn>
		</v-row>
        </v-card-title>
                     <v-card-text>
						<div v-if="error !== ''" class="error-text">{{error}}</div>
                        <v-form>
							<v-text-field
							v-if="type === 'signUp'"
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
						:loading="loader">{{(type !== 'signUp')?'LogIn':'SignUp'}}</v-btn>
                     </v-card-actions>
                  </v-card>
	</v-container>
</v-dialog>
</template>
<script>
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set ,push,get,child} from "firebase/database"
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
		name: '',
		error: ''
    };
  },
  props: {
    loginDialog: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'login'
	}
  },
  methods: {
writeUserData(username, name,password) {
	//const userId = getAuth().currentUser.uid;
	const db = getDatabase();
const postListRef = ref(db, 'users');
const newPostRef = push(postListRef);
set(newPostRef, {
    email: username,
	name: name,
	password: password
});
},
readUserData() {
const dbRef = ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
	const arr = [];
  snapshot.forEach((item) =>{

	arr.push(item.val());

    console.log(item.val());
});
return arr;
}).catch((error) => {
  console.error(error);
  return error;
});
}
,
	...mapActions('login', {
                login: 'login'
            }),
                reset() {
                this.$refs.form.reset();
            },
            doLogin() {
                const { username, password } = this;
                if(this.username != "" && this.password != "") {
					if(this.type === 'login') {
		firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(data => {
          console.log(data)
		this.error = '';
		this.isLoggedIn=true;
		localStorage.setItem('isLogin',true);
		this.redirectPageToHomeScreen();
		const dbRef = ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  snapshot.forEach((item) =>{
    if(item.val().email === username) {
	this.$emit('close',{close:true,userInfo:item.val()});
	return;
	}

    console.log(item.val());
});
}).catch((error) => {
  console.error(error);
});

        })
        .catch(err => {
          this.error = err.message;
        });
					}
				else if(this.type === 'signUp') {
                     firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {

      this.writeUserData(username,this.name,password);
        this.error = '';
		this.type = 'login';
		this.$emit('login',true);
      })
      .catch((error) => {
		this.error = error.message;
         alert(error.message);
      });
					}

                }
            },
	cancel() {
		this.$emit('')
	},
	redirectPageToHomeScreen() {
		this.$router.push({ path: 'login' , query: { }})
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
