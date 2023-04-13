<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-04-13 14:56:05
 * @LastEditors: 杭
 * @LastEditTime: 2023-04-13 16:58:57
-->
<template>
  <div>
    <!-- <p v-bind:draggable="true" v-on:dragstart="onDragStart">拖拽这段文字试试</p> -->
    <div class="dropzone" v-on:dragover.prevent>
      <p @dragover="handleDragOver" @dragenter="handleDragEnter" @drop="onDrop">
        {{ text }}
      </p>
    </div>
    <p>
      你可以在这段文本中选择一部分文字后进行拖拽操作。
      <span
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @dragstart="handleDragStart"
        >{{ selectedText }}</span
      >
    </p>

    <!-- <p>
      你可以在这段文本中选择一部分文字后进行拖拽操作。
      <span
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @dragstart="handleDragStart"
        :class="{ 'drag-enabled': dragEnabled }"
        >{{ selectedText }}</span
      >
      这是另一段文本，你可以在这里拖放。
      <span
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @drop="handleDrop"
        :class="{ 'drag-over': isDragOver }"
        >{{ text }}</span
      >
    </p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      textData: "",
      // selectedText: "",
      // dragEnabled: false,

      selectedText: "",
      dragEnabled: false,
      text: "这是插入文本，你可以在这里拖放。",
      insertIndex: 0, // 用于记录拖放文本的插入位置
      isDragOver: false,
    };
  },
  methods: {
    // onDragStart(event) {
    //   this.textData = event.target.innerText;
    //   console.log("拖拽---111", event);
    // },
    onDrop(event) {
      //   event.preventDefault();
      //   const selectedText = event.dataTransfer.getData("text");
      //   let range = window.getSelection().getRangeAt(0); //获取光标位置
      //   //   let textNode = document.createTextNode(this.textData);
      //   let textNode = document.createTextNode(selectedText);
      //   range.insertNode(textNode);
      //   console.log(
      //     "拖拽---222",
      //     event,
      //     range,
      //     textNode,
      //     "文本---",
      //     selectedText
      //   );
      event.preventDefault();
      const selectedText = event.dataTransfer.getData("text");
      if (this.isDragOver && selectedText) {
        const textArr = this.text.split("");
        textArr.splice(this.insertIndex, 0, selectedText);
        this.text = textArr.join("");
      }
      this.isDragOver = false;
      console.log('插入数据',this.insertIndex);
    },
    handleMouseDown(event) {
      const selection = window.getSelection(); // 获取选中的文本
      selection.removeAllRanges(); // 清除选中文本的区域中的内容
      this.dragEnabled = false;
    },
    handleMouseUp(event) {
      //判断是否在span标签内选区，如果选中了文本，则设置selectedText数据
      if (event.target.tagName === "SPAN") {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        this.selectedText = selectedText;
        if (selectedText) {
          this.dragEnabled = true;
        } else {
          this.dragEnabled = false;
        }
      }
    },
    handleDragOver(event) {
      event.preventDefault();
      const range = document.createRange();
      range.selectNodeContents(event.target);
      const rect = range.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY <= (rect.top + rect.bottom) / 2
      ) {
        // 在上半部分插入
        this.insertIndex = range.startOffset;
      } else if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY > (rect.top + rect.bottom) / 2
      ) {
        // 在下半部分插入
        this.insertIndex = range.endOffset;
      }
    },
    handleDragStart(event) {
      //判断是否开启了拖拽操作。如果已开启，使用setData方法设置选中的数据以及拖拽行为；否则，取消默认拖拽行为。
      if (this.dragEnabled) {
        event.dataTransfer.setData("text", this.selectedText);
        event.dataTransfer.effectAllowed = "move";
      } else {
        event.preventDefault();
      }
    },

    // handleMouseDown(event) {
    //   const selection = window.getSelection();
    //   selection.removeAllRanges();
    //   this.dragEnabled = false;
    // },
    // handleMouseUp(event) {
    //   if (event.target.tagName === "SPAN") {
    //     const selection = window.getSelection();
    //     const selectedText = selection.toString();
    //     this.selectedText = selectedText;
    //     if (selectedText) {
    //       this.dragEnabled = true;
    //     } else {
    //       this.dragEnabled = false;
    //     }
    //   }
    // },
    // handleDragStart(event) {
    //   if (this.dragEnabled) {
    //     event.dataTransfer.setData("text", this.selectedText);
    //     event.dataTransfer.effectAllowed = "move";
    //   } else {
    //     event.preventDefault();
    //   }
    // },
    handleDragEnter(event) {
      event.preventDefault();
      this.isDragOver = true;
    },
    // handleDragOver(event) {
    //   event.preventDefault();
    //   const range = document.createRange();
    //   range.selectNodeContents(event.target);
    //   const rect = range.getBoundingClientRect();
    //   const { clientX, clientY } = event;
    //   if (
    //     clientX >= rect.left &&
    //     clientX <= rect.right &&
    //     clientY <= (rect.top + rect.bottom) / 2
    //   ) {
    //     // 在上半部分插入
    //     this.insertIndex = range.startOffset;
    //   } else if (
    //     clientX >= rect.left &&
    //     clientX <= rect.right &&
    //     clientY > (rect.top + rect.bottom) / 2
    //   ) {
    //     // 在下半部分插入
    //     this.insertIndex = range.endOffset;
    //   }
    // },
    // handleDrop(event) {
    //   event.preventDefault();
    //   const selectedText = event.dataTransfer.getData("text");
    //   if (this.isDragOver && selectedText) {
    //     const textArr = this.text.split("");
    //     textArr.splice(this.insertIndex, 0, selectedText);
    //     this.text = textArr.join("");
    //   }
    //   this.isDragOver = false;
    // },
  },
};
</script>
<style scoped>
.dropzone {
  height: 200px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  position: relative;
}
.drag-enabled {
  cursor: move;
  background-color: #ffc107;
}
.drag-over {
  background-color: #007bff;
  color: #fff;
}
</style>
