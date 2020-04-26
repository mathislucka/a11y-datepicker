import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

export default {
  input: 'src/main.js',
  plugins: [
    postcss({
      extract: path.resolve('dist/css/style.css')
    }),
    copy({
      targets: [
        { src: 'src/css/themes/*', dest: 'dist/css/themes' },
        { src: 'dist/*', dest: 'docs/examples'}
      ]
    })
  ],
  output: [
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'a11yDatepicker',
      plugins: [
        //terser(),
      ]
    }
  ]
};