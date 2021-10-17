<template>
  <div id="app">
    <div class="title">
      <img src="./assets/title.png" width="70%" />
    </div>
    <app-main @save="saveImage = $event" />
    <transition name="el-zoom-in-top">
      <app-save
        @close="saveImage = ''"
        :image="saveImage"
        v-show="saveImage != ''"
      />
    </transition>
    <footer class="copyright">
      Support by XYSU(HC).Tech
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
  margin-top: 50px;
}
.copyright {
  margin-top: 6px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>
