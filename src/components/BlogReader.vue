<template>
  <!-- Dialog component with fullscreen and scrollable properties -->
  <v-dialog v-model="dialog" :key="compKey" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
    <v-card tile>
      <!-- Card title displaying data's title -->
      <v-card-title class="title">
        <span class="text-h6">{{data.title}}</span>
        <v-spacer/>
        <!-- Close button to close the dialog -->
        <v-btn icon @click="dialog = false" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <!-- Card text displaying data's content -->
      <v-card-text>
        <div class="output ql-snow">
          <div class="ql-editor" v-html="data.content"></div>
        </div>
      </v-card-text>
      <!-- Card actions with cancel button -->
      <v-card-actions class="bottom">
        <v-spacer/>
        <v-btn color="black darken-1" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BlogReader",
  data() {
    return {
      compKey: 0,
      dialog: false
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    readerDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
	watch:{
	//watch on reader blog
		readerDialog:{
			handler(n){
				this.dialog = n;
			}
		}
	}

}
</script>

<style scoped>
.title {
  color: white;
  background: #6d6e67;
}
.bottom {
  color: white;
  background: linen;
}
</style>