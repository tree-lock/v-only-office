/** 此处定义跟 OnlyOffice 相关的各类型信息 */
declare namespace OnlyOffice {
  type IDocEditor = any;
  type FileType =
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
  interface OfficeDefaultConfig {
    contractId?: number;
    id?: string;
    document?: {
      key?: string;
      title?: string;
      url?: string;
      id?: string;
      fileType?: FileType;
      permissions?: {
        comment?: boolean;
        download?: boolean;
        edit?: boolean;
        fillForms?: boolean;
        modifyContentControl?: boolean;
        modifyFiler?: boolean;
        review?: boolean;
      };
      documentType?: "text";
    };
    mode?: "edit" | "view"; // 编辑 | 查看
    source?: "share" | "user";
    editorConfig?: {
      mode?: "view" | "edit";
      lang?: string;
    };
  }
  interface OfficeAppendConfig {
    contractId?: number;
    id?: string;
    document: {
      key: string;
      title: string;
      id: string;
      fileType?: FileType;
      url?: string;
      permissions?: {
        onRequestRestore?: boolean;
        comment?: boolean;
        download?: boolean;
        edit?: boolean;
        fillForms?: boolean;
        modifyContentControl?: boolean;
        modifyFiler?: boolean;
        review?: boolean;
      };
      documentType?: "text";
    };
    mode?: "edit" | "view"; // 编辑 | 查看
    source?: "share" | "user";
    editorConfig?: {
      mode?: "view" | "edit";
      lang?: string;
    };
  }
  interface OfficeConfig {
    contractId?: number;
    id?: string;
    document: {
      key: string;
      title: string;
      url: string;
      id: string;
      fileType?: FileType;
      permissions?: {
        comment?: boolean;
        download?: boolean;
        edit?: boolean;
        fillForms?: boolean;
        modifyContentControl?: boolean;
        modifyFiler?: boolean;
        review?: boolean;
      };
      documentType?: "text";
    };
    mode?: "edit" | "view"; // 编辑 | 查看
    source?: "share" | "user";
    editorConfig?: {
      mode?: "view" | "edit";
      lang?: string;
    };
  }
  type OnlyOfficeEvent = (event: any) => void;
  interface OnlyOfficeEvents {
    onAppReady?: OnlyOfficeEvent;
    onDocumentStateChange?: OnlyOfficeEvent;
    onDocumentReady?: OnlyOfficeEvent;
    onRequestEditRights?: OnlyOfficeEvent;
    onRequestHistory?: OnlyOfficeEvent;
    onRequestHistoryData?: OnlyOfficeEvent;
    onRequestRestore?: OnlyOfficeEvent;
    onRequestHistoryClose?: OnlyOfficeEvent;
    onError?: OnlyOfficeEvent;
    onWarning?: OnlyOfficeEvent;
    onInfo?: OnlyOfficeEvent;
    onOutdatedVersion?: OnlyOfficeEvent;
    onDownloadAs?: OnlyOfficeEvent;
    onRequestSaveAs?: OnlyOfficeEvent;
    onCollaborativeChanges?: OnlyOfficeEvent;
    onRequestRename?: OnlyOfficeEvent;
    onMetaChange?: OnlyOfficeEvent;
    onRequestClose?: OnlyOfficeEvent;
    onMakeActionLink?: OnlyOfficeEvent;
    onRequestUsers?: OnlyOfficeEvent;
    onRequestSendNotify?: OnlyOfficeEvent;
    onRequestInsertImage?: OnlyOfficeEvent;
    onRequestCompareFile?: OnlyOfficeEvent;
    onRequestSharingSettings?: OnlyOfficeEvent;
    onRequestCreateNew?: OnlyOfficeEvent;
  }
}
export default OnlyOffice;
