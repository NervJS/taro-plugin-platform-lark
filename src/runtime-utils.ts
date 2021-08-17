import { initNativeApi } from './apis';
import { noPromiseApis, needPromiseApis } from './apis-list';
import { components } from './components';

const hostConfig = {
  initNativeApi,
};

export {
  components,
  hostConfig,
  initNativeApi,
  needPromiseApis,
  noPromiseApis,
};
