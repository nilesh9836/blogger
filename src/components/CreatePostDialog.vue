<template>

    <v-dialog v-model="createPostDialog" width="500">
		<v-container class="pa-0">
		<v-form>
			<v-card>
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
					<v-textarea
          label="Content"
		v-model="content"
		required
        ></v-textarea>
				</v-row>
		</v-card-text>
		<v-card-actions class="text-h5 grey lighten-2">
			<v-row no-gutters>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="addPost()" :disabled="!canAdd">Add</v-btn>
			</v-row>
		</v-card-actions>
			</v-card>
		</v-form>
  </v-container>
	</v-dialog>
</template>

<script>
import {  mapActions } from 'vuex'
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
	content.photo =`https://source.unsplash.com/430x500/?laptop,desk,random=${Math.random()}`;
    this.storeBlog({content});
	this.createPostDialog = false;
	this.$emit('close',true);
	}
  },
  mounted() {
   this.username = this.$store.state.login.username?this.$store.state.login.username:JSON.parse(localStorage.user).username;
  }
}
</script>
