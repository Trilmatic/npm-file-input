import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'FileInput',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        commonjs(),
        buble(), // Transpile to ES5
    ],
};