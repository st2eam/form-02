<template>
  <div class="share-view">
    <FormNav :id="id" />
    <main class="main">
      <div class="qr-code item">
        <span class="title">{{ formTitle }}</span>
        <qrcode-vue :value="formUrl" :size="230" level="H" />
        <span class="notice">微信扫码或长按识别，填写内容</span>
      </div>
      <div class="download item" @click="downloadQrCode">
        <span>下载二维码</span>
      </div>
      <div class="copylink item" @click="copyLink">
        <span>复制链接</span>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import QrcodeVue from "qrcode.vue";
import FormNav from "../../components/formNav.vue";
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import { useRoute } from "vue-router";
import { getForm } from "../../services/api";
export default defineComponent({
  name: "ShareView",
  components: {
    FormNav,
    QrcodeVue,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id as string);
    const formTitle = ref<string>("");
    const formSubtitle = ref<string>("");
    const load = async () => {
      const res = await getForm({ id: id.value });
      if (res.stat === "ok") {
        formTitle.value = res.data.item.title;
        formSubtitle.value = res.data.item.subTitle;
      } else {
        ElMessage.error(res.msg);
      }
    };
    onMounted(async () => {
      await load();
    });
    const formUrl = window.location.href.replace(/create/g, "fillform");
    const { toClipboard } = useClipboard();
    //下载二维码
    const downloadQrCode = () => {
      let canvasImage = document
        .getElementsByTagName("canvas")[0]
        .toDataURL("image/png");
      let xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function () {
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = "qrcode.png";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open("GET", canvasImage);
      xhr.send();
    };
    //复制链接
    const copyLink = async () => {
      try {
        await toClipboard(formUrl);
        ElMessage.success("链接已复制到剪切板！");
      } catch (e) {
        console.error(e);
      }
    };
    // 清除缓存
    onBeforeMount(() => {
      sessionStorage.removeItem("cpnArray");
      sessionStorage.removeItem("formTitle");
      sessionStorage.removeItem("formSubtitle");
    });

    return {
      formTitle,
      formSubtitle,
      formUrl,
      downloadQrCode,
      copyLink,
      id,
    };
  },
});
</script>
<style scoped>
.share-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vh;
  width: 100%;
  height: 100vh;
  background-color: #f2f4f7;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
  height: 84vh;
  background-color: #fff;
}
.item {
  margin: 20px 0;
}
.qr-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.qr-code span {
  margin: 30px 0;
}
.title {
  font-size: 1.4rem;
}
.notice {
  color: rgba(0, 0, 0, 0.5);
}
.download {
  font-size: 1.5rem;
  color: #409eff;
  cursor: pointer;
}
.copylink {
  width: 150px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.copylink:hover {
  color: #409eff;
}
</style>
