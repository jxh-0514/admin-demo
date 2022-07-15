<!-- vue签名 -->
<template>
  <div class="container">
      <div class="container">
        <VueSignaturePad
          id="signature"
          width="100%"
          height="500px"
          ref="signaturePad"
          :options="options"
        />
      </div>
      <div class="buttons">
        <button @click="undo">重置</button>
        <button @click="save">保存</button>
        <button @click="change">改变颜色</button>
        <button @click="resume">重置颜色</button>
      </div>
    </div>
</template>

<script>

  export default {
    components: {
        // VueSignaturePad
    },

    data () {
      return {        
        options: {
          penColor: "#c0f",
        },
      };
    },

    computed: {},

    watch: {},

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

    methods: {
      undo() {
        this.$refs.signaturePad.undoSignature();
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

        alert("Open DevTools see the save data.");
        console.log(isEmpty);
        console.log(data);
      },
      change() {
        this.options = {
          penColor: "#00f",
        };
      },
      resume() {
        this.options = {
          penColor: "#c0f",
        };
      },
    }
  }

</script>
<style lang='scss' scoped>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>