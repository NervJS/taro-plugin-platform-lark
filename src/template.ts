import { RecursiveTemplate } from '@tarojs/shared';

export class Template extends RecursiveTemplate {
  supportXS = false;

  Adapter = {
    if: 'tt:if',
    else: 'tt:else',
    elseif: 'tt:elif',
    for: 'tt:for',
    forItem: 'tt:for-item',
    forIndex: 'tt:for-index',
    key: 'tt:key',
    type: 'tt',
  };

  /**
   * 依据飞书小程序开发文档，editor 的 bindatfinder 事件是默认不设置的，设置回调函数会取消默认行为；
   * 但 taro 默认给每个事件设置 eh 事件处理函数；
   * 因此这里利用一个开关属性调整了 editor 的模版。
   */
  modifyTemplateResult = (res: string, nodeName: string): string => {
    if (nodeName === 'editor') {
      return res.replace(
        /bindatfinder\=\"eh\"/,
        "bindatfinder=\"{{i.supportCustomAtFinder?'eh':''}}\"",
      );
    }
    return res;
  };
}
