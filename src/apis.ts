import { processApis } from '@tarojs/shared';
import { noPromiseApis, needPromiseApis } from './apis-list';

declare const tt: any;

export function initNativeApi(taro: unknown): void {
  processApis(taro, tt, {
    noPromiseApis,
    needPromiseApis,
  });
}
