# V-Only-Office

<p align="center">
  <a href="https://github.com/darkXmo/v-only-office/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/v-only-office.svg?sanitize=true" alt="npm"></a>
  <a href="https://www.npmjs.com/package/v-only-office"><img src="https://img.shields.io/npm/v/v-only-office.svg?sanitize=true" alt="gzip size"></a>
</p>

## Features

1. A Vue3 component of OnlyOffice
2. Support Typescript with declaration

## Install

### npm

```bash
npm insatll v-only-office
```

### yarn

```bash
yarn add v-only-office
```

### pnpm

```bash
pnpm add v-only-office
```

## Usage

```vue
<template>
  <VOnlyOffice :identifier="identifier1" file-type="docx" />
</template>
<script setup lang="ts">
import { VOnlyOffice } from "v-only-office";
const identifier1 = {
  key: "file_key",
  url: "https://documentServer/Document.docx",
};
</script>
```

## Param

### identifier

The identifier of the document, which will override only-office config.document.key and config.document.url.

This is a required param.

```typescript
const identifier1 = {
  key: "file_key",
  url: "https://documentServer/Document.docx",
};
```

### fileType

Document type suffix.

This is a required param.

```typescript
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
```

### articleTitle

The title of the document

```vue
<template>
  <VOnlyOffice
    :identifier="identifier1"
    file-type="docx"
    article-title="I am A Document"
  />
</template>
```

### mode

The operation type of the only-office.

If you pass `view` in, `document.permissions.edit` will be set `false`.

default value `edit`;

```typescript
type Mode = "view" | "edit";
```

### callbackUrl

If mode `edit`, `callbackUrl` must be passed.

```typescript
type CallbackUrl = string;
```

### documentType

The layout of onlyoffice.

```typescript
type DocumentType = "word" | "cell" | "slide";
```

### token

token

```typescript
type Token = string;
```

### document

Check api.js for more details about document.

```typescript
interface Document {
  title?: string;
  url?: string;
  fileType?: FileType;
  options?: any;
  key?: string;
  vkey?: string;
  info?: Info;
  permissions?: Permissions;
}
```

### permissions

Check api.js for more details about permission.

This param will overwrite the permissions of document that you pass.

```typescript
interface Permissions {
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
```

### editorConfig

Check api.js for more details about editorConfig.

```typescript
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
```

### events

The Callback Functions of only-office, check api.js for more detail about events.

```typescript
interface Events {
  onAppReady?: Function;
  onDocumentStateChange?: Function;
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
```

### user

User information for cooperate document.

User param will overwrite the user of editorConfig that you pass.

```typescript
interface User {
  id?: string;
  name?: string;
  group?: string;
}
```

### customization

Particular configurations about only-office, check api.js for more detail about events.

User param will overwrite the customization of editorConfig that you pass.

```typescript
interface Customization {
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
```

### config

The full config of only-office.

Any other param will overwrite it. (It means that this parameter has the lowest priority)

```typescript
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
```
