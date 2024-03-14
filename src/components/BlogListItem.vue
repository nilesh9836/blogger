<template>
  <div>
    <!-- Card component with click event to read data -->
    <v-card hover outlined class="px-4 card-width" style="border-radius: 10px;" @click="readData">
      <!-- Image component with source bound to article's photo -->
      <v-img class="white--text my-4" height="200px" :src="article.photo">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <!-- Displaying article's username -->
              <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">BY:-{{article.username }}</h2>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <!-- Card title displaying article's title -->
      <v-card-title class="px-0 py-0">
        <div>
          <p class="grey--text content">{{article.title}}</p>
        </div>
      </v-card-title>
      <!-- Card actions with time difference and read button -->
      <v-card-actions class="pb-3 px-0">
        <v-row no-gutters>
          <span class="updated">{{timeDifference(article.timestamp || '')}}</span>
          <v-spacer/>
          <v-btn color="success" outlined dark @click.stop="readData" rounded height="30" title="Read the post">read</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- BlogReader component with data and key bound to article and compKey respectively -->
    <BlogReader ref="blogReader" :data="article" :key="compKey" />
  </div>
</template>

<script>
import BlogReader from '@/components/BlogReader.vue'

export default {
  name: "BlogCard",
  components: {
    BlogReader
  },
  data() {
    return {
      compKey: 0
    }
  },
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    readData() {
      // Increment compKey and open the dialog
      this.compKey++;
      this.$refs.blogReader.dialog = true;
    },
    timeDifference(previous) {
      // Calculate and return the time difference in a human-readable format
      if (!previous) return "";
      const msPerMinute = 60;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;
      const timestamp = Math.floor(Date.now() / 1000);
      const elapsed = timestamp - previous;

      if (elapsed < msPerMinute) return `${Math.round(elapsed)} seconds ago`;
      if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)} minutes ago`;
      if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)} hours ago`;
      if (elapsed < msPerMonth) return `${Math.round(elapsed / msPerDay)} days ago`;
      if (elapsed < msPerYear) return `${Math.round(elapsed / msPerMonth)} months ago`;
      return `${Math.round(elapsed / msPerYear)} years ago`;
    }
  }
}
</script>

<style scoped>
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