<template>
	<v-container fluid class="container-class pa-0" >
		<v-card width="100%" elevation="0" color="#7e820c" class="pa-6" >
			<v-row class="pa-6">
				<v-col class="pr-2 title">
					<div class="content-title pt-6">
						Blogger is a place to write, read, and connect
					</div>
					<div class="content-subtitle">
                        It's easy and free to post your thinking on any topic and connect with millions of readers.
					</div>
					<v-row class="py-4" no-gutters>
			<v-btn
      rounded
      color="white"
      dark
	outlined
	@click="redirectToLoginPage()"
    >
      Start Writing
    </v-btn>
					</v-row>
				</v-col>
			</v-row>
            <v-row no-gutters>
				<v-flex xs12 sm12 lg4  v-for="(post,i ) in content" :key="i" class="pt-8 px-4">
        <PostListItem :article="post"></PostListItem>
      </v-flex>
			</v-row>
		</v-card>
		<login :loginDialog="loginDialog" :key="loginDialogKey" @close="close">
		</login>
		<create-post-dialog :create-post-dialog="createPostDialog" :key="addBlogKey" @close="close"></create-post-dialog>
	</v-container>
</template>
<script>
import Login from "@/components/Login.vue";
import PostListItem from '@/components/BlogListItem.vue'
import CreatePostDialog from "@/components/CreatePostDialog.vue";
export default {
  name: "BlogLandingPage",
  components: {
       Login,
	PostListItem,
	CreatePostDialog
  },
  data() {
    return {
		isLoggedIn: false,
		loginDialog: false,
        loginDialogKey: 0,
		createPostDialog: false,
		addBlogKey: 0
    };
  },
  methods: {
	close() {
     this.createPostDialog = false;
	this.loginDialog = false;
	},
	redirectToLoginPage() {
		if(!localStorage.isLogin) {
           this.loginDialog = true;
		this.loginDialogKey++;
		this.createPostDialog = false;
		}
		else if(!JSON.parse(localStorage.isLogin)){
		this.loginDialog = true;
		this.loginDialogKey++;
		this.createPostDialog = false;
		} else {
		this.addBlogKey++;
		this.loginDialog = false;
		this.createPostDialog = true;

	}
	}
  },
  computed: {
	content() {
		let contents = this.$store.state.storeBlog.content;
		if(localStorage.content) {
           contents =JSON.parse(localStorage.content)
		}
		return contents;
	}
  }
}
</script>
<style scoped>
.container-class {
	height: 100%;
}
.content-title {
	font-size: 5.5rem;
	line-height: 6rem;

}
.content-subtitle {
	font-size: 2rem;
	line-height: 2rem;
}
</style>
