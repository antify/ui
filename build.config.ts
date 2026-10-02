import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
  entries: [
    {builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue']},
    {builder: 'mkdist', input: './src', pattern: ['**/*.ts', '!**/__tests__/**'], format: 'cjs', loaders: ['js']},
    {builder: 'mkdist', input: './src', pattern: ['**/*.ts', '!**/__tests__/**'], format: 'esm', loaders: ['js']},
    {builder: 'mkdist', input: './src', pattern: ['**/*.css']},
  ],
  declaration: true,
  clean: true,
});
