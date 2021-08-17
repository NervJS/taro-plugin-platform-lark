import { initNativeApi } from './apis';
import { noPromiseApis, needPromiseApis } from './apis-list';
import { components } from './components';
declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
};
export { components, hostConfig, initNativeApi, needPromiseApis, noPromiseApis, };
