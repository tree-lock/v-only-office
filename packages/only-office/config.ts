import { ExtractPropTypes, PropType } from "vue";
import VOnlyOffice from "./v-only-office.type";

export default (
  props: Readonly<
    ExtractPropTypes<{
      identifier: {
        type: PropType<{
          key: string;
          url: string;
        }>;
        required: true;
      };
      articleTitle: {
        type: StringConstructor;
      };
      fileType: {
        type: PropType<VOnlyOffice.FileType>;
        required: true;
      };
      documentType: {
        type: PropType<VOnlyOffice.DocumentType>;
      };
      token: {
        type: StringConstructor;
      };
      document: {
        type: PropType<VOnlyOffice.Document>;
      };
      permission: {
        type: PropType<VOnlyOffice.Permissions>;
      };
      callbackUrl: {
        type: StringConstructor;
      };
      editorConfig: {
        type: PropType<VOnlyOffice.EditorConfig>;
      };
      events: {
        type: PropType<VOnlyOffice.Events>;
      };
      mode: {
        type: PropType<VOnlyOffice.Mode>;
      };
      user: {
        type: PropType<VOnlyOffice.User>;
      };
      customization: {
        type: PropType<VOnlyOffice.Customization>;
      };
      config: {
        type: PropType<VOnlyOffice.Config>;
      };
    }>
  >
): VOnlyOffice.Config => {
  let {
    identifier,
    articleTitle,
    fileType,
    documentType,
    token,
    document,
    permission,
    callbackUrl,
    editorConfig,
    events,
    mode,
    user,
    customization,
  } = props;
  let config = props.config;
  if (!config) {
    config = {};
  }
  config.editorConfig = editorConfig ?? {};
  config.token = token;
  config.document = document ?? {};
  config.documentType = documentType;
  config.events = events;
  config.editorConfig.lang = "zh-CN";

  config.document.fileType = fileType;
  config.document.permissions = permission;
  config.document.title = articleTitle;
  config.document.key = identifier.key;
  config.document.url = identifier.url;

  config.editorConfig.mode = mode;
  config.editorConfig.callbackUrl = callbackUrl;
  config.editorConfig.user = user;
  config.editorConfig.customization = customization;

  if (mode === "view") {
    if (!config.document.permissions) {
      config.document.permissions = {};
    }
    config.document.permissions.edit = false;
  } else {
    if (!config.editorConfig.callbackUrl) {
      console.error(
        "在编辑模式下，必须输入editorConfig.callbackUrl或callbackUrl以建立文档和服务器的连接"
      );
    }
  }

  return config;
};
