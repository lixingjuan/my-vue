<template>
  <div class="pdf" v-show="fileType === 'pdf'">
    <p class="arrow">
      <!-- // 上一页 -->
      <button @click="changePdfPage(0)" class="turn" :class="{ grey: currentPage == 1 }">
        Preview
      </button>
      {{ currentPage }} / {{ pageCount }}
      <!-- // 下一页 -->
      <button @click="changePdfPage(1)" class="turn" :class="{ grey: currentPage == pageCount }">
        Next
      </button>
    </p>
    <!-- // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 -->
    <div class="pdfWrap">
      <pdf
        :src="src"
        :page="currentPage"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        @loaded="loadPdfHandler"
      >
      </pdf>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";

export default {
  components: { pdf },
  data() {
    return {
      src: "./中期检查.pdf", // pdf文件地址
      currentPage: 1, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf" // 文件类型
    };
  },
  // created() {
  //   // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
  //   this.src = pdf.createLoadingTask(this.src);
  // },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      console.log(val);
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    loadPdfHandler() {
      console.log(this.pageCount);
      this.currentPage = 1; // 加载的时候先加载第一页
    }
  }
};
</script>
<style>
.pdfWrap {
  width: 200px;
  height: 300px;
  border: 1px red solid;
}
</style>
