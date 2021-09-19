import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: `./dist`,
      format: 'esm',
      name: 'DocxToPdf',
      sourcemap: true
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    'fs',
    'path',
    'child_process',
    'zlib'
  ],
  plugins: [
    cleaner({
      targets: [
        './dist/'
      ]
    }),
    typescript({
      typescript: require('ttypescript'),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { "transform": "typescript-transform-paths" },
            { "transform": "typescript-transform-paths", "afterDeclarations": true }
          ]
        }
      }
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
    }),
    resolve(),
    commonjs(),
    copy({
      targets:[
        {src: 'src/bin/**/*', dest: 'dist/bin'},
        {src: 'README.md', dest: 'dist'},
        {src: 'LICENSE', dest: 'dist'}
      ]
    }),
  ],
};
