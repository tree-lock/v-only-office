#!/usr/bin/env zx
import { question } from 'zx';
import { chalk } from 'zx';
import { fs } from 'zx';
const pack = JSON.parse(await fs.readFile('package.json', 'utf-8'));
console.log('Current version: ', chalk.blue(pack.version));
const version = await question('Please input new version: \n');
pack.version = version;
await fs.writeFile('package.json', JSON.stringify(pack, null, 2));
await $`git add . && git commit -m "feat: version ${version}" && git push`;
await $`nrm use npm`;
await $`npm publish`;
await $`nrm use taobao`;
