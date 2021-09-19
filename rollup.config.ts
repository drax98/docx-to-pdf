import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';


const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: `./dist`,
      format: 'esm',
      name: 'DocxToPdf'
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    'fs',
    'path',
    'child_process',
    'zlib',
    'url'
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
    terser(),
    copy({
      targets:[
        {src: 'src/bin/**/*', dest: 'dist/bin'},
        {src: 'README.md', dest: 'dist'},
        {src: 'LICENSE', dest: 'dist'}
      ]
    }),
    generatePackageJson({
      baseContents: (pkg) => ({
        name: pkg.name,
        version: pkg.version,
        repository: pkg.repository,
        type: pkg.type,
        description: pkg.description,
        license: pkg.license,
        author: pkg.author,
        engines: pkg.engines,
        os: pkg.os,
      })
    })
  ],
};
