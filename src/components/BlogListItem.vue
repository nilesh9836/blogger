<template lang="html">
<div>
<v-card hover  outlined class="px-4" style="border-radius: 10px;" width="400">
  <v-img
    class="white--text my-4"
    height="200px"
    :src="article.photo"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox >
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">BY:-{{article.username }}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title class="px-0 py-0">
    <div>
      <p class="grey--text content" >{{article.title}}</p>
    </div>
  </v-card-title>
  <v-card-actions class="pb-3 px-0">
    <v-row no-gutters><span class="updated">{{timeDifference(article.timestamp?article.timestamp: '')}}</span><v-spacer/>
	<v-btn color="success"  outlined dark @click="readData()" rounded :height="30">read</v-btn></v-row>
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
  mounted() {

  },
  methods: {
	readData() {
     this.$refs.blogReader.compKey++;
	this.$refs.blogReader.readerDialog = true;
	},
	timeDifference(previous) {
    if(previous.length === 0) return "";
    var msPerMinute = 60 * 1;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    let date = new Date();
    let timestamp = Math.floor(date.getTime()/1000.0);
    var elapsed = timestamp - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return  Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return  Math.round(elapsed/msPerYear ) + ' years ago';
    }
},
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
.updated {
	color: #86878a;
    font-weight: 500;
}
</style>
