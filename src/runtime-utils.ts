import { initNativeApi } from './apis';
import { noPromiseApis, needPromiseApis } from './apis-list';
import { components, pcComponents } from './components';

const hostConfig = {
  initNativeApi,
};

export {
  components,
  pcComponents,
  hostConfig,
  initNativeApi,
  needPromiseApis,
  noPromiseApis,
};
