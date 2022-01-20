<template>
  <v-app>

   <top-bar></top-bar>
    <v-main class="pa-0 page-color pt-6">
      <router-view/>
    </v-main>
</v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
  name: 'App',
  components: {
	TopBar
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.page-color {
	background: #7e820c;
}
</style>
