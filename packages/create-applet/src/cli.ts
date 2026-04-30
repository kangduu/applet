import { execSync } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkbox, confirm, input, select } from '@inquirer/prompts';
import { program } from 'commander';
import pc from 'picocolors';
import { copyAndRenderTemplate } from './render.js';

const PACKAGE_MANAGERS = ['pnpm', 'yarn', 'npm'] as const;
type Pm = (typeof PACKAGE_MANAGERS)[number];

const PLATFORMS = [
  { value: 'weapp', name: '微信小程序 (weapp)' },
  { value: 'h5', name: 'H5' },
  { value: 'alipay', name: '支付宝 (alipay)' },
  { value: 'tt', name: '抖音 / 字节 (tt)' },
] as const;

export type CliResolved = {
  projectDir: string;
  packageName: string;
  template: 'minimal';
  platforms: string[];
  packageManager: Pm;
  initGit: boolean;
};

function kebabCase(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-._]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveTemplateRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, '..', 'templates', 'minimal');
}

async function assertTargetDirAvailable(dir: string): Promise<void> {
  try {
    const list = await readdir(dir);
    if (list.length > 0) {
      throw new Error(`目录已存在且非空：${dir}`);
    }
  } catch (e: unknown) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') return;
    throw e;
  }
}

function parseList(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function runInteractive(defaults: Partial<CliResolved>): Promise<CliResolved> {
  let packageName: string;
  if (defaults.packageName) {
    packageName = defaults.packageName;
  } else {
    const rawName = await input({
      message: '项目名称（目录名与 package name）：',
      default: 'my-applet',
    });
    packageName = kebabCase(rawName);
  }
  if (!packageName) {
    throw new Error('项目名称无效');
  }

  const platforms =
    defaults.platforms ??
    (await checkbox({
      message: '目标平台（写入 README，后续与 Taro 模板对齐）：',
      choices: PLATFORMS.map((c) =>
        c.value === 'weapp' || c.value === 'h5' ? { ...c, checked: true } : { ...c }
      ),
      required: true,
    }));

  if (platforms.length === 0) {
    throw new Error('至少选择一个平台');
  }

  const packageManager = await select<Pm>({
    message: '包管理器：',
    choices: [
      { value: 'pnpm', name: 'pnpm（推荐）' },
      { value: 'yarn', name: 'yarn' },
      { value: 'npm', name: 'npm' },
    ],
    default: defaults.packageManager ?? 'pnpm',
  });

  const initGit =
    defaults.initGit ??
    (await confirm({
      message: '是否在项目目录执行 git init？',
      default: true,
    }));

  const cwd = process.cwd();
  const projectDir = join(cwd, packageName);

  return {
    projectDir,
    packageName,
    template: 'minimal',
    platforms,
    packageManager,
    initGit,
  };
}

export async function run(): Promise<void> {
  program
    .name('create-applet')
    .description('生成 applet 多端小程序工程（CLI MVP）')
    .argument('[project-name]', '项目目录名')
    .option('--template <id>', '模板 ID（仅 minimal）', 'minimal')
    .option('--framework <name>', '框架（仅 react）', 'react')
    .option('--platforms <list>', '逗号分隔：weapp,h5,alipay,tt')
    .option('--pm <name>', '包管理器：pnpm | yarn | npm', 'pnpm')
    .option('--no-git', '不执行 git init')
    .option('-y, --yes', '非交互：默认值 + 命令行参数（须提供项目名）')
    .parse();

  const opts = program.opts<{
    template: string;
    framework: string;
    platforms?: string;
    pm: string;
    git: boolean;
    yes: boolean;
  }>();
  const argName = program.args[0];

  if (opts.template !== 'minimal') {
    console.error(pc.red(`暂仅支持模板 minimal，收到：${opts.template}`));
    process.exitCode = 1;
    return;
  }

  if (opts.framework !== 'react') {
    console.error(pc.red(`当前 MVP 仅支持 --framework react，收到：${opts.framework}`));
    process.exitCode = 1;
    return;
  }

  if (!PACKAGE_MANAGERS.includes(opts.pm as Pm)) {
    console.error(pc.red(`无效的 --pm：${opts.pm}`));
    process.exitCode = 1;
    return;
  }

  if (opts.yes && !argName) {
    console.error(pc.red('使用 --yes 时必须提供项目名称参数，例如：create-applet my-app -y'));
    process.exitCode = 1;
    return;
  }

  let resolved: CliResolved;

  if (opts.yes && argName) {
    const packageName = kebabCase(argName);
    if (!packageName) {
      console.error(pc.red('项目名称无效'));
      process.exitCode = 1;
      return;
    }
    resolved = {
      projectDir: join(process.cwd(), packageName),
      packageName,
      template: 'minimal',
      platforms: parseList(opts.platforms) ?? ['weapp', 'h5'],
      packageManager: opts.pm as Pm,
      initGit: opts.git !== false,
    };
  } else {
    resolved = await runInteractive({
      packageName: argName ? kebabCase(argName) : undefined,
      platforms: parseList(opts.platforms),
      packageManager: opts.pm as Pm,
      initGit: opts.git === false ? false : undefined,
    });
  }

  await assertTargetDirAvailable(resolved.projectDir);
  await mkdir(resolved.projectDir, { recursive: true });

  const templateRoot = resolveTemplateRoot();
  const year = new Date().getFullYear();

  await copyAndRenderTemplate(templateRoot, resolved.projectDir, {
    packageName: resolved.packageName,
    platforms: resolved.platforms,
    platformList: resolved.platforms.join(', '),
    packageManager: resolved.packageManager,
    year,
  });

  if (resolved.initGit) {
    try {
      execSync('git init', { cwd: resolved.projectDir, stdio: 'ignore' });
    } catch {
      console.warn(pc.yellow('git init 失败，可稍后在项目目录手动执行。'));
    }
  }

  console.log(
    pc.green(`\n已生成：${pc.bold(resolved.projectDir)}`) +
      '\n下一步：' +
      pc.cyan(`cd ${resolved.packageName} && ${resolved.packageManager} install`)
  );
}

void run().catch((err: unknown) => {
  console.error(pc.red(err instanceof Error ? err.message : String(err)));
  process.exitCode = 1;
});
