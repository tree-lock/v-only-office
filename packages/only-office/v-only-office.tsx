/** OnlyOffice 编辑器组件 */
import { onBeforeUnmount, onMounted, PropType, defineComponent } from 'vue';
import VOnlyOffice from './v-only-office.type';
import initConfig from './config';

interface IDocsAPI {
  DocEditor: new (
    placeholderId: string,
    config: Object
  ) => VOnlyOffice.IDocEditor;
}
declare global {
  interface Window {
    DocsAPI: IDocsAPI;
  }
}

export default defineComponent({
  props: {
    /** 文档的标识符，key为生成的文件键值，url为文件的地址，会覆盖 */
    identifier: {
      type: Object as PropType<{
        key: string;
        url: string;
      }>,
      required: true,
    },
    /**
     * 文档的标题
     */
    articleTitle: {
      type: String,
    },
    /**
     * 文档的类型
     */
    fileType: {
      type: String as PropType<VOnlyOffice.FileType>,
      required: true,
    },
    /**
     * 文档的布局
     */
    documentType: {
      type: String as PropType<VOnlyOffice.DocumentType>,
    },
    /**
     * token登录状态
     */
    token: {
      type: String,
    },
    /**
     * 详情见api.js中的document，如果有permission，该值会被单独传入的permission覆盖
     */
    document: {
      type: Object as PropType<VOnlyOffice.Document>,
    },
    /**
     * 详情见api.js中的document.permission
     */
    permission: {
      type: Object as PropType<VOnlyOffice.Permissions>,
    },
    /**
     * `edit`模式下，必须输入callbackUrl
     */
    callbackUrl: {
      type: String,
    },
    /**
     * 详情见api.js中的editorConfig，如果传入值包含user，customization，该值会被单独传入的覆盖
     */
    editorConfig: {
      type: Object as PropType<VOnlyOffice.EditorConfig>,
    },
    /**
     * 详情见api.js中的events，该值包含的皆是函数
     */
    events: {
      type: Object as PropType<VOnlyOffice.Events>,
    },
    /**
     * 文档操作类型，`view`或`edit`。
     * 如果是`view`将会同时修改permission中的`edit`权限为`false`。
     */
    mode: {
      type: String as PropType<VOnlyOffice.Mode>,
    },
    /**
     * 用户信息
     */
    user: {
      type: Object as PropType<VOnlyOffice.User>,
    },
    /**
     * 自定义布局等信息，详情见api.js的editorConfig.customization
     */
    customization: {
      type: Object as PropType<VOnlyOffice.Customization>,
    },
    /** 详情见api.js中的config，完全的config。如果传入Config和其它值冲突，会被其它值覆盖 */
    config: {
      type: Object as PropType<VOnlyOffice.Config>,
    },
  },
  emits: ['init'],
  setup(props, context) {
    let officeEditor: VOnlyOffice.IDocEditor;
    onMounted(() => {
      officeEditor = init();
      context.emit('init', officeEditor);
    });
    /** 初始化唯一文档DomID */
    const documentId = Math.floor(Math.random() * 10000) + new Date().getTime();
    const containerId = `Container-${documentId}`;
    const contentId = `of-${documentId}`;

    const init = () => {
      const containerEle = document.getElementById(
        containerId
      ) as HTMLDivElement;
      containerEle.innerHTML = `<div id="${contentId}"></div>`;
      const config = initConfig(props);
      if (!window.DocsAPI) {
        throw new Error(
          'Please import onlyoffice api.js script | 请引入OnlyOffice api.js的Script标签'
        );
      }
      return new window.DocsAPI.DocEditor(contentId, config);
    };

    onBeforeUnmount(() => {
      officeEditor.destroyEditor();
    });
    return () => (
      <div id={containerId} style="height: 100%;">
        <div id={contentId}></div>
      </div>
    );
  },
});
