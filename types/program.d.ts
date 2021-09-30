import type { Options } from './types';
import { IPluginContext, TaroPlatformBase } from '@tarojs/service';
import { Template } from './template';
export declare const DEFAULT_ENTRY = "app";
export default class Lark extends TaroPlatformBase {
    platform: string;
    globalObject: string;
    runtimePath: string;
    taroComponentsPath: string;
    fileType: {
        templ: string;
        style: string;
        config: string;
        script: string;
    };
    template: Template;
    options: Options;
    /**
     * 1. setupTransaction - init
     * 2. setup
     * 3. setupTransaction - close
     * 4. buildTransaction - init
     * 5. build
     * 6. buildTransaction - close
     */
    constructor(ctx: IPluginContext, config: unknown, options?: Options);
    findAndGenerateConfig(): void;
    modifyTemplate(): void;
    /**
     * modify entry
     */
    modifyWebpackConfig(): void;
}
