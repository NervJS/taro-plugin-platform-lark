import { RecursiveTemplate } from '@tarojs/shared/dist/template';

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

  modifyTemplateResult = (res: string, nodeName: string): string => {
    if (nodeName === 'editor') {
      return res.replace(
        /bindatfinder\=\"eh\"/,
        "bindatfinder=\"{{ i.supportCustomAtFinder?'eh':'' }}\"",
      );
    }
    return res;
  };
}
