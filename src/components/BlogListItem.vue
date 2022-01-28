<template lang="html">
<div>
<v-card hover  outlined class="px-6 " style="border-radius: 10px;" width="400">
  <v-img
    class="white--text my-2"
    height="200px"
    :src="article.photo"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox >
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">BY:-{{article.username}}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title>
    <div>
      <p class="grey--text content" >{{article.title}}</p>
      <p class="content">
        {{article.content}}
      </p>
    </div>
  </v-card-title>
  <v-card-actions>
    <v-row no-gutters> <v-spacer/><v-btn color="success"  outlined dark @click="readData()">read</v-btn></v-row>
  </v-card-actions>

</v-card>
<BlogReader ref="blogReader" :data="article" ></BlogReader>
</div>
</template>

<script>
import BlogReader from '@/components/BlogReader.vue'
export default {
	name: "BlogCard",
	components: {
      BlogReader
	},
  props: {
    article: {
      type: Object,
      required: false,
    },
	readDataModel: {
		type: Boolean,
		default: false
	}
  },
  computed: {

  },
  methods: {
	readData() {
     this.$refs.blogReader.compKey++;
	this.$refs.blogReader.readerDialog = true;
	}
  },
  created () {
  },
}
</script>

<style lang="css" scoped>
.content {
	white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
width: 211px;
}
</style>
