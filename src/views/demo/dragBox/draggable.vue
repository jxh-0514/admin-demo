<!-- 拖拽 -->
<template>
  <div>
    <div class="container">
      <div class="left" data-drop="move">
        <div data-effect="copy" draggable="true" class="color1 item">语文</div>
        <div data-effect="copy" draggable="true" class="color2 item">数学</div>
        <div data-effect="copy" draggable="true" class="color3 item">英语</div>
        <div data-effect="copy" draggable="true" class="color4 item">音乐</div>
        <div data-effect="copy" draggable="true" class="color5 item">政治</div>
        <div data-effect="copy" draggable="true" class="color6 item">历史</div>
        <div data-effect="copy" draggable="true" class="color7 item">体育</div>
      </div>
      <div class="right">
        <table>
          <!-- 列的分组 -->
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>星期一</th>
              <th>星期二</th>
              <th>星期三</th>
              <th>星期四</th>
              <th>星期五</th>
              <th>星期六</th>
              <th>星期日</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
            </tr>
            <tr>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
            </tr>
            <tr>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
            </tr>
            <tr>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
              <td data-drop="copy"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  自定义属性 data-effect="copy"
 */
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const container = document.querySelector(".container");

    let source;

    // 拖拽开始的事件
    container.ondragstart = (e) => {
      //e.dataTransfer.effectAllowed = "move"; // 设置拖拽的样式---默认是copy
      e.dataTransfer.effectAllowed = e.target.dataset.effect; //读取自定义属性的数据
      source = e.target;
      console.log("开始拖拽", e.target);
    };

    // 拖拽到哪个元素之上的事件
    container.ondragover = (e) => {
      e.preventDefault(); // 阻止默认行为则可以触发ondrop事件
      //   console.log("拖拽到哪个元素之上的事件", e.target);
    };

    // 清除之前的样式
    function clearDropStyle() {
      document.querySelectorAll(".drop-over").forEach((item) => {
        item.classList.remove("drop-over");
      });
    }

    function getDropNode(node) {
      while (node) {
        if (node.dataset?.drop) {
          return node;
        }
        node = node.parentNode;
      }
    }

    // 拖拽到哪个元素之上的事件---不频繁
    container.ondragenter = (e) => {
      clearDropStyle();
      //   const dropNode = e.target;
      const dropNode = getDropNode(e.target);
      if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        // 该节点能够接受目前拖拽的节点
        e.target.classList.add("drop-over"); //找到元素，给元素添加样式
      }
      console.log("拖拽到哪个元素之上的事件---不频繁", e.target);
    };

    // 拖拽结束的事件
    container.ondragend = (e) => {
      console.log("结束拖拽", e.target);
    };

    // 拖拽释放的事件
    container.ondrop = (e) => {
      clearDropStyle();
      const dropNode = getDropNode(e.target);
      if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        if (dropNode.dataset.drop === "copy") {
          dropNode.innerHTML = "";
          const cloned = source.cloneNode(true);
          cloned.dataset.effect = "move";
          dropNode.appendChild(cloned);
        } else {
          // move
          source.remove();
        }
      }
      console.log("释放拖拽", e.target);
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.drop-over {
  background-color: #585454;
}
.color1 {
  background-color: #f26e6e;
}
.color2 {
  background-color: #f2ac6e;
}
.color3 {
  background-color: #f2dc6e;
}
.color4 {
  background-color: #c4f26e;
}
.color5 {
  background-color: #6ef2ee;
}
.color6 {
  background-color: #6e73f2;
}
.color7 {
  background-color: #d56ef2;
}
.item {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 10px;
}
.container {
  display: flex;
  .left {
    background-color: #ccc;
    padding: 10px;
  }
  .right {
    width: 100%;
    // height: 100%;
    table {
      width: 100%;
      //   height: 100%;
      thead {
        width: 100%;
        height: 60px;
        margin-left: 20px;
      }
      tbody {
        width: 100%;
        tr {
          td {
            width: 100px;
            height: 60px;
            text-align: center;
            border: 1px solid #ccc;
          }
        }
      }
    }
  }
}
</style>
