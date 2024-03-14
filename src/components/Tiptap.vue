<template>
  <!-- The main div that contains the Quill editor -->
  <div class="example card-width">
    <!-- The Quill editor component -->
    <quill-editor
      class="editor"
      ref="myTextEditor"
      :value="content"
      :options="editorOption"
      @change="onEditorChange"
      @blur="onEditorBlur"
      @focus="onEditorFocus"
      @ready="onEditorReady"
    />
  </div>
</template>

<script>
// Importing necessary modules
import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "debounce";
import { quillEditor } from "vue-quill-editor";

// Importing Quill's core and theme styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

export default {
  name: "quill-example-snow",
  components: {
    quillEditor,
  },
  data() {
    return {
      // Options for the Quill editor
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      // The content of the editor
      content: dedent``,
    };
  },
  methods: {
    // Method to handle changes in the editor
    onEditorChange: debounce(function (value) {
      this.content = value.html;
      this.$emit('change',this.content);
    }, 466),
    // Method to handle blur event in the editor
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    // Method to handle focus event in the editor
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    // Method to handle ready event in the editor
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
  },
  computed: {
    // Computed property to get the Quill editor instance
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    // Computed property to get the highlighted content
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },
  mounted() {
    // Log the Quill editor instance when the component is mounted
    console.log("this is Quill instance:", this.editor);
  },
};
</script>

<style lang="scss" scoped>
.example {
  width: 100%;
  display: flex;
  flex-direction: column;
  .editor {
    height: 80vh;
    overflow: auto;
  }
}
@media only screen and (max-width: 600px) {
  .card-width {
    height: 76vh;
  }
}
@media only screen and (min-width: 768px) {
  .card-width {
    height: 75vh;
  }
}
</style>