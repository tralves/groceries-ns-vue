# Groceries Vue

Groceries Vue is an app for managing grocery lists.

Groceries Vue  is also a clone of [sample-Groceries](https://github.com/NativeScript/sample-Groceries)
built with [nativescript-vue](https://github.com/rigor789/nativescript-vue). It
showcases the potential of the NativeScript platform using the Vue.js.

This project uses:

- Vue.js!
- Vuex;
- Vue-router;
- NativeScript components;
- NativeScript animation;
- NativeScript http lib to connect to a backend service;
- NativeScript-cli (`tns`) to build/debug in Android and iOS;
- Rollup for bundling vue, scss and ES6 (see [nativescript-vue-rollup-template](https://github.com/tralves/nativescript-vue-rollup-template));

## Video demo

[![Groceries-vue video demo](https://img.youtube.com/vi/4CdLCR_sYPc/0.jpg)](https://www.youtube.com/watch?v=4CdLCR_sYPc)
## Usage

1. Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)

2. Clone this repository:
```
git clone https://github.com/tralves/groceries-ns-vue
```

3. Install dependencies:

```
cd groceries-ns-vue
npm install

cd groceries-ns-vue/tns
npm install
```

3. Build and run:

```
cd groceries-ns-vue
rollup -c -w

cd groceries-ns-vue/tns
tns run android
# or
tns run ios
```

4. Development mode

In two separate terminals run:
```
# terminal 1
cd groceries-ns-vue
rollup -c -w

# terminal 2
cd groceries-ns-vue/tns
tns debug android
# or
tns debug ios
```
