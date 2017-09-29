import vue from 'rollup-plugin-vue'
import cleanup from 'rollup-plugin-cleanup'
import scss from 'rollup-plugin-scss'

export default {
  input: './app/main.js',
  output: {
    file: './tns/app/app.js',
    format: 'cjs',
  },
  name: 'NativeScript-Vue-App',
  sourceMap: false,

  plugins: [
    vue({
      autoStyles: false,
      styleToImports: true,
      compileTemplate: false
    }),
    scss({ output: './tns/app/app.css'}),
    cleanup({
      extensions: ['.js', '.css']
    })

  ],
  external(id) {
    return id.startsWith('ui/') ||
      ['application',
      'application-settings',
      'color',
      'connectivity',
      'http'].includes(id)
  },
};