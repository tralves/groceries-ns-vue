import vue from 'rollup-plugin-vue'
import cleanup from 'rollup-plugin-cleanup'

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
            css: './tns/app/app.css',
            compileTemplate: false
        }),
        cleanup({
            extensions: ['.js', '.css']
        })
    ],
    external(id) {
        return id.startsWith('ui/') || id.startsWith('application')
    },
};