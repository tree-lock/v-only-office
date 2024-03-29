namespace VOnlyOffice {
  export interface IDocEditor {
    attachMouseEvents: () => any;
    denyEditingRights: (message?: any) => any;
    destroyEditor: (cmd?: any) => any;
    detachMouseEvents: () => any;
    downloadAs: (data?: any) => any;
    findAllTexts: (
      text?: any,
      highlight?: any,
      isMatchCase?: any,
      iShadow?: boolean
    ) => any;
    findText: (
      text?: any,
      highlight?: any,
      isNext?: any,
      isMatchCase?: any,
      iShadow?: boolean
    ) => any;
    highlightTexts: (
      isTransparent?: boolean,
      R?: boolean,
      G?: boolean,
      B?: boolean
    ) => any;
    insertImage: (data?: any) => any;
    processMailMerge: (enabled?: any, message?: any) => any;
    processRightsChange: (enabled?: any, message?: any) => any;
    processSaveResult: (result?: any, message?: any) => any;
    refreshHistory: (data?: any, message?: any) => any;
    removeSelection: () => any;
    replaceAllTexts: (text?: any, replaceWith?: any, isMatchCase?: any) => any;
    replaceText: (text?: any, replaceWith?: any, isMatchCase?: any) => any;
    serviceCommand: (command?: any, data?: any) => any;
    setActionLink: (data?: any) => any;
    setEmailAddresses: (data?: any) => any;
    setFavorite: (data?: any) => any;
    setHistoryData: (data?: any, message?: any) => any;
    setMailMergeRecipients: (data?: any) => any;
    setRevisedFile: (data?: any) => any;
    setSharingSettings: (data?: any) => any;
    setTextColor: (color?: any) => any;
    setUsers: (data?: any) => any;
    showMessage: (title?: any, msg?: any) => any;
    showSharingSettings: (data?: any) => any;
  }
  export interface Config {
    type?: string;
    width?: string;
    height?: string;
    documentType?: DocumentType;
    token?: string;
    document?: Document;
    editorConfig?: EditorConfig;
    events?: Events;
  }

  export type DocumentType = "word" | "cell" | "slide";

  export interface Document {
    title?: string;
    url?: string;
    fileType?: FileType;
    options?: any;
    key?: string;
    vkey?: string;
    info?: Info;
    permissions?: Permissions;
  }

  export interface Info {
    owner?: string;
    folder?: string;
    uploaded?: string;
    sharingSettings?: SharingSetting[];
    favorite?: boolean | undefined;
  }

  export interface SharingSetting {
    user?: string;
    permissions?: Permissions;
    isLink?: boolean;
  }

  export interface Permissions {
    edit?: boolean;
    download?: boolean;
    reader?: boolean;
    review?: boolean;
    print?: boolean;
    comment?: boolean;
    modifyFilter?: boolean;
    modifyContentControl?: boolean;
    fillForms?: boolean;
    copy?: boolean;
    editCommentAuthorOnly?: boolean;
    deleteCommentAuthorOnly?: boolean;
    reviewGroups?: string[];
  }

  export interface EditorConfig {
    actionLink?: ActionLink;
    mode?: Mode;
    lang?: string;
    location?: string;
    canCoAuthoring?: boolean;
    createUrl?: string;
    sharingSettingsUrl?: string;
    fileChoiceUrl?: string;
    callbackUrl?: string;
    saveAsUrl?: string;
    licenseUrl?: string;
    customerId?: string;
    region?: string;
    user?: User;
    recent?: Recent[];
    templates?: Template[];
    customization?: Customization;
    plugins?: Plugins;
  }

  export type Mode = "view" | "edit";

  export interface ActionLink {
    action?: Action;
  }
  export interface Action {
    type?: string;
    data?: string;
  }
  export interface User {
    id?: string;
    name?: string;
    group?: string;
  }

  export interface Recent {
    title?: string;
    url?: string;
    folder?: string;
  }

  export interface Template {
    title?: string;
    image?: string;
    url?: string;
  }

  export interface Customization {
    logo?: Logo;
    customer?: Customer;
    about?: boolean;
    feedback?: Feedback;
    goback?: GoBack;
    reviewPermissions?: ReviewPermissions;
    anonymous?: Anonymous;
    chat?: boolean;
    comments?: boolean;
    zoom?: number;
    compactToolbar?: boolean;
    leftMenu?: boolean;
    rightMenu?: boolean;
    hideRightMenu?: boolean;
    toolbar?: boolean;
    statusBar?: boolean;
    autosave?: boolean;
    forcesave?: boolean;
    showReviewChanges?: boolean;
    help?: boolean;
    compactHeader?: boolean;
    toolbarNoTabs?: boolean;
    toolbarHideFileName?: boolean;
    reviewDisplay?: string;
    spellcheck?: boolean;
    compatibleFeatures?: boolean;
    unit?: "cm" | "pt" | "inch";
    mentionShare?: boolean;
    macros?: boolean;
    plugins?: boolean;
    macrosMode?: "warn" | "enable" | "disable";
    trackChanges?: undefined | boolean;
    hideRulers?: boolean;
  }

  export interface Logo {
    image?: string;
    imageEmbedded?: string;
    url?: string;
  }

  export interface Customer {
    name?: string;
    address?: string;
    mail?: string;
    www?: string;
    info?: string;
    logo?: string;
  }

  export interface Feedback {
    visible?: boolean;
    url?: string;
  }

  export interface GoBack {
    url?: string;
    text?: string;
    blank?: boolean;
    requestClose?: boolean;
  }

  export interface ReviewPermissions {
    [K: string]: string[];
  }

  export interface Anonymous {
    request?: boolean;
    label?: string;
  }

  export interface Plugins {
    autostart?: string[];
    pluginsData?: string[];
  }

  export interface Events {
    onAppReady?: Function;
    onDocumentStateChange?: (event: {
      /** true: 开始保存
       * false: 保存完毕 */
      data: boolean;
      target: {
        frameOrigin: string;
      };
    }) => void;
    onDocumentReady?: Function;
    onRequestEditRights?: Function;
    onRequestHistory?: Function;
    onRequestHistoryData?: Function;
    onRequestRestore?: Function;
    onRequestHistoryClose?: Function;
    onError?: Function;
    onWarning?: Function;
    onInfo?: Function;
    onOutdatedVersion?: Function;
    onDownloadAs?: Function;
    onRequestSaveAs?: Function;
    onCollaborativeChanges?: Function;
    onRequestRename?: Function;
    onMetaChange?: Function;
    onRequestClose?: Function;
    onMakeActionLink?: Function;
    onRequestUsers?: Function;
    onRequestSendNotify?: Function;
    onRequestInsertImage?: Function;
    onRequestCompareFile?: Function;
    onRequestSharingSettings?: Function;
    onRequestCreateNew?: Function;
  }
  export type FileType =
    | "xls"
    | "xlsx"
    | "ods"
    | "csv"
    | "xlst"
    | "xlsy"
    | "gsheet"
    | "xlsm"
    | "xlt"
    | "xltm"
    | "xltx"
    | "fods"
    | "ots"
    | "pps"
    | "ppsx"
    | "ppt"
    | "pptx"
    | "odp"
    | "pptt"
    | "ppty"
    | "gslides"
    | "pot"
    | "potm"
    | "potx"
    | "ppsm"
    | "pptm"
    | "fodp"
    | "otp"
    | "doc"
    | "docx"
    | "doct"
    | "odt"
    | "gdoc"
    | "txt"
    | "rtf"
    | "pdf"
    | "mht"
    | "htm"
    | "html"
    | "epub"
    | "djvu"
    | "xps"
    | "docm"
    | "dot"
    | "dotm"
    | "dotx"
    | "fodt"
    | "ott"
    | "fb2"
    | "xml";
}

export default VOnlyOffice;
