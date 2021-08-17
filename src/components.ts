import { singleQuote } from '@tarojs/shared';

interface Components {
  [key: string]: {
    [key: string]: string;
  };
}

export const mergeComponents = (...componentsArr: Components[]): Components => {
  const retComponents: Components = {};

  componentsArr.forEach((components) => {
    Object.keys(components).forEach((name) => {
      if (name in retComponents) {
        Object.assign(retComponents[name], components[name]);
      } else {
        retComponents[name] = { ...components[name] };
      }
    });
  });

  return retComponents;
};

export const baseComponents = {
  Icon: {
    size: '24',
  },

  Progress: {
    color: singleQuote('#F85959'),
    'active-color': singleQuote('#F85959'),
    'background-color': singleQuote('#EBEBEB'),
  },

  PickerView: {
    bindpickover: '',
  },

  Video: {
    'auto-fullscreen': 'false',
  },

  WebView: {
    'progressbar-color': singleQuote('#51a0d8'),
  },

  Editor: {
    contents: '{}',
    placeholder: '',
    'read-only': 'false',
    plugins: '[]',
    placeholderStyle: '{}',
    'adit-style': '',
    'auto-height': 'false',
    bindready: '',
    bindinput: '',
    bindinsertimage: '',
    bindmentionselect: '',
    bindmentionclick: '',
    bindgetfileinfo: '',
    bindeditorclick: '',
    bindatfinder: '',
    bindblur: '',
  },
};

// for pc
export const pcComponents = mergeComponents(baseComponents, {
  View: {
    bindmouseenter: '',
    bindmouseleave: '',
  },

  Button: {
    shape: singleQuote('default'),
  },

  Video: {
    'show-download-btn': 'false',
  },

  CustomizedInput: {
    data: '{}',
    showReminder: 'false',
    showReminderAvatar: 'false',
    placeholder: '',
    placeholderStyle: '',
    disabled: 'false',
    focus: 'false',
    enableRemind: '',
    reminderSuggestions: '[]',
    bindinput: '',
    bindconfirm: '',
    binddelete: '',
    bindfocus: '',
    bindblur: '',
  },
});

export const components = pcComponents;
