import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/main.js',
  plugins: [
    postcss({}),
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