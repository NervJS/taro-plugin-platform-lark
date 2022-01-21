import { RecursiveTemplate } from '@tarojs/shared/dist/template';
export declare class Template extends RecursiveTemplate {
    supportXS: boolean;
    Adapter: {
        if: string;
        else: string;
        elseif: string;
        for: string;
        forItem: string;
        forIndex: string;
        key: string;
        type: string;
    };
    createMiniComponents(components: any): any;
    /**
     * 依据飞书小程序开发文档，editor 的 bindatfinder 事件是默认不设置的，设置回调函数会取消默认行为；
     * 但 taro 默认给每个事件设置 eh 事件处理函数；
     * 因此这里利用一个开关属性调整了 editor 的模版。
     */
    modifyTemplateResult: (res: string, nodeName: string) => string;
    modifyThirdPartyLoopBody: () => string;
}
