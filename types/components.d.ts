interface Components {
    [key: string]: {
        [key: string]: string;
    };
}
export declare const mergeComponents: (...componentsArr: Components[]) => Components;
export declare const baseComponents: {
    Icon: {
        size: string;
    };
    Progress: {
        color: string;
        'active-color': string;
        'background-color': string;
    };
    PickerView: {
        bindpickover: string;
    };
    Video: {
        'auto-fullscreen': string;
    };
    WebView: {
        'progressbar-color': string;
    };
    Editor: {
        contents: string;
        placeholder: string;
        'read-only': string;
        plugins: string;
        placeholderStyle: string;
        'adit-style': string;
        'auto-height': string;
        bindready: string;
        bindinput: string;
        bindinsertimage: string;
        bindmentionselect: string;
        bindmentionclick: string;
        bindgetfileinfo: string;
        bindeditorclick: string;
        bindatfinder: string;
        bindblur: string;
    };
};
export declare const pcComponents: Components;
export declare const components: Components;
export {};
