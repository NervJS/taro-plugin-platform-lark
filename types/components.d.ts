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
        bindpickstart: string;
        bindpickend: string;
    };
    Video: {
        'auto-fullscreen': string;
    };
    Camera: {
        mode: string;
        resolution: string;
        'device-position': string;
        flash: string;
        scanCodeType: string;
        bindInitDone: string;
        bindStop: string;
        bindError: string;
        bindInserted: string;
        bindScanCode: string;
        bindLumaDetect: string;
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
    Textarea: {
        'disable-default-padding': string;
        'adjust-position': string;
    };
};
export declare const pcComponents: Components;
export declare const components: {
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
        bindpickstart: string;
        bindpickend: string;
    };
    Video: {
        'auto-fullscreen': string;
    };
    Camera: {
        mode: string;
        resolution: string;
        'device-position': string;
        flash: string;
        scanCodeType: string;
        bindInitDone: string;
        bindStop: string;
        bindError: string;
        bindInserted: string;
        bindScanCode: string;
        bindLumaDetect: string;
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
    Textarea: {
        'disable-default-padding': string;
        'adjust-position': string;
    };
};
export {};
