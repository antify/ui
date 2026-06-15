import {
  copyFile,
} from 'node:fs/promises';
import {
  defineBuildConfig,
} from 'unbuild';

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      pattern: [
        '**/*.vue',
      ],
      loaders: [
        'vue',
      ],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: [
        '**/*.ts',
      ],
      format: 'cjs',
      loaders: [
        'js',
      ],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: [
        '**/*.ts',
      ],
      format: 'esm',
      loaders: [
        'js',
      ],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: [
        '**/*.css',
      ],
    },
  ],
  declaration: true,
  clean: true,
  hooks: {
    'build:done': async () => {
      try {
        await copyFile('AGENTS.md', 'dist/AGENTS.md');
        console.log('🔹 [AI Sync] AGENTS.md successfully copied to dist/');
      } catch (error) {
        console.error('❌ Failed to copy AGENTS.md to dist:', error);
      }
    },
  },
});
