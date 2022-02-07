<template>
  <div class="oi-container">
    <div id="only-office-container"></div>
  </div>
</template>

<script lang="ts" setup>
/** OnlyOffice 编辑器组件 */
import { onBeforeUnmount, onMounted, PropType, watch } from 'vue';
import OnlyOffice from './only-office.type';

const prop = defineProps({
  configData: {
    type: Object as PropType<OnlyOffice.OfficeConfig>,
    required: true,
  },
});

onMounted(() => {
  initConfig();
});
onBeforeUnmount(() => {});

let officeEditor: OnlyOffice.IDocEditor;
const fileType = 'docx'; //文件类型

// TODO userInfo 需要已定义
function initConfig(
  events?: OnlyOffice.OnlyOfficeEvents,
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzMzM2MTgxLCJpYXQiOjE2NDMyNDk3ODEsImp0aSI6ImRhZTgxZTM3NzlhNDRmZTdhOTUzMzVmNmNjZDJiZDY2IiwidXNlcl9pZCI6N30.HtfU1SFcP49YH22RExjxsPP7co2dL7wpd9TMTAezLzo'
) {
  // 防止 iframe 劫持页面导致不能重新加载页面内容
  const containerEle = document.getElementsByClassName(
    'oi-container'
  )[0] as HTMLDivElement;
  containerEle.innerHTML = `<div id="only-office-container"></div>`;

  const configData = prop.configData;
  const file_key: string = configData.document.key;

  const suffix = 'https://t-biz.sense.law';

  const callbackUrl = `${suffix}/v1/onlyoffice/callback/?id=${configData.document.id}`;
  const config = {
    type: 'desktop or mobile or embedded',
    document: {
      fileType: fileType,
      key: file_key,
      title: configData.document.title,
      url: `${configData.document.url}?token=${token}`,
    },
    documentType: 'word',
    // events: {
    //   onDocumentStateChange: function (event: any) {
    //     if (!event.data) {
    //       autoSave();
    //     }
    //   },
    // },
  };
  return new window.DocsAPI.DocEditor('only-office-container', config);
}
watch(() => prop.configData, onConfigDataChange);
function onConfigDataChange() {
  if (officeEditor.value) {
    officeEditor.value.destroyEditor();
  }
  // 设定文件类型
  initConfig();
}

// function autoSave() {
//   const configData = prop.configData;
//   const file_key = configData.document.key;
//   const params = {
//     file_key: file_key,
//   };
//   // TODO 将文章的key值上传到后端强制保存接口
//   // TODO: force_save
// }
</script>

<style lang="scss" scoped>
div.oi-container {
  height: 100%;
}
div#only-office-container {
  height: 100%;
  width: 100%;
}
</style>
