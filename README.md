# Formio File
## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Documentation](#documentation)

## General Info
This project is a VUEJS @3 form file input component that can hande file draging, validation and more.

## Setup

### Install via NPM

```
npm install --save formio-file
```

```js
import FormioFile from "formio-file";
```

if you want to use the default styles just import them

```js
import 'formio-file/src/formio-file.css'
```

### Or import directly in your html

```html
<script src="https://unpkg.com/formio-file"></script>
```

## Documentation

### SLOTS

#### icon
 - icon visible in the input
 - emplty by default
#### content  
- content of the input
- 

**default**

```markdown
<span><strong>Upload file</strong></span>
<span v-if="drop"><i>Drop files or click here to upload</i></span>
```
#### fileIcon 
- icon of selected file

**default**

- basic svg file icon
#### fileRemove 
- Manual removal of file

**default**

´Remove´

### PROPS
#### title 
- String
- the title of the input
#### canDrop

- Boolean
- defines if the input is a dropzone or a basic input

**default**

`false`

#### required

- Boolean
- defines if the input is required

**default**

`false`
#### classList 
- Object
- defines the classes on the instance

**default**

```js
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
}
```
#### multiple

- Boolean
- if multiple files can be selected

**default**

`false`
#### accept

- String
- defiles the accept prop on the form input instance
- does not work with a dropzone, if this functionality is needed with dropzone you have to define custom validation function
#### validationMessage

- String
- defines the validation message of input

**default**

`This field is required or invalid.`
#### validation

- Function
- defines the validation function
- the required output of the function is Boolean (true/false)
- validate function will be called with anz changes in the files list
- Two variables are passed into the function (Files - lisst of currently selected files, required - the prop that defines if the input is required)

**default**

```js
function (files, required) {
    if (!files) return false;
    if (required && files.length == 0) return false;
    return true;
}
```

You can also call the validate function remotly from parent component

```markdown
<template>
    <button @click="$refs.file.validate()">Validate</button>
    <formio-file
        ref="file"
    ></formio-file>
</template>
```


## EVENTS

### change
- emits when the file list has changed

```markdown
<template>
    <formio-file
        ref="file"
        @change="fileHasChanged()"
    ></formio-file>
</template>
```

