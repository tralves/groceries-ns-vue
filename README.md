# Groceries Vue

[![Built With NativeScript-Vue](https://img.shields.io/badge/built_with-nativescript--vue-42B883.svg)](https://nativescript-vue.org/#/)

Groceries Vue is an app for managing grocery lists.

Groceries Vue  is also a clone of [sample-Groceries](https://github.com/NativeScript/sample-Groceries)
built with [nativescript-vue](https://github.com/rigor789/nativescript-vue). It
showcases the potential of the NativeScript platform using the Vue.js.

This project uses:

- Vue.js!
- Vuex;
- NativeScript components;
- NativeScript animation;
- NativeScript http lib to connect to a backend service;
- NativeScript `vue-cli-template` (see [nativescript-vue/vue-cli-template/](https://github.com/nativescript-vue/vue-cli-template/))

## Video demo

[![Groceries-vue video demo](https://img.youtube.com/vi/4CdLCR_sYPc/0.jpg)](https://www.youtube.com/watch?v=4CdLCR_sYPc)

## Usage

``` bash
# Install dependencies
npm install

# Build for production
npm run build
npm run build:<platform>

# Build, watch for changes and debug the application
npm run debug
npm run debug:<platform>

# Build, watch for changes and run the application
npm run watch
npm run watch:<platform>

# Clean the NativeScript application instance (i.e. rm -rf dist)
npm run clean
```

> When invoking the various npm scripts, omitting the platform will attempt to launch `tns` for both platforms, which will only work in a properly configured OSX environment.

For detailed instructions, see https://github.com/nativescript-vue/vue-cli-template