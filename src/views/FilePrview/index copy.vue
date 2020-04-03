<template>
  <div>
    <!-- <pdf
      v-show="currentPreviewType === 'pdf'"
      :src="currentPerviewUrl"
      :page="currentPage"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      @loaded="loadPdfHandler"
    /> -->
    <div>
      11
      <div>
        <pdf
          :src="previewUrl"
          :page="currentPage"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "",
  data() {
    return {
      previewUrl: "./中期检查.pdf", // pdf地址
      currentPage: 1, // pdf当前页
      pageCount: 0 // pdf文件总页数
    };
  },
  components: {
    pdf
  },
  methods: {
    // pdf加载时
    loadPdfHandler() {
      this.currentPage = 1; // 加载的时候先加载第一页
    }
  }
};
</script>

<style scoped></style>
