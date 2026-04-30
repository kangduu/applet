import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import ejs from 'ejs';

export type TemplateContext = Record<string, unknown>;

export async function copyAndRenderTemplate(
  templateRoot: string,
  destRoot: string,
  data: TemplateContext
): Promise<void> {
  await copyDir(templateRoot, templateRoot, destRoot, data);
}

async function copyDir(
  templateAnchor: string,
  currentDir: string,
  destRoot: string,
  data: TemplateContext
): Promise<void> {
  const entries = await readdir(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(currentDir, entry.name);
    const rel = relative(templateAnchor, srcPath);

    if (entry.isDirectory()) {
      await mkdir(join(destRoot, rel), { recursive: true });
      await copyDir(templateAnchor, srcPath, destRoot, data);
      continue;
    }

    if (entry.name.endsWith('.ejs')) {
      const raw = await readFile(srcPath, 'utf8');
      const rendered = ejs.render(raw, data, {
        filename: srcPath,
        rmWhitespace: false,
      });
      const outRel = join(dirname(rel), entry.name.replace(/\.ejs$/, ''));
      const outPath = join(destRoot, outRel);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, rendered, 'utf8');
      continue;
    }

    const destPath = join(destRoot, rel);
    await mkdir(dirname(destPath), { recursive: true });
    await copyFile(srcPath, destPath);
  }
}
