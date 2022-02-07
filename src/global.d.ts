/** 在window全局上添加了属性 DocsAPI */
declare type IDocEditor = any;
interface IDocsAPI {
  DocEditor: new (placeholderId: string, config: Object) => IDocEditor;
}
declare global {
  interface Window {
    DocsAPI: IDocsAPI;
  }
}
export {};
