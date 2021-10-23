<template>
  <main>
    <section class="avatar-box" :class="{ 'circle-box': isCircle }">
      <div class="noImage upload-box" v-show="!hasImage">
        <div class="upload-box">
          <img src="@/assets/logo.png" />
          <p>从下方选择<br />误操作请刷新</p>
        </div>
      </div>
      <canvas
        width="512"
        height="512"
        ref="canvas"
        class="ccanvas"
        :class="{ 'circle-canvas': isCircle }"
      ></canvas>
      <canvas
        width="512"
        height="512"
        ref="canvas2"
        class="fb-canvas"
        :class="{ 'circle-canvas': isCircle }"
      ></canvas>
    </section>

    <section style="text-align:center;margin:10px 30px;">
      <el-checkbox v-model="isCircle"
        ><span style="color:white;">圆形头像</span></el-checkbox
      >
    </section>

    <button v-show="!hasImage" @click="$refs.picker.click()" class="save-btn">
      上传头像图片
    </button>

    <section class="choice-box">
      <div class="choice-warp" v-hscroll>
        <div
          :class="{ active: activeHead == a }"
          class="choice-icon"
          :key="'head' + a"
          @click="activeHead = a"
          v-for="(i, a) in head"
        >
          <img class="choice-img" :src="i.preview" />
        </div>
      </div>
    </section>

    <section class="choice-box">
      <div class="choice-warp" v-hscroll>
        <div
          class="choice-icon"
          :key="'icon' + a"
          @click="addIcon(a)"
          v-for="(i, a) in icons"
        >
          <img class="choice-img" :src="i.preview" />
        </div>
      </div>
    </section>

    <section class="save-box" v-show="hasImage">
      <button @click="$refs.picker.click()" class="save-btn save-w50">
        更换头像
      </button>
      <button @click="saveImage" class="save-btn save-w50">
        保存图片
      </button>
    </section>

    <!--Avatar cropper-->
    <div id="pick-avatar" ref="picker"></div>
    <avatar-cropper
      mimes="image/*"
      trigger="#pick-avatar"
      :upload-handler="getImage"
    />
  </main>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import { heads, icons } from "@/heads";
import horwheel from "horwheel";
//import {fabric} from '@/fabric'
export default {
  components: { AvatarCropper },
  directives: {
    hscroll: {
      inserted: function(el, binding) {
        horwheel(el);
      },
    },
  },
  data() {
    return {
      hasImage: false,
      activeHead: 0,
      head: heads,
      icons,
      isCircle: false,
    };
  },
  methods: {
    getImage(e) {
      this.$orignalImage = e.getCroppedCanvas({ width: 512, height: 512 });
      this.drawIcon();
    },
    renewImage() {
      this.$ctx.clearRect(0, 0, 512, 512);
      if (!this.$orignalImage) return;
      this.$ctx.drawImage(this.$orignalImage, 0, 0, 512, 512);
      this.hasImage = true;
    },
    drawIcon() {
      this.renewImage();
      if (this.activeHead < 0) return;
      this.$ctx.drawImage.apply(
        this.$ctx,
        [this.$headImg[this.activeHead]].concat(
          this.head[this.activeHead].params
        )
      );
    },
    async saveImage() {
      var fbimg = this.$fb.toDataURL("image/png");
      var imgel = await this.loadImg(fbimg);
      this.$ctx.drawImage(imgel, 0, 0, 512, 512);
      var base64 = this.$refs.canvas.toDataURL("image/png");
      this.$emit("save", base64);
      this.drawIcon();
    },
    loadImg(url) {
      return new Promise(function(resolve, reject) {
        var i = new Image();
        i.onload = function() {
          resolve(i);
        };
        i.onerror = reject;
        i.src = url;
      });
    },
    addIcon(i) {
      var imgInstance = new fabric.Image(this.$iconImg[i], {
        left: this.icons[i].x,
        top: this.icons[i].y,
      });
      imgInstance.cornerSize = 30;
      imgInstance.rotatingPointOffset = 50;
      imgInstance.transparentCorners = false;
      this.$fb.add(imgInstance);
    },
  },
  async mounted() {
    await this.$nextTick();
    this.$ctx = this.$refs.canvas.getContext("2d");
    this.$fb = new fabric.Canvas(this.$refs.canvas2);
    var promises = [];
    for (var i of this.head) {
      promises.push(this.loadImg(i.src));
    }
    this.$headImg = await Promise.all(promises);
    var promises2 = [];
    for (var i of this.icons) {
      promises2.push(this.loadImg(i.src));
    }
    this.$iconImg = await Promise.all(promises2);
  },
  watch: {
    activeHead() {
      this.drawIcon();
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-box {
  position: relative;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  border: 2px solid #d5e4fb;
  border-radius: 30px;
  overflow: hidden;
  .noImage {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-align: center;
    .upload-box {
      color: #902425;
      margin-top: 30px;
      img {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .ccanvas {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    border-radius: 28px;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
.circle-box {
  border-radius: 100px !important;
}
.circle-canvas {
  border-radius: 98px !important;
}
.choice-box {
  height: 70px;
  margin: 20px 30px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 0 10px;
  .choice-warp {
    width: 100%;
    overflow-x: auto;
    word-break: keep-all;
    white-space: nowrap;
  }
  .choice-icon {
    padding: 10px 5px;
    display: inline-block;
    overflow: hidden;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    img {
      border-radius: 7px;
      width: 50px;
      height: auto;
      display: inline-block;
    }
    &.active {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
.save-btn {
  height: 60px;
  margin: 6px 30px;
  background: #d5e4fb;
  color: #902425;
  border-radius: 10px;
  padding: 0 10px;
  -webkit-appearance: none;
  display: block;
  width: calc(100% - 60px);
  border: 0;
  font-size: 17px;
  &.save-w50 {
    width: calc(50% - 40px);
    display: inline-block;
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
  }
}
.save-tips {
  text-align: center;
  color: #fff;
  margin-top: 5px;
}
main::v-deep {
  .avatar-cropper
    .avatar-cropper-container
    .avatar-cropper-footer
    .avatar-cropper-btn:hover {
    background-color: #d5e4fb;
    color: #fff;
  }
  .cropper-line,
  .cropper-point.point-se::before,
  .cropper-point {
    background-color: #902425 !important;
  }
  .cropper-view-box {
    outline: #8e9399 !important;
  }
  .avatar-cropper .avatar-cropper-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
<style>
.canvas-container {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
}
.canvas-container,
.canvas-container .fb-canvas {
  width: 100% !important;
  height: 100% !important;
  border-radius: 28px;
}
</style>
