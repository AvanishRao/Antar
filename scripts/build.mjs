import { cp, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
for (const entry of await readdir(new URL('public/', root))) {
  await cp(new URL(`public/${entry}`, root), new URL(`dist/${entry}`, root), { recursive: true });
}
console.log(`Built static website: ${fileURLToPath(new URL('dist/', root))}`);
