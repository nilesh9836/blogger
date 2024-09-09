<template>
	<!-- Dialog component for creating a new post -->
	<v-dialog v-model="createPostDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
	  <v-form>
		<v-card tile>
		  <v-card-title class="text-h5 grey lighten-2">
			<v-row>
			  <v-col>New Post</v-col>
			  <v-spacer/>
			  <!-- Close button to close the dialog -->
			  <v-icon @click="createPostDialog = false">mdi-close</v-icon>
			</v-row>
		  </v-card-title>
		  <v-card-text class="py-4">
			<v-row class="pa-0" no-gutters>
			  <v-col class="pa-0 px-4">
				<!-- Text field for entering the post title -->
				<v-text-field label="Title" name="title" v-model="title" required></v-text-field>
			  </v-col>
			  <v-col class="pa-0 pr-4">
				<!-- Text field for displaying the author's name -->
				<v-text-field label="Author" name="Author" v-model="username" required readonly></v-text-field>
			  </v-col>
			</v-row>
			<v-row class="pa-0 px-4" no-gutters>
			  <!-- Tiptap component for rich text editing -->
			  <tiptap @change="onValueChange" />
			</v-row>
		  </v-card-text>
		  <v-card-actions class="text-h5 grey lighten-2 pt-2">
			<v-row no-gutters>
			  <v-spacer/>
			  <!-- Add button for submitting the new post -->
			  <v-btn color="primary" @click="addPost()" :disabled="!canAdd">Add</v-btn>
			</v-row>
		  </v-card-actions>
		</v-card>
	  </v-form>
	</v-dialog>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import { getDatabase, ref, set, push } from "firebase/database"
  import Tiptap from "./Tiptap";
  
  export default {
	name: "CreatePostDialog",
	components: {
	  Tiptap
	},
	data() {
	  return {
		title: "",
		username: "",
		content: "",
	  };
	},
	props: {
	  createPostDialog: {
		type: Boolean,
		default: false
	  }
	},
	computed: {
	  // Check if the user is logged in
	  isLoggedIn() {
		return this.$store.state.login.isLogin;
	  },
	  // Check if the title and content are not empty
	  canAdd() {
		return this.title !== "" && this.content !== "";
	  }
	},
	methods: {
	  // Update the content when the Tiptap component emits a change event
	  onValueChange(val) {
		this.content = val;
	  },
	  // Write the new post data to the Firebase database
	  writeUserData(content) {
		const db = getDatabase();
		const postListRef = ref(db, 'blogs');
		const newPostRef = push(postListRef);
		set(newPostRef, {
		  username: content.username,
		  title: content.title,
		  content: content.content,
		  photo: content.photo,
		  timestamp: content.timestamp,
		});
	  },
	  ...mapActions('storeBlog', {
		storeBlog: 'storeBlog'
	  }),
	  // Add the new post
	  addPost() {
		let content = {
		  title: this.title,
		  username: this.username,
		  content: this.content,
		  photo: ""
		};
		let titleStr = this.title.split(' ').join(',');
		content.photo = `https://source.unsplash.com/random?${titleStr},sig=${parseInt(Math.random()*10000)},`;
		let date = new Date();
		let timestamp = Math.floor(date.getTime()/1000.0);
		content.timestamp = timestamp;
		this.writeUserData(content);
		this.$nextTick(() => {
		  this.$emit('close', true);
		})
		this.createPostDialog = false;
	  }
	},
	mounted() {
	  // Get the username from the Vuex store or from localStorage
	  this.username = this.$store.state.login.username ? this.$store.state.login.username : JSON.parse(localStorage.user).username;
	}
  }
  </script>