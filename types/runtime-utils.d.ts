import { initNativeApi } from './apis';
import { noPromiseApis, needPromiseApis } from './apis-list';
import { components, pcComponents } from './components';
declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
};
export { components, pcComponents, hostConfig, initNativeApi, needPromiseApis, noPromiseApis, };
