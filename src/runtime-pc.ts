import { mergeReconciler, mergeInternalComponents } from '@tarojs/shared';
import { hostConfig, pcComponents } from './runtime-utils';

mergeReconciler(hostConfig);
mergeInternalComponents(pcComponents);
