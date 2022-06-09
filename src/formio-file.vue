<template>
  <div
    :class="[
      canDrop
        ? String(classList.containerDropzone)
        : String(classList.containerInput),
    ]"
    @dragover.prevent
    @drop.prevent
  >
    <p v-if="title" :class="classList.label">
      {{ title }}<span :class="classList.required" v-if="required">*</span>
    </p>
    <div
      :class="classList.view"
      @click="openFileInput($event)"
      @drop="ondrop($event)"
    >
      <span :class="classList.icon"><slot name="icon"></slot></span>
      <slot name="content"
        ><span><strong>Upload file</strong></span
        ><span v-if="canDrop"
          ><i>Drop files or click here to upload</i></span
        ></slot
      >
    </div>
    <input
      type="file"
      ref="input"
      @change="upload($event)"
      :multiple="multiple"
      :accept="accept"
      :class="classList.input"
    />
    <div :class="classList.file" v-for="(f, i) in files" :key="i">
      <span :class="classList.fileIcon">
        <slot name="fileIcon"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-file"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path
              d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
            /></svg></slot></span
      >{{ f.name
      }}<span :class="classList.fileRemove" @click="removeFile(i)"
        ><slot name="fileRemove">Remove</slot></span
      >
    </div>
    <p :class="classList.validationError" v-if="error">
      {{ validationMessage }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    canDrop: {
      type: Boolean,
      default: false,
    },
    classList: {
      type: Object,
      default: () => {
        return {
          containerInput: "formio--file formio--no-drop",
          containerDropzone: "formio--file formio--drop-zone",
          view: "formio--file-view",
          icon: "formio--file-icon",
          label: "formio--label",
          required: "formio--required",
          input: "formio--file-input",
          file: "formio--selected-file",
          fileIcon: "formio--selected-file-icon",
          fileRemove: "formio--selected-file-remove",
          validationError: "formio--validation-error",
        };
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    validationMessage: {
      type: String,
      default: "This field is required or invalid.",
    },
    validation: {
      type: Function,
      default: function (files, required) {
        if (!files) return false;
        if (required && files.length == 0) return false;
        return true;
      },
    },
  },
  data() {
    return {
      files: [],
      error: false,
    };
  },
  methods: {
    upload(e) {
      this.files = e.target.files;
      if (!this.validate()) {
        return;
      }
      this.$emit("change", this.files);
    },
    ondrop(e) {
      if (!this.canDrop) return;
      if (this.multiple) {
        this.files = e.dataTransfer.files;
      } else {
        this.files = [];
        this.files.push(e.dataTransfer.files[0]);
      }
      if (!this.validate()) {
        return;
      }
      this.$emit("change", this.files);
    },
    openFileInput() {
      this.$refs.input.click();
    },
    validate() {
      let v = this.validation(this.files, this.required, this.accept);
      if (!v) {
        this.files = [];
        this.error = true;
      } else this.error = false;
      return v;
    },
    removeFile(index) {
      let list = [...this.files];
      if (list[index]) {
        list.splice(index, 1);
        this.files = list;
        this.validate();
      }
    },
  },
};
</script>