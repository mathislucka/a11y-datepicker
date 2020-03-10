import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'a11yDatepicker',
      plugins: [terser()]
    }
  ]
};