import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

export default {
  input: 'src/main.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
     },
     {
      file: pkg.module,
      format: 'es'
     },
     {
      file: pkg.browser,
      format: 'iife',
      name: 'a11yDatepicker'
     }
  ],
  plugins: [
    postcss({}),
    copy({
      targets: [
        { src: 'src/css/themes/*', dest: 'dist/css/themes' },
        { src: 'dist/*', dest: 'docs/examples'}
      ]
    }),
    terser()
  ]
}