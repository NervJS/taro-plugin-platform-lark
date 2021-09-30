import type { Options } from './types';
import fs from 'fs';
import path from 'path';
import { IPluginContext, TaroPlatformBase } from '@tarojs/service';
import { Template } from './template';
import { pcComponents, baseComponents } from './components';

const PACKAGE_NAME = '@tarojs/plugin-platform-lark';

export const DEFAULT_ENTRY = 'app';

export default class Lark extends TaroPlatformBase {
  platform = 'lark';

  globalObject = 'tt';

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
        this.findAndGenerateConfig();
      },
    });
  }

  findAndGenerateConfig(): void {
    const root = process.cwd();
    const LARK_JSON = 'project.lark.json';
    const TT_JSON = 'project.tt.json';

    if (fs.existsSync(path.resolve(root, LARK_JSON))) {
      this.generateProjectConfig(LARK_JSON);
    } else if (fs.existsSync(path.resolve(root, TT_JSON))) {
      // 兼容老项目用project.tt.json做飞书小程序配置文件的场景
      this.generateProjectConfig(TT_JSON);
    } else {
      throw new Error('飞书小程序编译需配置project.lark.json，请确认');
    }
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
}
