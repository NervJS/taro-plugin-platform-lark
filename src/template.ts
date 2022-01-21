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

  createMiniComponents(components): any {
    const result = super.createMiniComponents(components);

    // TODO: 目前还没有比较好的办法去判断当前 taro 支持不支持 modifyThirdPartyLoopBody 这个方法
    // 暂时不删除 slot 节点，等提升 taro 的依赖版本后再移除
    // delete result.slot

    return result;
  }

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

  modifyThirdPartyLoopBody = () => {
    // 支持新架构，保证 slot 一定直接位于自定义组件下，避免被 template 包一层之后无法识别
    return `<view tt:if="{{item.nn==='slot'}}" slot="{{item.name}}" id="{{item.uid}}">
        <block tt:for="{{item.cn}}" tt:key="uid">
          <template is="tmpl_0_container" data="{{i:item}}" />
        </block>
      </view>
      <template tt:else is="tmpl_0_container" data="{{i:item}}" />`;
  };
}
