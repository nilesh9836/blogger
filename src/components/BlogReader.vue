<template>
   <v-dialog v-model="readerDialog" max-width="900" :key="compKey">
	<v-container class="pa-0">
				<v-card>
        <v-card-title>
          <span class="text-h5">{{data.title}}</span>
		<v-spacer></v-spacer>
		<v-btn icon @click="readerDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          {{data.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
		<v-btn color="grey darken-1"
            text  @click="readerDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
	</v-container>
</v-dialog>
</template>
<script>
export default {
  name: "BlogReader",
  components: {

  },
  data() {
    return {
      compKey: 0,
    };
  },
  props: {
    data: {
		type: Object,
	default: ()=>{}
	},
	readerDialog: {
		type: Boolean,
		default: false
	}
  },
  computed: {
  },

}
</script>
<style scoped>
.content{
	font-size: 1rem;
	color:black;
}
</style>
