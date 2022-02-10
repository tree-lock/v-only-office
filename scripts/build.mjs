#!/usr/bin/env zx

import { fs } from 'zx';

await $`pnpm build`;
await $`tsc`;
try {
  await fs.rename('dist/index.d.ts', 'dist/v-only-office.d.ts');
  console.log(chalk.green('构建结束'));
} catch (err) {
  console.log(chalk.red('构建失败'));
}
