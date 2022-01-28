<template>
  <v-app>

   <top-bar></top-bar>
   <Editor/>
    <v-main class="pa-0 page-color pt-6">
      <router-view/>
    </v-main>
</v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Editor from "@/components/TopBar.vue";
export default {
  name: 'App',
  components: {
	TopBar,Editor
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.page-color {
	background-image: linear-gradient(90deg,#00BC40 ,#4C3AE3);
}
</style>
