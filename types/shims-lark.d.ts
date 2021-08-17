import type { ComponentType, CSSProperties } from 'react';
import type {
  CommonEvent,
  StandardProps,
} from '@tarojs/components/types/common';
import type { General } from '@tarojs/taro';

declare module '@tarojs/components/types/View' {
  interface ViewProps {
    onMouseEnter?: (e: CommonEvent) => void;
    onMouseLeave?: (e: CommonEvent) => void;
  }
}

declare module '@tarojs/components/types/PickerView' {
  interface PickerViewProps {
    /**
     * 当选择过程中经过新的值的时候，此时只会触发 pickover 不会触发 change 事件，event.detail = {column: number, row: number}
     */
    onPickOver?: (e: CommonEvent) => void;
  }
}

declare module '@tarojs/components/types/Video' {
  interface VideoProps {
    /**
     * 首次播放是否自动全屏	移动端 >= 3.41
     */
    autoFullscreen?: boolean;
    /**
     * 是否显示下载按钮，仅 PC 端 >= 3.45
     */
    showDownloadBtn?: boolean;
  }
}

declare module '@tarojs/components/types/WebView' {
  interface WebViewProps {
    /**
     * 进度条颜色，HexColor
     */
    progressbarColor?: string;
  }
}

interface EditorAtInfo {
  openId: string;
  name: string;
}

declare module '@tarojs/components/types/editor' {
  interface EditorProps {
    contents: {
      html?: string;
      text?: string;
      json?: string;
    };
    /**
     * 当编辑器内容为空的时候的提示信息
     */
    placeholder?: string;
    /**
     * 是否是只读模式，只读模式下，编辑器组件将无法编辑
     */
    readOnly?: boolean;
    /**
     * 可动态配置的功能
     */
    plugins?: string[];
    /**
     * placeholder 样式
     */
    placeholderStyle?: {};
    aditStyle?: CSSProperties;
    /**
     * 高度自适应
     */
    autoHeight?: boolean;
    /**
     * 编辑器初始化完成时的触发
     */
    onReady?: (e: CommonEvent) => void;
    /**
     * 编辑器内容变化时触发
     */
    onInput?: (
      e: CommonEvent<{
        html: any;
        text: any;
        delta: any;
      }>,
    ) => void;
    /**
     * 插入图片时，小程序需要实现的上传图图片回调
     */
    onInsertImage?: (e: CommonEvent) => void;
    /**
     * 默认 at 面板选择联系人时触发
     */
    onMentionSelect?: (e: CommonEvent) => void;
    /**
     * 点击 @xxx 标签时触发，PC 端悬浮触发
     */
    onMentionClick?: (e: CommonEvent) => void;
    /**
     * 用于文档链接的识别，输入或粘贴链接时，小程序需要实现的获取文档标题回调
     */
    onGetFileInfo?: (e: CommonEvent) => void;
    /**
     * 点击编辑器时的回调
     */
    onEditorClick?: (e: CommonEvent) => void;
    /**
     * 点击 at 人或者输入 at 的回调，用于业务方自定义 at 面板（有这个事件默认 at 面板不再弹出）
     */
    onAtFiner?: (e: CommonEvent) => void;
    /**
     * 失去焦点时的回调
     */
    onBlur?: (e: CommonEvent) => void;
  }
}

interface DataType {
  /**
   * 输入框中的文本内容
   */
  text: string;
  /**
   * 输入框中的 @ 人相关内容
   */
  reminders: {
    id: string;
    name: string;
    avatar?: string;
    offset: number;
  }[];
}

interface ReminderSuggestion {
  /**
   * reminder 的 openId
   */
  id: string;
  /**
   * reminder 的 name
   */
  name: string;
  /**
   * reminder 的图像 url
   */
  avatarUrl: string;
  /**
   * reminder所在的部门名称
   */
  departmentName: string;
}

interface CustomizedInputProps extends StandardProps {
  /**
   * 输入框加载时展示的数据
   */
  data?: DataType;
  /**
   * 设置为 true 时会在当前光标位置插入 @ 符号并调起 @ 人列表
   */
  showReminder?: boolean;
  /**
   * 展示被 @ 人时是否显示头像
   */
  showReminderAvatar?: boolean;
  /**
   * 输入框为空时显示的文字
   */
  placeholder?: string;
  /**
   * 输入框为空时显示的文字样式
   */
  placeholderStyle?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 获取焦点
   */
  focus?: boolean;
  enableRemind?: boolean;
  /**
   * 输入@时所展示的自定义推荐reminder的信息列表。飞书 4.0 版本支持。
   */
  reminderSuggestions?: ReminderSuggestion[];
  /**
   * 输入框内容改变时触发，event.detail = {text: '', reminders:[{id:'',offset:0}]}
   */
  onInput?: (e: CommonEvent<DataType>) => void;
  /**
   * 键盘敲击 Enter 键时触发
   */
  onConfirm?: (e: CommonEvent) => void;
  /**
   * 当输入框中内容为空时，继续删除时触发
   */
  onDelete?: (e: CommonEvent) => void;
  /**
   * 输入框聚焦时触发
   */
  onFocus?: (e: CommonEvent) => void;
  /**
   * 输入框失去聚焦时触发
   */
  onBlur?: (e: CommonEvent) => void;
}

declare module '@tarojs/components' {
  export const CustomizedInput: ComponentType<CustomizedInputProps>;
}

declare module '@tarojs/taro' {
  namespace NFC {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }

    interface NdefMessage {
      id: ArrayBuffer;
      type: ArrayBuffer;
      payload: ArrayBuffer;
    }

    interface NFCDiscoveredResponse {
      /** tech 数组，用于匹配 NFC 卡片具体可以使用什么标准（NfcA 等实例）处理 */
      techs: string[];
      /** 消息数组 */
      messages: NdefMessage[];
      /** NFC 标签的 UID */
      uid: ArrayBuffer;
    }

    interface NfcA {
      /** 连接 NfcA 类型的标签 */
      connect: (option?: Option) => Promise<General.CallbackResult>;
      /** 发送数据给 NfcA 类型的标签 */
      transceive: (
        option?: Option & { data: ArrayBuffer },
      ) => Promise<General.CallbackResult & { data: ArrayBuffer }>;
      /** 断开与 NfcA 标签之间的连接 */
      close: (option?: Option) => Promise<General.CallbackResult>;
      /** 获取 ATQA 信息 */
      getAtqa: (
        option?: Option,
      ) => Promise<General.CallbackResult & { data: ArrayBuffer }>;
      /** 获取最大传输长度 */
      getMaxTransceiveLength: (
        option?: Option,
      ) => Promise<General.CallbackResult & { length: number }>;
      /** 获取 SAK 信息 */
      getSak: (
        option?: Option,
      ) => Promise<General.CallbackResult & { sak: number }>;
      /** 设置超时时间 */
      setTimeout: (
        option?: Option & { timeout: number },
      ) => Promise<General.CallbackResult>;
    }

    interface MifareClassic {
      /** 连接 MifareClassic 类型的标签 */
      connect: (option?: Option) => Promise<General.CallbackResult>;
      /** 发送数据给 MifareClassic 类型的标签 */
      transceive: (
        option?: Option & { data: ArrayBuffer },
      ) => Promise<General.CallbackResult & { data: ArrayBuffer }>;
      /** 断开与 MifareClassic 标签之间的连接 */
      close: (option?: Option) => Promise<General.CallbackResult>;
      /** 获取最大传输长度 */
      getMaxTransceiveLength: (
        option?: Option,
      ) => Promise<General.CallbackResult & { length: number }>;
      /** 设置超时时间 */
      setTimeout: (
        option?: Option & { timeout: number },
      ) => Promise<General.CallbackResult>;
    }

    interface NFCAdaptor {
      /** 获取 NfcA 实例，实例支持 NFC-A (ISO 14443-3A)标准的读写 */
      getNfcA: () => NfcA;
      /** 获取 MifareClassic 实例，实例支持 MIFARE Classic 标签的读写 */
      getMifareClassic: () => MifareClassic;
      /** 开始扫描 NFC 标签 */
      startDiscovery: (option?: Option) => Promise<General.CallbackResult>;
      /** 关闭 NFC 标签扫描 */
      stopDiscovery: (option?: Option) => Promise<General.CallbackResult>;
      /** 监听 NFC Tag */
      onDiscovered: (callback: (res: NFCDiscoveredResponse) => void) => void;
      /** 取消监听 NFC Tag */
      offDiscovered: (callback: (res: NFCDiscoveredResponse) => void) => void;
    }
  }

  /** 获取客户端 NFC 适配器, 目前 iOS, PC 端不支持该 API, 安卓在飞书 3.38 及以上开始支持  */
  function getNFCAdapter(): NFC.NFCAdaptor;

  namespace WindowResize {
    interface Size {
      /** 变化后的窗口宽度，单位 px */
      windowWidth: number;
      /** 变化后的窗口高度，单位 px */
      windowHeight: number;
    }
  }

  /** 监听窗口尺寸变化事件 */
  function onWindowResize(callback: (size: WindowResize.Size) => void): void;

  /** 取消监听窗口尺寸变化事件 */
  function offWindowResize(callback: (size: WindowResize.Size) => void): void;

  namespace getCustomizedInput {
    interface AtParam {
      /** 标识联系人的 openID */
      id: string;
      /** 联系人名字 */
      name: string;
      /** @ 联系人所占文本在文本内容中的位置 */
      offset: number;
      /** @ 联系人 所占文本长度 */
      length: number;
    }
    interface Param {
      /** 文本内容 */
      content?: string;
      /** 描述文本内容预期值的提示信息 */
      placeholder?: string;
      /** 头像右侧 pickerView，为空时不显示 */
      userModelSelect?: {
        /** pickerView 可选择的值 */
        items: string[];
        /** pickerView 选中的值 */
        data?: string;
      };
      /** 头像图片地址，为空时不显示，当 userModelSelect 为空时也不显示 */
      avatar?: string;
      /** @ 选择联系人列表，为空时不显示 */
      at?: AtParam[];
      /** 图片地址列表，目前只支持传入一个图片 */
      picture?: string[];
      /** 是否显示表情面板 */
      showEmoji?: boolean;
      /** 内容为空是否允许发送 */
      enablesReturnKey?: boolean;
    }

    interface ResponseParam {
      /** 文本内容 */
      content: string;
      /** 头像右侧 pickerView 选中的值 */
      userModelSelect?: string;
      /** @选择联系人列表，为空时不显示 */
      at?: AtParam[];
      /** 图片地址列表，目前只支持传入一个图片 */
      picture?: string[];
    }

    interface CustomizedInput {
      /** 显示输入框 */
      show: (param: Param) => void;
      /** 更新输入框中显示的内容 */
      update: (param: Param) => void;
      /** 隐藏输入框 */
      hide: () => void;
      /** 监听连接成功的事件回调 */
      onPicSelect: (callbackFn: (res: ResponseParam) => void) => void;
      /** 选择 pickerView 之后触发的事件 */
      onModelSelect: (callbackFn: (res: ResponseParam) => void) => void;
      /** 点击发送按钮触发的事件 */
      onPublish: (callbackFn: (res: ResponseParam) => void) => void;
      /** 隐藏输入框之后触发的事件 */
      onHide: (callbackFn: (res: ResponseParam) => void) => void;
    }
  }

  /** 获取全局唯一的 customizedInput 实例。通过 customizedInput 显示一个可定制化的富文本输入框，支持@联系人、插入图片、插入表情、显示用户头像、切换用户头像状态，
PC 端暂不支持该 API */
  function getCustomizedInput(): getCustomizedInput.CustomizedInput;

  namespace startDeviceCredential {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 验证描述，即识别过程中显示在界面上的对话框提示内容 */
      authContent: string;
    }
  }

  /** 打开系统解锁界面, PC 端不支持该 API */
  function startDeviceCredential(
    option?: startDeviceCredential.Option,
  ): Promise<General.CallbackResult>;

  namespace mailto {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 收件人邮箱列表 */
      to?: string[];
      /** 抄送邮箱列表 */
      cc?: string[];
      /** 密送邮箱列表 */
      bcc?: string[];
      /** 主题 */
      subject?: string;
      /** 邮件内容 */
      body?: string;
    }
  }

  /** 调用系统发送邮件，调用邮件程序后会立即返回结果。后续登录账户、切换账户、发送、编辑、取消、失败等流程不会有回调，PC 端暂不支持该 API */
  function mailto(option?: mailto.Option): Promise<General.CallbackResult>;

  namespace startPasswordVerify {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 错误码 */
      errCode: number;
      /** 认证 token 信息 */
      token: string;
    }
  }

  /** 调起二次验证飞书安全密码的输入界面 */
  function startPasswordVerify(
    option?: startPasswordVerify.Option,
  ): Promise<startPasswordVerify.SuccessCallbackResult>;

  namespace checkWatermark {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 宿主是否显示了全局水印 */
      hasWatermark: boolean;
    }
  }

  /** 查看宿主是否显示了全局水印 */
  function checkWatermark(
    option?: checkWatermark.Option,
  ): Promise<checkWatermark.SuccessCallbackResult>;

  namespace openSchema {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 指定应用的 schema，schema需要满足 URI 协议。 例如 https://www.apple.com */
      schema: string;
      /** 是否跳转到飞书以外的应用。 内部应用（如 Doc / 小程序等）不受此参数限制。 */
      external?: boolean;
      /** 用于指定额外参数的对象 */
      options?: {
        /** 用于指定打开的端内容器的宽度，仅当 external 为 false 时生效。仅 PC 端支持 */
        width?: number;
        /** 用于指定打开的端内容器的高度，仅当 external 为 false 时生效。仅 PC 端支持 */
        height?: number;
      };
    }
  }

  /** 跳转到小程序以外的应用 */
  function openSchema(
    option?: openSchema.Option,
  ): Promise<General.CallbackResult>;

  namespace docsPicker {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 最大选择数量 */
      maxNum?: number;
      /** 允许开发者自定义组件的标题文案 */
      pickerTitle?: string;
      /** 允许开发者自定义组件的选择按钮文案 */
      pickerConfirm?: string;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 文件列表 */
      fileList: {
        /** docs 文件 url */
        filePath: string;
        /** docs 文件名 */
        fileName: string;
      }[];
    }
  }

  /** 打开云文档选择列表 */
  function docsPicker(
    option?: docsPicker.Option,
  ): Promise<docsPicker.SuccessCallbackResult>;

  namespace filePicker {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 最大选择数量 */
      maxNum?: number;
      /** 否使用系统的文件选择器，true表示用系统的文件选择器，并且maxNum参数会被设置为1，false表示使用飞书的文件选择器 */
      isSystem?: boolean;
      /** 允许开发者自定义文件选择器标题，仅在飞书文件选择器生效 */
      pickerTitle?: string;
      /** 允许开发者自定义组件的选择按钮文案，仅在飞书文件选择器下生效 */
      pickerConfirm?: string;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 文件列表 */
      list: {
        /** 文件路径 */
        path: string;
        /** 文件名 */
        name: string;
        /** 文件大小 */
        size: number;
      }[];
    }
  }

  /** 打开附件选择列表 */
  function filePicker(
    option?: filePicker.Option,
  ): Promise<filePicker.SuccessCallbackResult>;

  namespace showPrompt {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 标题，最多30个字符，中文按照2个字符计算 */
      title?: string;
      /** 输入框内容为空时的提示文案 */
      placeholder?: string;
      /** 最大输入长度，设置为-1的时候不限制最大长度 */
      maxLength?: number;
      /** 确定按钮的文案，最多8个字符，中文按照2个字符计算 */
      confirmText?: string;
      /** 取消按钮的文案，最多8个字符，中文按照2个字符计算 */
      cancelText?: string;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 是否点击了确定按钮 */
      confirm: boolean;
      /** 是否点击了取消按钮 */
      cancel: boolean;
      /** confirm 为 true 时，用户输入的内容 */
      inputValue: string;
    }
  }

  /** 展示可输入内容的弹窗 */
  function showPrompt(
    option?: showPrompt.Option,
  ): Promise<showPrompt.SuccessCallbackResult>;

  namespace getBlockActionSourceDetail {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 	进入应用时，getHostLaunchQuery 获取的参数 */
      triggerCode: string;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 业务类型，本次值为 message */
      bizType: string;
      /** 查询的 message 对象 */
      content: {
        /** message 列表 */
        messages: {
          /** text, post, image, media, file, interactive, unsupport 其中，3.47 以下(不含 3.47)版本只支持 text, post, image 及 unsupport */
          messageType:
            | 'text'
            | 'image'
            | 'post'
            | 'media'
            | 'file'
            | 'interactive'
            | 'unsupport';
          /** message 发送者对象 */
          sender: {
            /** message 发送者名字，按调用时客户端语言提供 */
            name: string;
            /** 用户 openid */
            open_id: string;
          };
          /** message 创建的时间戳, 单位秒 */
          createTime: number;
          /** 是否支持 content */
          support: boolean;
          /** json 串、message 具体内容、useDetail 命中时为详细内容 */
          content: string;
          /** 消息状态是否有效 */
          status: boolean;
          /** 触发操作会话的 id（仅 3.40 及以上版本版本飞书传递该字段） */
          openChatId: string;
          /** 触发操作的消息 id（仅 3.40 及以上版本飞书传递该字段） */
          openMessageId: string;
        };
        /** Action 发生的时间戳, 单位秒 */
        actionTime: number;
      };
    }
  }

  /** 支持从 block action 点击进入应用后，获取 block 对应业务的详细信息 */
  function getBlockActionSourceDetail(
    option?: getBlockActionSourceDetail.Option,
  ): Promise<getBlockActionSourceDetail.SuccessCallbackResult>;

  namespace getWifiStatus {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** Wi-Fi 状态类型 */
      status: string;
    }
  }

  /** 请求获取 Wi-Fi 开关状态，PC 端暂不支持该 API */
  function getWifiStatus(
    option?: getWifiStatus.Option,
  ): Promise<getWifiStatus.SuccessCallbackResult>;

  namespace getChatInfo {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 获取会话信息的会话Id */
      openChatId: string;
      /** 会话的类型：0 单聊，1群聊 */
      chatType: number;
      /** 单聊用户类型：0用户，1bot。chatType为0 这个参数必须传 */
      userType?: number;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 会话信息 */
      data: {
        /** 未读消息数 */
        badge: number;
        /** 被 at 数量 (3.12.0 版本增加的字段) */
        atCount: number;
        /** chat 名称 */
        name: string;
        /** 会话的头像 url 数组，包含多种图片分辨率 */
        avatarUrls: string[];
        /** 国际化会话名(可能为空) */
        i18nNames: {
          zh_cn: string;
          en_us: string;
          ja_jp: string;
        };
      };
    }
  }

  /** 获取某个会话的信息，确保用户已经登录 */
  function getChatInfo(
    option?: getChatInfo.Option,
  ): Promise<getChatInfo.SuccessCallbackResult>;

  namespace onChatBadgeChange {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 会话Id */
      openChatId: string;
      /** 回调函数 */
      onChange: ({ badge: number }) => void;
    }
  }

  /** 监听某个群未读消息数变化，确保用户已经登录 */
  function onChatBadgeChange(
    option?: onChatBadgeChange.Option,
  ): Promise<General.CallbackResult>;

  namespace offChatBadgeChange {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 获取会话信息的会话Id */
      openChatId: string;
      /** 如果不传 onChange 回调函数，则会取消 openChatId 对应的所有监听，传 onChange 则会取消指定监听 */
      onChange?: ({ badge: number }) => void;
    }
  }

  /** 取消监听某个群未读消息数变化 */
  function offChatBadgeChange(
    option?: offChatBadgeChange.Option,
  ): Promise<General.CallbackResult>;

  namespace getHostLaunchQuery {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }
  }

  /** 获取通过 AppLink 协议 打开小程序时 bdp_launch_query 参数的值 */
  function getHostLaunchQuery(
    option?: getHostLaunchQuery.Option,
  ): Promise<General.CallbackResult>;

  namespace setBLEMTU {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 蓝牙设备 ID，参考 device 对象 */
      deviceId: string;
      /** 最大传输单元 (22,512) 区间内，单位 bytes */
      mtu: number;
    }
  }

  /** 设置蓝牙最大传输单元，需在 tt.connectBLEDevice 调用成功后调用，mtu 设置范围 (22,512)，PC 端暂不支持该 API */
  function setBLEMTU(
    option?: setBLEMTU.Option,
  ): Promise<General.CallbackResult>;

  namespace connectBLEDevice {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 蓝牙设备 ID */
      deviceId: string;
    }
  }

  /** 链接外围设备，PC 端暂不支持该 API */
  function connectBLEDevice(
    option?: connectBLEDevice.Option,
  ): Promise<General.CallbackResult>;

  namespace disconnectBLEDevice {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 蓝牙设备 ID */
      deviceId: string;
    }
  }

  /** 断开设备连接 */
  function disconnectBLEDevice(
    option?: disconnectBLEDevice.Option,
  ): Promise<General.CallbackResult>;

  namespace chooseChat {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 是否可以多选(默认最多可选10个) */
      multiSelect?: boolean;
      /** 是否在会话列表过滤掉自己 */
      ignoreSelf?: boolean;
      /** 是否允许在选择会话列表支持创建群组返回（PC端不支持） */
      allowCreateGroup?: boolean;
      /** 是否在会话列表过滤掉机器人 (3.9.0版本增加的字段，PC端不支持) */
      ignoreBot?: boolean;
      /** 选择模式：0.选择单聊或群聊, 1只选择群聊；2.只选择单聊(此type下allowCreateGroup设置为true无效) */
      selectType?: number;
      /** 确认弹框的标题 */
      confirmTitle?: string;
      /** 确认弹框描述，空的时候不展示含 */
      confirmDesc?: string;
      /** 选择的会话是否包含外部会话，默认包含 */
      externalChat?: boolean;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      id: string;
      chatType: number;
      userType: number;
      avatarUrls: string[];
      name: string;
      i18nNames: {
        zh_cn: string;
        en_us: string;
        ja_jp: string;
      };
    }
  }

  /** 打开用户会话列表选择会话，调用前确保用户已经登入 */
  function chooseChat(
    option?: chooseChat.Option,
  ): Promise<chooseChat.SuccessCallbackResult>;

  namespace sendMessageCard {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 会话的openChatID列表，最大数量10 */
      openChatIDs?: string[];
      /** 消息卡片内容 */
      cardContent: object;
      /** 是否在选择会话页面中发送卡片，如果该字段设置为true则会跳转到选择会话页面并进行后续操作来完成卡片的发送 */
      shouldChooseChat?: boolean;
      /** 若指定了 shouldChooseChat 则可以定制选择会话的入参 */
      chooseChatParams?: object;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 发送消息卡片的 message 信息（只有消息发送动作产生时才会返回该字段；例如没有传 openChatID，用户取消发送，解析卡片内容失败等情况都不会返回该字段。版本要求：>=4.2） */
      sendCardInfo?: {
        /** 发送消息的状态码，0 表示发送成功 */
        status: number;
        /** 发送卡片的会话 ID */
        openChatId: string;
        /** 发送卡片的消息 ID */
        openMessageId: string;
      };
    }
  }

  /** 发送消息卡片给指定用户或者会话 */
  function sendMessageCard(
    option?: sendMessageCard.Option,
  ): Promise<General.CallbackResult>;

  namespace share {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 指定分享的渠道。默认为所有渠道，即唤起分享面板并展示所有分享渠道 */
      channelType?: string[];
      /** 指定内容的类型。目前支持文本、图片、URL 分享 */
      contentType?: string;
      /** 分享标题。 仅在 contentType = 'url' 下生效，且为必选参数 */
      title?: string;
      /** 分享的内容。注意： 如果 contentType = "text" 则该字段不能为空 */
      content?: string;
      /** 分享的图片 Base 64。注意： 如果 contentType = "image" 则该字段不能为空 */
      image?: string;
      /** 在线 URL */
      url?: string;
    }
  }

  /** 分享内容到三方应用 */
  function share(option?: share.Option): Promise<General.CallbackResult>;

  namespace toggleChat {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 会话 openChatId */
      openChatId: string;
      /** 侧边栏宽度 */
      width?: number;
      /** 是否需要侧边菜单栏 */
      needSidebar?: boolean;
      /** 保持侧边窗口不关闭，切换聊天对象(4.1 及之后版本) */
      isKeep?: boolean;
    }
  }

  function toggleChat(
    option?: toggleChat.Option,
  ): Promise<General.CallbackResult>;

  namespace chooseContact {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 是否多选 */
      multi?: boolean;
      /** 选择列表中是否排除当前用户，true：排除，false：不排除 */
      ignore?: boolean;
      /** 指定已选取的openId数组 */
      chosenIds?: string[];
      /** 多选时候最大选人数量 */
      maxNum?: number;
      /** 达到选人上限时的提示文案 */
      limitTips?: string;
      /** 联系人置灰、不可选择状态。 单选暂不支持 */
      disableChosenIds?: string[];
      /** 选择联系人列表是否包含外部联系人，默认包含 */
      externalContact?: boolean;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 选择用户列表 */
      data: {
        /** 用户 openid */
        openId: string;
        /** 用户姓名 */
        name: string;
        /** 联系人的头像 url 数组，包含多种图片分辨率 (3.13.0 版本增加的字段) */
        avatarUrls: string[];
        /** 国际化姓名 (3.13.0 版本增加的字段，可能为空) */
        i18nNames: {
          zh_cn: string;
          en_us: string;
          ja_jp: string;
        };
      }[];
      /** 选择部门列表(4.1.0 版本增加的字段) */
      department_data: {
        departmentId: string;
      }[];
    }
  }

  /** 侧边栏形式打开或关闭会话，重复调用可以控制侧边栏的打开和关闭 */
  function chooseContact(
    option?: chooseContact.Option,
  ): Promise<chooseContact.SuccessCallbackResult>;

  namespace enterProfile {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 用户openid */
      openid: string;
      /** 用户卡片原点（左上角）横坐标，单位: px */
      left?: number;
      /** 用户卡片原点（左上角）纵坐标，单位: px */
      top?: number;
    }
  }

  /** 进入个人信息主页 */
  function enterProfile(
    option?: enterProfile.Option,
  ): Promise<General.CallbackResult>;

  namespace enterChat {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 用户openid */
      openid?: string;
      /** 会话openChatId */
      openChatId?: string;
      /** 是否需要展示会话页面左上角badge数 */
      needBadge?: boolean;
    }
  }

  /** 打开指定会话 */
  function enterChat(
    option?: enterChat.Option,
  ): Promise<General.CallbackResult>;

  namespace enterBot {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }
  }

  /** 打开机器人聊天页面，启用 Bot 能力即支持此 API */
  function enterBot(option?: enterBot.Option): Promise<General.CallbackResult>;

  namespace exitMiniProgram {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
    }
  }

  /** 退出当前小程序 */
  function exitMiniProgram(
    option?: exitMiniProgram.Option,
  ): Promise<General.CallbackResult>;

  namespace startFaceVerify {
    interface Option {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: General.CallbackResult) => void;
      /** 接口调用失败的回调函数 */
      fail?: (res: General.CallbackResult) => void;
      /** 接口调用成功的回调函数 */
      success?: (res: General.CallbackResult) => void;
      /** 用户id */
      userId: string;
    }

    interface SuccessCallbackResult extends General.CallbackResult {
      /** 校验凭证 */
      reqNo: string;
    }
  }

  /** 用户人脸图像比对，可以用来判断两个人脸图像是否是同一个人，PC 端暂不支持该 API */
  function startFaceVerify(
    option?: startFaceVerify.Option,
  ): Promise<startFaceVerify.SuccessCallbackResult>;
}

export {};
