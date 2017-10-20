# I had a blast developing Groceries Vue sample app, and this is why.

## The project

A couple of weeks ago I was challenged to build a clone of the [sample Groceries](https://github.com/NativeScript/sample-Groceries) app with [Vue.js](https://vuejs.org/) using the [`nativescript-vue`](https://github.com/rigor789/nativescript-vue) plugin. The original sample Groceries is an app built both in Vanilla JS and Angular, that serves as a code example of a NativeScript app. This demo app is a kind of to-do list app for groceries. It connects to a REST API back-end for login and storage.

The bar was higher than simply transposing from one framework to another. Instead, I wanted to bring, as much as possible, the experience of developing a normal web Vue.js app into native development, through NativeScript. This included using .vue Single File Components (SFC), Vuex, vue-router, and the patterns and architecture that Vue.js developers are familiar with.

This is what the app ended looking like:

 [![Groceries-vue video demo](https://img.youtube.com/vi/4CdLCR_sYPc/0.jpg)](https://www.youtube.com/watch?v=4CdLCR_sYPc)

## Development experience

For this project I started with the [nativescript-vue-rollup-template](https://github.com/tralves/nativescript-vue-rollup-template) because it enables .vue SFC and liveSync. While developing the Groceries app, I also added support for scss, root imports and babel.

Development felt very good in this environment. I just launched `rollup -c -w` and `tns debug ios` in two separate terminals, and each time I saved a file the app was updated in the iOS Simulator automatically. It takes about 20 seconds from the moment I save a file to the moment the app is re-launched in the iOS simulator. It's not too bothersome because all that happens in the background while we can do other stuff. It is not as fast as normal web development, but felt faster than my last real native development. The experience with Android, on a physical device, is similar to the iOS Simulator.

The command `tns debug ios` also opens a safari dev tools window, which allows inspecting the code, debugging and monitoring network requests. Very helpful!

## Developing UI layout

Since this app is a clone of the [sample Groceries](https://github.com/NativeScript/sample-Groceries) app, most of the layout was just copied and "translated" to Vue.js.

For instance, the ns-angular template
```html
<StackLayout #signUpStack
      class="sign-up-stack"
      (tap)="toggleDisplay()"
      translateY="50">
      <Label
        [text]="isLoggingIn ? 'Sign up here' : 'Back to login'"></Label>
</StackLayout>
```
became
```html
<StackLayout ref="signUpStack"
      class="sign-up-stack"
      @tap="toggleDisplay()"
      translate-y="50">
      <Label
        :text="isLoggingIn ? 'Sign up here' : 'Back to login'"></Label>
</StackLayout>
```

Did you find all the differences?

1. line 1: the identifier `#signUpStack` turned into a Vue [ref](https://vuejs.org/v2/api/#ref);
2. line 3: the event `(tap)` became `@tap`;
3. line 6: the data binding `[text]` is now `:text`.

All the NativeScript [components](http://docs.nativescript.org/angular/ui/components), [layouts](http://docs.nativescript.org/angular/ui/layouts), [animations](http://docs.nativescript.org/angular/ui/animation), [dialogs](http://docs.nativescript.org/angular/ui/dialogs) etc. are at our disposal with `nativescript-vue`!

> Tip: The underlying NativeScript element lives in the property `nativeView` of the Vue component. For instance, in the example above we would use `this.$refs.signUpStack.nativeView` to access the [StackLayout API](https://docs.nativescript.org/api-reference/modules/_ui_layouts_stack_layout_.html).

It was very easy to make those small visual platform-specific adjustments. I just added the class `platform-ios` or `platform-android` to the top `<page>` element and then used scss to scope the differences. And those were very small adjustments. Over 90% of the css is common to both platforms.

## The Vue.js experience

If, like me, you are coming from a Vue.js background, then the [code](https://github.com/tralves/groceries-ns-vue/tree/master/app) will feel very familiar. I already mentioned .vue SFC, which I used to compose the app pretty much the same way I would compose a web app.

For state management, I used [Vuex](https://vuex.vuejs.org/en/) (Vue's flux implementation), and for page routing I used [vue-router](https://router.vuejs.org/en/).

Basically, `nativescript-vue` gives us the best of both worlds! We get to use Vue.js in all its splendor AND leverage all the tools, components, plugins and APIs that NativeScript has to offer.

Sure, there were some bumps along the way, but nothing terribly crippling. There is a great community behind `nativescript-vue` working hard to polish the rough edges. It is very easy to get help from NativeScript and Vue gurus in the [NativeScript community slack](https://nativescriptcommunity.slack.com/), namely in the #vue channel.

## All in all...

... I had a great time developing the Groceries App. After spending lots of time researching hybrid and native frameworks (such as [Quasar](http://quasar-framework.org/) and [Weex](https://weex.incubator.apache.org/)), I think I finally found a feature-complete, stable and fun technology for native development with Vue.js.

## Thanks and kudos

Special thanks to [Progress](https://www.progress.com/nativescript) for sponsoring this development experiment! The NativeScript community is privileged to have such an awesome company backing things up!

I also want to thank [Igor Randjelovic](https://twitter.com/igor_randj) (`nativescript-vue`'s creator) and [Jen Looper](https://twitter.com/jenlooper) for all the help and support along the way.
