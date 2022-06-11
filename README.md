# VUE File Input
## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Documentation](#documentation)

## General Info
This project is a VUEJS @3 form file input component that can hande file draging, validation and more.

## Setup

### Install via NPM

```console
npm install --save @trilmatic/file-input
```

```js
import FileInput from "@trilmatic/file-input";
```

if you want to use the default styles just import them too

```js
import '@trilmatic/file-input/src/file-input.css'
```

### Or import directly in your html

```html
<script src="https://unpkg.com/@trilmatic/file-input"></script>
```

## Documentation

### SLOTS

#### icon
 - icon visible in the input
 - emplty by default
#### content  
- content of the input

*default*

```html
<span><strong>Upload file</strong></span>
<span v-if="drop"><i>Drop files or click here to upload</i></span>
```
#### fileIcon 
- icon of selected file

*default*

- basic svg file icon
#### fileRemove 
- Manual removal of file

*default*

`Remove`

### PROPS
#### title 
- String
- the title of the input
#### canDrop

- Boolean
- defines if the input is a dropzone or a basic input

*default*

`false`

#### required

- Boolean
- defines if the input is required

*default*

`false`
#### classList 
- Object
- defines the classes on the instance

*default*

```js
return {
    containerInput: "trilmatic--file trilmatic--no-drop",
    containerDropzone: "trilmatic--file trilmatic--drop-zone",
    view: "trilmatic--file-view",
    icon: "trilmatic--file-icon",
    label: "trilmatic--label",
    required: "trilmatic--required",
    input: "trilmatic--file-input",
    file: "trilmatic--selected-file",
    fileIcon: "trilmatic--selected-file-icon",
    fileRemove: "trilmatic--selected-file-remove",
    validationError: "trilmatic--validation-error",
}
```
#### multiple

- Boolean
- if multiple files can be selected

*default*

`false`
#### accept

- String
- defiles the accept prop on the form input instance
- does not work with a dropzone, if this functionality is needed with dropzone you have to define custom validation function
#### validationMessage

- String
- defines the validation message of input

*default*

`This field is required or invalid.`
#### validation

- Function
- defines the validation function
- the required output of the function is Boolean (true/false)
- validate function will be called with anz changes in the files list
- Two variables are passed into the function (Files - lisst of currently selected files, required - the prop that defines if the input is required)

*default*

```js
function (files, required) {
    if (!files) return false;
    if (required && files.length == 0) return false;
    return true;
}
```

You can also call the validate function remotly from parent component

```html
<template>
    <button @click="$refs.file.validate()">Validate</button>
    <file-input
        ref="file"
    ></file-input>
</template>
```


## EVENTS

### change
- emits when the file list has changed

```html
<template>
    <file-input
        ref="file"
        @change="fileHasChanged()"
    ></file-input>
</template>
```

