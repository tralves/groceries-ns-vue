import vue from 'rollup-plugin-vue'
import cleanup from 'rollup-plugin-cleanup'
import scss from 'rollup-plugin-scss'
import rootImport from 'rollup-plugin-root-import';
import babel from 'rollup-plugin-babel';

export default {
  input: './app/main.js',
  output: {
    file: './tns/app/app.js',
    format: 'cjs',
  },
  name: 'NativeScript-Vue-App',
  sourceMap: false,

  plugins: [
    rootImport({
      // Will first look in `client/src/*` and then `common/src/*`.
      root: `${__dirname}/app`,
      useEntry: 'prepend',

      // If we don't find the file verbatim, try adding these extensions
      extensions: ['.js', '.vue', '.css', '.scss']
    }),
    vue({
      autoStyles: false,
      styleToImports: true,
      compileTemplate: false
    }),
    scss({ output: './tns/app/app.css' }),
    babel({
      exclude: 'node_modules/**'
    }),
    cleanup({
      extensions: ['.js', '.css']
    })

  ],
  external(id) {
    return id.startsWith('ui/') ||
      ['application'].includes(id)
  },
};