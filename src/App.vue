<template>
  <div id="app">
    <div class="title">
      <img src="./assets/title.png" width="70%" />
    </div>
    <el-dialog
      title="我们的微信公众号"
      :visible.sync="dialogVisible"
      width="80%"
      top="6vh"
      center
    >
      <div style="text-align:center;">
        <span>微信内长按二维码关注<br />或保存二维码至微信扫码关注。</span>
        <img
          src="@/assets/qr_xyhcxsh.png"
          width="100%"
          style="margin-top:8px;"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >我已关注</el-button
        >
      </span>
    </el-dialog>
    <app-main @save="saveImage = $event" />
    <transition name="el-zoom-in-top">
      <app-save
        @close="saveImage = ''"
        :image="saveImage"
        v-show="saveImage != ''"
      />
    </transition>
    <footer class="copyright">
      Supported by <span @click="dialogVisible = true">厦一海沧团学技术部</span>
    </footer>
  </div>
</template>

<script>
import appMain from "./components/main.vue";
import appSave from "./components/save.vue";
export default {
  name: "app",
  data() {
    return {
      saveImage: "",
      dialogVisible: true,
    };
  },
  components: {
    appMain,
    appSave,
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial,
    sans-serif !important;
}
#app,
body,
html {
  min-height: 100%;
  width: 100%;
  -webkit-touch-callout: none;
  user-select: none;
  background-color: #59719f;
}
#app {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-image: url(~@/assets/h5bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}
.title {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 60px;
}
.copyright {
  margin-top: 8px;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>
