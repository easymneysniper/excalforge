import { cp, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const entries = [
  ['projects', 'projects']
];

await mkdir(dist, { recursive: true });

for (const [from, to] of entries) {
  const source = path.join(root, from);
  const target = path.join(dist, to);

  try {
    const info = await stat(source);
    await cp(source, target, { recursive: info.isDirectory(), force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
