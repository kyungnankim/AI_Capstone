import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
await copyFile(new URL('src/index.html', root), new URL('dist/index.html', root));
console.log(`Static build ready: ${fileURLToPath(new URL('dist/index.html', root))}`);
