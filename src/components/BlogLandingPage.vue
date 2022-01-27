<template>
	<v-container fluid class="container-class pa-0" :key="compKey" >
		<v-card width="100%" elevation="0" style="background-image: linear-gradient(90deg,#00BC40 ,#4C3AE3)" class="pa-6" >
			<v-row class="pa-6">
				<v-col class="pr-2 title">
					<div class="content-title pt-6">
						Blogger is a place to write, read, and connect
					</div>
					<div class="content-subtitle">
                        It's easy and free to post your thinking on any topic and connect with millions of readers.
					</div>
					<v-row class="py-4" no-gutters>
			<!-- <v-btn
      rounded
      color="white"
      dark
	outlined
	@click="redirectToLoginPage()"
    >
      Start Writing
    </v-btn> -->
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
import { getDatabase, ref,get,child} from "firebase/database"
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
		addBlogKey: 0,
		content: [],
		compKey: 0,
    };
  },
  methods: {
	getData() {
		const dbRef = ref(getDatabase());
get(child(dbRef, `blogs/`)).then((snapshot) => {
	let arr = [];
  snapshot.forEach((item) =>{

	arr.push(item.val());
});
this.content = arr;
}).catch((error) => {
  console.error(error);
});
	},

	close() {
    this.createPostDialog = false;
	this.loginDialog = false;
	this.$nextTick(() =>{
     this.compKey++;
	})
	//this.$router.push({ path: 'login' , query: { }})
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
	// content() {
	// 	let contents = this.$store.state.storeBlog.content;
	// 	if(localStorage.content) {
    //        contents =JSON.parse(localStorage.content)
	// 	}
	// 	return contents;
	// }
  },
  mounted() {
    this.getData();
  },
  watch: {
     '$route.query': {
        handler: function() {
           this.getData();
		this.$router.push({ path: 'login', query: {}});
        },
        deep: true,
        immediate: true
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
	color:white;

}
.content-subtitle {
	font-size: 2rem;
	line-height: 2rem;
	color: whitesmoke;
}
</style>
