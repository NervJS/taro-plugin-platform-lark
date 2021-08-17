import type { IPluginContext } from '@tarojs/service';
import type { Options } from './types';
import Lark from './program';

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
};
