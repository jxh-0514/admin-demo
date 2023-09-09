<template>
  <div>
    <!-- <div ref="preview"></div> -->
    <!-- 用于选择文件 -->

    <!-- <img style="width: 400px; height: 300px" :src="previewContent" /> -->
    <pre>{{ previewContent }}</pre>
    <div ref="preview"></div>

    <el-divider></el-divider>
    <p>图片</p>
    <input type="file" @change="previewImage" />
    <p>文本</p>
    <input type="file" @change="previewText" />
    <p>PDF</p>
    <input type="file" @change="previewPdf" />
    <p>word,excel,ppt</p>
    <input type="file" @change="previewOffice" />
    <!-- <input type="file" @change="previewFile" /> -->
  </div>
</template>

<script>
// import FileSaver from "file-saver";
import JSZip from "jszip";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export default {
  name: "DocumentPreview",
  components: {},
  data() {
    return {
      file: null,
      previewType: null,
      previewContent: null,
      fileUrl: null,
      fileType: null,
      preview: null,
    };
  },
  mounted() {
    // this.preview = new VFilePreview(this.$refs.preview);
    // this.preview.init();

    this.preview = this.$refs.preview;
  },
  methods: {
    previewImage(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.previewContent = URL.createObjectURL(file);
      }
    },
    previewText(event) {
      const files = event.target.files;
      console.log("文本---", event);
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewContent = e.target.result;
        };
        reader.readAsText(file);
      }
    },
    previewPdf(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const pdfData = new Uint8Array(e.target.result);
          pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
            const pages = pdf.numPages;
            for (let i = 1; i <= pages; i++) {
              pdf.getPage(i).then((page) => {
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext).promise.then(() => {
                  const imageData = canvas.toDataURL("image/png");
                  const img = document.createElement("img");
                  img.src = imageData;
                  this.preview.appendChild(img);
                });
              });
            }
          });
        };
        reader.readAsArrayBuffer(file);
      }
    },
    previewOffice(event) {
      console.log("读取本地文件---", event);
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("-----2222------", e.target.result);
          const fileData = new Uint8Array(e.target.result);
          // const zip = new JSZip();
          // zip.loadAsync(fileData).then((zip) => {
          //   const entries = Object.values(zip.files);
          //   Promise.all(
          //     entries.map((entry) => {
          //       return entry.async("arraybuffer").then((data) => {
          //         return {
          //           name: entry.name,
          //           data,
          //         };
          //       });
          //     })
          //   ).then((files) => {
          //     const fileData = {};
          //     files.forEach((file) => {
          //       fileData[file.name] = file.data;
          //     });
          //     console.log(
          //       "file data: " + fileData,
          //       files,
          //       fileData["word/document.xml"]
          //     );
          //     mammoth
          //       .convertToHtml({ arrayBuffer: fileData["word/document.xml"] })
          //       .then(
          //         (result) => {
          //           const div = document.createElement("div");
          //           div.innerHTML = result.value;
          //           this.preview.appendChild(div);
          //         },
          //         (error) => {
          //           console.log(error);
          //         }
          //       );
          //   });
          // });

          mammoth.convertToHtml({ arrayBuffer: fileData }).then((res) => {
            console.log("读取---", res);
            const div = document.createElement("div");
            div.innerHTML = res.value;
            this.preview.appendChild(div);
          }),
            (error) => {
              console.log(error);
            };
        };
        reader.readAsArrayBuffer(file);
      }
    },
    // previewFile(event) {
    //   const files = event.target.files;
    //   if (files && files.length > 0) {
    //     const file = files[0];
    //     this.file = file;
    //     const fileType = file.type;
    //     if (fileType.indexOf("image") > -1) {
    //       this.previewType = "image";
    //       this.previewContent = URL.createObjectURL(file);
    //     } else if (fileType.indexOf("pdf") > -1) {
    //       this.previewType = "pdf";
    //       this.previewPdf(file);
    //     } else if (fileType.indexOf("text") > -1) {
    //       this.previewType = "text";
    //       this.previewText(file);
    //     } else if (
    //       fileType.indexOf("word") > -1 ||
    //       fileType.indexOf("excel") > -1 ||
    //       fileType.indexOf("powerpoint") > -1
    //     ) {
    //       this.previewType = "office";
    //       this.previewOffice(file);
    //     } else {
    //       alert("不支持该文件格式");
    //     }
    //   }
    // },
    // previewPdf(file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const pdfData = new Uint8Array(e.target.result);
    //     pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
    //       const pages = pdf.numPages;
    //       let content = "";
    //       for (let i = 1; i <= pages; i++) {
    //         pdf.getPage(i).then((page) => {
    //           const viewport = page.getViewport({ scale: 1.0 });
    //           const canvas = document.createElement("canvas");
    //           const context = canvas.getContext("2d");
    //           canvas.height = viewport.height;
    //           canvas.width = viewport.width;
    //           const renderContext = {
    //             canvasContext: context,
    //             viewport: viewport,
    //           };
    //           page.render(renderContext).promise.then(() => {
    //             const imageData = canvas.toDataURL("image/png");
    //             content += `<img src="${imageData}" />`;
    //             if (i === pages) {
    //               this.previewContent = content;
    //               this.preview.show();
    //             }
    //           });
    //         });
    //       }
    //     });
    //   };
    //   reader.readAsArrayBuffer(file);
    // },
    // previewText(file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.previewContent = e.target.result;
    //     this.preview.show();
    //   };
    //   reader.readAsText(file);
    // },
    // previewOffice(file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const fileData = new Uint8Array(e.target.result);
    //     const zip = new JSZip();
    //     zip.loadAsync(fileData).then((zip) => {
    //       const entries = Object.values(zip.files);
    //       Promise.all(
    //         entries.map((entry) => {
    //           return entry.async("arraybuffer").then((data) => {
    //             return {
    //               name: entry.name,
    //               data,
    //             };
    //           });
    //         })
    //       ).then((files) => {
    //         const fileData = {};
    //         files.forEach((file) => {
    //           fileData[file.name] = file.data;
    //         });
    //         mammoth
    //           .convertToHtml({ arrayBuffer: fileData["word/document.xml"] })
    //           .then(
    //             (result) => {
    //               this.previewContent = result.value;
    //               this.preview.show();
    //             },
    //             (error) => {
    //               console.log(error);
    //             }
    //           );
    //       });
    //     });
    //   };
    //   reader.readAsArrayBuffer(file);
    // },
  },
};
</script>
