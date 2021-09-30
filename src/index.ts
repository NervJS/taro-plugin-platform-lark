import fs from 'fs';
import path from 'path';
import type { IPluginContext } from '@tarojs/service';
import type { Options } from './types';
import Lark, { DEFAULT_ENTRY } from './program';

export { Lark };

export default (ctx: IPluginContext, options: Options): void => {
  ctx.registerPlatform({
    name: 'lark',
    useConfigName: 'mini',
    async fn({ config }) {
      const program = new Lark(ctx, config, options);
      await program.start();
    },
  });

  ctx.onBuildFinish(() => {
    const { entry } = options;
    if (!entry) {
      return;
    }

    const root = process.cwd();
    const distPath = ctx.paths.outputPath;
    const { name } = path.parse(entry);
    const fromPath = path.resolve(root, distPath, `${name}.json`);
    const toPath = path.resolve(root, distPath, `${DEFAULT_ENTRY}.json`);

    if (fs.existsSync(fromPath)) {
      fs.renameSync(fromPath, toPath);
    }
  });
};
