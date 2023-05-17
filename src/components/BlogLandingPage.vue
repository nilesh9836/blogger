<template>
  <!-- Main container -->
  <v-container fluid class="container-class pa-0 ma-0" :key="compKey">
    <!-- Card with background gradient -->
    <v-card
      width="100%"
      elevation="0"
      style="background-image: linear-gradient(90deg, #00bc40, #4c3ae3)"
      class="px-6 pt-2"
    >
      <!-- Row for title and subtitle -->
      <v-row class="px-4 py-0">
        <v-col class="pr-2 title">
          <div class="content-title pt-3">
            Blogger is a place to write, read, and connect.
          </div>
          <div class="content-subtitle pt-3">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </div>
        </v-col>
      </v-row>
      <!-- Row for posts -->
      <v-row no-gutters>
        <!-- Display posts if there are any -->
        <v-flex
          v-show="content.length > 0"
          xs12
          sm12
          lg4
          v-for="(post, i) in content"
          :key="i"
          class="pt-8 px-4"
        >
          <PostListItem :article="post"></PostListItem>
        </v-flex>
        <!-- Display skeleton loaders if there are no posts -->
        <v-flex
          v-show="content.length === 0"
          xs12
          sm12
          lg4
          v-for="i in 3"
          :key="i"
          class="pt-8 px-4 pr-10"
        >
          <v-sheet :color="'darken-2'" class="pa-3" style="border-radius: 10px">
            <v-skeleton-loader
              class="mx-auto card-width"
              height="350"
              type="card, list-item-three-line"
            ></v-skeleton-loader>
          </v-sheet>
        </v-flex>
      </v-row>
    </v-card>
    <!-- Login dialog -->
    <login
      :loginDialog="loginDialog"
      :key="loginDialogKey"
      @close="close"
    ></login>
    <!-- Create post dialog -->
    <create-post-dialog
      :create-post-dialog="createPostDialog"
      :key="`blog${addBlogKey}`"
      @close="close"
    ></create-post-dialog>
  </v-container>
</template>
  
  <script>
import Login from "@/components/Login.vue";
import PostListItem from "@/components/BlogListItem.vue";
import { getDatabase, ref, get, child } from "firebase/database";
import CreatePostDialog from "@/components/CreatePostDialog.vue";

export default {
  name: "BlogLandingPage",
  components: {
    Login,
    PostListItem,
    CreatePostDialog,
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
    // Fetch data from firebase
    getData() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `blogs/`))
        .then((snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            arr.push(item.val());
          });
          this.content = arr;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Close dialogs
    close() {
      this.createPostDialog = false;
      this.loginDialog = false;
      this.$nextTick(() => {
        this.compKey++;
      });
    },
    // Redirect to login page if not logged in
    redirectToLoginPage() {
      if (!localStorage.isLogin || !JSON.parse(localStorage.isLogin)) {
        this.loginDialog = true;
        this.loginDialogKey++;
        this.createPostDialog = false;
      } else {
        this.addBlogKey++;
        this.loginDialog = false;
        this.createPostDialog = true;
      }
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    "$route.query": {
      handler: function () {
        this.getData();
        this.$router.push({ path: "login", query: {} });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
  
  <style scoped>
.container-class {
  height: 100%;
}
.content-title {
  font-size: 6vw;
  line-height: 6vw;
  color: white;
  font-family: math;
}
.content-subtitle {
  font-size: 4vw;
  line-height: 4vw;
  color: whitesmoke;
  font-family: math;
}
@media only screen and (max-width: 600px) {
  .card-width {
    width: 320px;
  }
}
@media only screen and (min-width: 768px) {
  .card-width {
    width: 420px;
  }
}
</style>