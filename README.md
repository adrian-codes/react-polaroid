# react-polaroid

Static HTML website generator engine using [ReactJS](http://reactjs.com)

The intention is to help new developers to make it easy to start using ReactJS 
without having to setup a server or any complicated configurations.

## Install

Git clone/fork this repo.

## Usage

### Add React components

- Create your own React Component views in **jsx/**

Then in `utils/StaticUtils.js` 
- import your React component
- add a switch case for your React component

### Add CSS

- Create a *scss* file in the **scss/** directory.
- The file name must start with underscore, eg. **_home.scss**
- Then import the new *scss* file into **index.scss** eg. `@import "_home.scss"`

### Generate content

Create a **.json** file and drop it in **data/** directory.

The json must contain the following key-values:

key | description
--- | -----------
component | The name of the React component view
slug | The file name for the output file. The extension will be html
title | The HTML title
props | The ReactJS props. These must match the ones in your component.

### Compile the HTML and CSS

Run `npm run build` from the CLI to compile the **data/** json files into HTML and CSS

The output will be in `public/` directory.


