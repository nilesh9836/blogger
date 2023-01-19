<template>

    <v-dialog v-model="createPostDialog" fullscreen
        hide-overlay
        transition="dialog-bottom-transition">
		<v-form>
			<v-card tile>
				<v-card-title class="text-h5 grey lighten-2">
          <v-row>
			<v-col>New Post</v-col>
			<v-spacer></v-spacer>
			<v-icon @click="createPostDialog = false">mdi-close</v-icon>
		</v-row>
        </v-card-title>
		<v-card-text class="py-4">
				<v-row class="pa-0" no-gutters>
					<v-col class="pa-0 px-4">
						<v-text-field
                        label="Title"
						name="title"
						v-model="title"
						required
						></v-text-field>
					</v-col>
					<v-col class="pa-0 pr-4">
						<v-text-field
						label="Author"
						name="Author"
						v-model="username"
						required
						readonly></v-text-field>
					</v-col>
				</v-row>
				<v-row class="pa-0 px-4" no-gutters>
					<tiptap @change="onValueChange" />
				</v-row>
		</v-card-text>
		<v-card-actions class="text-h5 grey lighten-2 pt-2">
			<v-row no-gutters>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="addPost()" :disabled="!canAdd">Add</v-btn>
			</v-row>
		</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script>
import {  mapActions } from 'vuex'
import { getDatabase, ref, set ,push} from "firebase/database"
import Tiptap from "./Tiptap";
export default {
  name: "CreatePostDialog",
  data() {
    return {
		loginDialog: false,
        loginDialogKey: 0,
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
  components: {
		Tiptap
  },
  computed : {
	isLoggedIn() {
       return this.$store.state.login.isLogin;
	},
	canAdd() {
		return  (this.title !== "" && this.content !== "");
	}
  },
  methods: {
	onValueChange(val) {
		console.log(val);
		this.content = val;
	},
writeUserData(content) {
	//const userId = getAuth().currentUser.uid;
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
   addPost() {
	let content = {
           title: this.title,
		username: this.username,
		content: this.content,
		photo: ""
	};
	let titleStr = this.title.split(' ').join(',');
	content.photo =`https://source.unsplash.com/random?${titleStr},sig=${parseInt(Math.random()*10000)},`;
	let date = new Date();
    let timestamp = Math.floor(date.getTime()/1000.0);
	content.timestamp = timestamp;
	this.writeUserData(content);
	this.$nextTick(() =>{
	this.$emit('close',true);
	})
	this.createPostDialog = false;
	}
  },
  mounted() {
   this.username = this.$store.state.login.username?this.$store.state.login.username:JSON.parse(localStorage.user).username;
  }
}
</script>
