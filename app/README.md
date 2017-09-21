# NativeScript Vue.js Template

This repo serves as the starting point for NativeScript + Vue.js projects, using [nativescript-vue](https://github.com/rigor789/nativescript-vue).

This template creates a project ready to use with Vue single file components\* (`.vue` files)!

It creates a project with the structure:
```
my-app
 |
 |-app   # your app code
 |  |-components
 |  |-...
 |
 |-tns   # the generated tns project
 |  |-app
 |  |-...
 |...
```

## Usage

1. Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)

2. Create app from this template
```bash
tns create hello-ns-vue --template https://github.com/tralves/nativescript-vue-rollup-template

cd hello-ns-vue
```

3. Watch for changes while developing

In two separate terminals run:
```
# terminal 1
rollup -c -w

# terminal 2
cd tns
tns run android
# or
tns run ios
```

4. Code!
You will find more sample code [here](https://github.com/tralves/nativescript-vue/tree/master/samples).
