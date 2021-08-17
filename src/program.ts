import type { Options } from './types';
import fs from 'fs';
import path from 'path';
import { IPluginContext, TaroPlatformBase } from '@tarojs/service';
import { Template } from './template';
import { pcComponents, baseComponents } from './components';

const PACKAGE_NAME = '@tarojs/plugin-platform-lark';

const DEFAULT_ENTRY = 'app';

export default class Lark extends TaroPlatformBase {
  platform = 'lark';

  globalObject = 'tt';

  projectConfigJson = 'project.tt.json';

  runtimePath = `${PACKAGE_NAME}/dist/runtime`;

  taroComponentsPath = `${PACKAGE_NAME}/dist/components-react`;

  fileType = {
    templ: '.ttml',
    style: '.ttss',
    config: '.json',
    script: '.js',
  };

  template = new Template();

  options: Options;

  /**
   * 1. setupTransaction - init
   * 2. setup
   * 3. setupTransaction - close
   * 4. buildTransaction - init
   * 5. build
   * 6. buildTransaction - close
   */
  constructor(
    ctx: IPluginContext,
    config: unknown,
    options: Options = { pc: false },
  ) {
    super(ctx, config);

    this.options = options;
    this.setupTransaction.addWrapper({
      close: () => {
        this.modifyTemplate();
        this.modifyWebpackConfig();
      },
    });
    this.buildTransaction.addWrapper({
      close: () => {
        this.modifyAppJsonName();
      },
    });
  }

  modifyTemplate(): void {
    const { pc } = this.options;
    this.template.mergeComponents(this.ctx, pc ? pcComponents : baseComponents);
  }

  /**
   * modify entry
   */
  modifyWebpackConfig(): void {
    this.ctx.modifyWebpackChain(({ chain }) => {
      const { entry } = this.options;
      if (!entry) {
        return;
      }

      const root = process.cwd();
      const sourcePath = this.ctx.paths.sourcePath;

      chain
        .entry(DEFAULT_ENTRY)
        .clear()
        .add(path.resolve(root, sourcePath, entry));
    });
  }

  modifyAppJsonName(): void {
    const { entry } = this.options;
    if (!entry) {
      return;
    }

    const root = process.cwd();
    const distPath = this.ctx.paths.outputPath;
    const { name } = path.parse(entry);
    const fromPath = path.resolve(root, distPath, `${name}.json`);
    const toPath = path.resolve(root, distPath, `${DEFAULT_ENTRY}.json`);

    if (fs.existsSync(fromPath)) {
      fs.renameSync(fromPath, toPath);
    }
  }
}
