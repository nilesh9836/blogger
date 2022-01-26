<template>
  <v-container >
    <v-app-bar
      app
      color="#6d6e67"
      dark
	class="border-bottom"
	:key="compKey"
    >
      <div class="d-flex align-center">
		<div class="text-h5 px-4">Blogger</div>
        <v-btn v-if="isLoggedIn" outlined @click="createPost()" @click:outside="close()" rounded>
			Create Post
		</v-btn>
      </div>

      <v-spacer></v-spacer>
	<v-menu
	v-if="isLoggedIn"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text text-h5">{{getInitials($store.state.login.username?$store.state.login.username:user.username)}}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text text-h5">{{getInitials($store.state.login.username?$store.state.login.username:user.username)}}</span>
              </v-avatar>
              <h3>{{$store.state.login.username?$store.state.login.username:user.username}}</h3>
              <p class="text-caption mt-1">
                {{$store.state.login.useremail?$store.state.login.useremail:user.useremail}}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
				@click="logOut()"
              >
                Log Out
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
	<v-btn  v-if="!isLoggedIn" @click="signUp('login')" outlined rounded>
    Log In
	</v-btn>
	<v-btn  class="ml-3" v-if="!isLoggedIn" @click="signUp('signUp')" outlined rounded>
    Sign Up
	</v-btn>
    </v-app-bar>
	<login :loginDialog="loginDialog" :key="loginDialogKey" @close="close" :type="type" @login="openLogin">
		</login>
	<create-post-dialog :create-post-dialog="createPostDialog" :key="addBlogKey" @close="closePostDialog"></create-post-dialog>
  </v-container>
</template>

<script>
import {  mapActions } from 'vuex'
import Login from "@/components/Login.vue";
import CreatePostDialog from "@/components/CreatePostDialog.vue";
export default {
  name: "TopBar",
  data() {
    return {
		loginDialog: false,
        loginDialogKey: 0,
		createPostDialog: false,
		addBlogKey: 0,
		user: {},
		type: '',
		compKey: 0,
		isLoggedIn: false,
    };
  },
  components: {
	CreatePostDialog,
	Login
  },
  computed : {
	// isLoggedIn() {
    //    return this.$store.state.login.isLogin || JSON.parse(localStorage.getItem('isLogin'));
	// }
  },
  mounted() {
   this.isLoggedIn = this.$store.state.login.isLogin || JSON.parse(localStorage.getItem('isLogin'));
  },
  methods: {
	openLogin() {
	this.type  = 'login';
	this.loginDialogKey++;
      this.loginDialog = true;
	},
	signUp(val) {
		this.loginDialogKey++;
		this.type = val;
     this.loginDialog = true;
	},
	...mapActions('logout', {
                logout: 'logout'
            }),
	createPost() {
		this.createPostDialog = true;
		this.addBlogKey++;
	},
	closePostDialog() {
     this.createPostDialog = false;
	this.loginDialog = false;
	this.addBlogKey++;
	this.loginDialogKey++;
	this.$router.push({ path: 'login', query: { created: true } });
	//this.$router.push({ path: 'login' , query: { }})
	},
	close(val) {
    if(this.type === 'login')
	this.user ={
       useremail: val.userInfo.email,
	username: val.userInfo.name,
	};
	localStorage.setItem('user',JSON.stringify({username:this.user.username,useremail:this.user.useremail}));
     this.createPostDialog = false;
	this.loginDialog = false;
	this.addBlogKey++;
	this.loginDialogKey++;
	this.isLoggedIn = this.$store.state.login.isLogin || JSON.parse(localStorage.getItem('isLogin'));
	},
	logOut() {
		this.createPostDialog = false;
		this.logout();
        this.isLoggedIn = this.$store.state.login.isLogin || JSON.parse(localStorage.getItem('isLogin'));
	},
	getInitials(string) {
		if(!string) string = 'Nilesh Mishra';
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
},
  },
  created() {
    this.user = JSON.parse(localStorage.user);
	this.isLoggedIn = this.$store.state.login.isLogin || localStorage.getItem('isLogin');
  }
}
</script>
