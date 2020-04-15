<template>
  <div class="list">
    <div class="list-content">
      <!-- 头部 -->
      <div class="list-header">
        <!-- :class="{ 'list-header-item','currentTab' : workflowType === 'TODO'}" -->
        <div
          @click="queryByType('TODO')"
          :class="{ 'list-header-item': true, currentTab: workflowType === 'TODO' }"
        >
          {{ $t("APPROVAL.MY_TO_DO") }}
        </div>
        <div
          @click="queryByType('APPROVED')"
          :class="{ 'list-header-item': true, currentTab: workflowType !== 'TODO' }"
        >
          {{ $t("APPROVAL.MY_DOWN") }}
        </div>
      </div>
      <!-- 搜索列表 -->
      <div class="search-approval-list">
        <div class="search-button" @click="goSearch()">
          {{ $t("SEARCH") }}
        </div>
      </div>
      <!-- 页面全局loading -->
      <base-loading v-show="true"></base-loading>
      <!-- 页面body部分 -->
      <div id="tabListWrap" class="bscroll" ref="bscroll">
        <div
          ref="bscrollContainer"
          :class="{ 'bscroll-container': true, innerShorterOuter: innerShorterOuter }"
        >
          <!-- <p id="drop-down" v-show="dataStatusShowObj.showPullingDown">
            <van-loading color="#1989fa" size="24">松手刷新数据</van-loading>
          </p> -->

          <approval-list v-show="workflowType === 'TODO'" :listDataProps="todolistData" />
          <approval-list v-show="workflowType !== 'TODO'" :listDataProps="donelistData" />

          <!--  <p id="drop-up" v-show="dataStatusShowObj.showPullingUp">
            <van-loading color="#1989fa" size="24">加载更多</van-loading>
          </p> -->

          <p id="noMoreData" v-show="dataStatusShowObj.showNoMoreData">我是有底线的...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import _ from "lodash";
// // import { Popup  } from "vux";

// // import NoData from "../../components/base-ui/no-data.vue";
// import BaseLoading from "../../components/base-ui/base-loading.vue";

// // import SwipeoutItem from '../../components/swipeout/swipeout-item.vue';
// // import InvoiceItem from "../../components/base-ui/invoice-item1.vue";
// // import BetterScroll from '../../components/iscroll/better-scroll.vue';
// import ApprovalList from  "@/components/approvalComponents/index.vue";

// import Axios from "@/service/AxiosPlugin";


// export default {
//   name: "approval-list",
//   components: {
//     BaseLoading,
//     ApprovalList,
//   },
//   data () {
//     return {
//       userId: "",
//       pageNum: 1,
//       pageSize: 10,
//       totalPage: 1,
//       workflowType: "TODO", // 单据状态
//       showSearchPullUp: false,
//       todolistData:[],
//       donelistData:[],
//       inkLeft: 10,
//       inkRight: 60,
//       noTodoDataFlag:false,
//       noDoneDataFlag:false,
//       loadMoreFlag: true, // hasMoreSearch
//       goDetailPage: false, // 处理返回按钮
//       isLoadingData:false,
//       pageNumBySearch: 1,
//       totalPageBySearch: 1,
//       approvalListBySearch: [], // 搜索时用的
//       searchValue: "", // 请输入申请单姓名或者单号
//       showPopup: false, // 用于控制搜索弹出框是否显示
//       searchReginHeight: "height:100%",
//       dataStatusShowObj:{
//         showPullingDown:false,
//         showPullingUp:false,
//         showNoMoreData:false
//       },
//       innerShorterOuter:false,

//     };
//   },
//   created(){
//     this.goDetailPage = false;
//     this.workflowType=  "TODO";
//     this.queryByType(this.workflowType);
//   },
//   methods: {

//     /* 查询对应状态的数据 */
//     queryByType (workflowType) {

//       this.workflowType = workflowType;
//       this.workflowType ==="TODO" ? this.todolistData=[] : this.donelistData=[];

//       // 仅用于实现切换（代办、已办）时的样式，无其他逻辑效果
//       if (this.workflowType == "TODO") {
//         this.changePosition(1, 2);
//       } else {
//         this.changePosition(2, 2);
//       }
//       // 获取数据
//       this.loadData();
//     },
//     /* 切换tab下面横线的位置 */
//     changePosition (index, totalNum) {
//       var position = caculatePosition(index, totalNum);
//       this.inkLeft = position.left;
//       this.inkRight = position.right;
//     },

//     /* 调用接口获取数据 */
//     loadData : _.debounce(async function() {

//       // this.scrollHandler.isLoadingData = true;
//       const data_type = this.workflowType==="TODO" ? "todo_list" : "havedo_list";

//       const  params = {
//         data_type,
//         action: "query",
//         pagenum: this.pageNum,
//         pagesize: this.pageSize,
//         fetchall: "false",
//         query_param: this.searchValue,
//         encryption_key: window.localStorage.encryption_key,
//         // "user_id": this.userId,
//       };

//       let res ;
//       try{
//         res = await Axios.post(params);
//       }finally{
//         // this.scrollHandler.isLoadingData = false;
//       }

//       const {result:{record}} = res;

//       if(this.workflowType==="TODO"){
//         this.todolistData = this.jsonArray(record).map(item=>({
//           recordId: item.record_id,
//           bgtCheck: item.bgt_check,
//           nodeName: item.node_name,
//           currency: !item.account_set ? "CNY" : "HKD",
//           doc_code: item.doc_code,
//           instanceId: item.instance_id,
//           description: item.description,
//           currentNode: item.current_node,
//           totalAmount: item.instance_amount.toString(),
//           orderTypeCode: item.order_type_code,
//           documentNumber: item.document_number,
//           submissionDate: item.apply_date_view,
//           todoDescription: item.todo_description,
//           travel_type_desc:
//           item.travel_type_desc !== undefined ? item.travel_type_desc : "",

//           status: "",
//           showTodo: "",
//           documentType: "",
//           employeeName: "",
//           orderTypeName: "",
//           lastApproveName: "",
//           currentApproveName: ""
//         }));
//         this.noTodoDataFlag = this.todolistData.length===0;
//         }else {
//           this.donelistData = this.jsonArray(record).map(item => ({
//                 showTodo: false,
//                 status: item.status_name,
//                 currency: !item.account_set ? "CNY" : "HKD",
//                 doc_code: item.doc_code,
//                 instanceId: item.instance_id,
//                 totalAmount: item.instance_amount.toString(),
//                 employeeName: item.employee_name,
//                 documentType: item.document_type,
//                 documentNumber: item.order_no,
//                 orderTypeName: item.order_type,
//                 submissionDate: item.last_update_date,
//                 lastApproveName: item.status !== 1 ? item.last_approve_name : "",
//                 currentApproveName: item.curr_approve_name,
//                 travel_type_desc:
//                 item.travel_type_desc !== undefined ? item.travel_type_desc : "",

//                 nodeName: "",
//                 bgtCheck: "",
//                 recordId: "",
//                 currentNode: "",
//                 description: "",
//                 todoDescription: "",
//                 orderTypeCode: item.order_type_code
//               }));
//             this.noDoneDataFlag = this.donelistData.length===0;
//         }
//     },1000),




//     /* 跳转详细页面 */
//     goDetail (item) {
//       this.goDetailPage = true;
//       let params = {
//         documentNumber: item.documentNumber,
//         orderTypeCode: item.orderTypeCode,
//         workflowType: this.workflowType,
//         recordId: item.recordId,
//         nodeName: item.nodeName,
//         instanceId: item.instanceId,
//         currentNode: item.currentNode,
//         bgtCheck: item.bgtCheck,
//         documentType: item.doc_code // 单据类型，用于在 detail 页面时，不显示差旅申请类型报销单的 budget query 列
//       };

//       // fix: HGI 差旅申请进入 travel-list-detail 页面
//       if (item.doc_code === "SQ0030" || item.doc_code === "HGISQ0010") {
//         this.$router.push({
//           name: "travel-list-detail",
//           params: params
//         });
//       } else {
//         this.$router.push({
//           name: "list-detail",
//           params: params
//         });
//       }
//     },

//     /* 点击搜索时调用 */
//     goSearch () {
//       // this.searchReginHeight = this.getContentHeight();
//       // this.showPopup = true;
//       // this.isLoadingData = false;
//       // this.searchValue = ""; // 清空搜索框的内容
//       // this.approvalListBySearch = [];
//       // this.pageNumBySearch = 1;
//       // console.log("goSearch里面loadMoreFlag的值：" + this.loadMoreFlag);
//     },

//     /* 搜索时，上拉加载 */
//     loadMoreBySearch () {
//       if (this.totalPageBySearch !== 1) {
//         this.showSearchPullUp = false;
//         this.getSearchList(this);
//       }
//     },

//     cancelSearch () {
//       // // 取消搜索
//       // this.showPopup = false;
//       // this.searchValue = ""; // 清空搜索框的内容
//       // this.isLoadingData = false;
//       // this.pageNumBySearch = 1;
//       // this.approvalListBySearch = [];
//     },

//     initSearchPage () {
//   /*     this.approvalListBySearch = [];
//       this.pageNumBySearch = 1;
//       this.showSearchPullUp = false;
//       this.allowPullDown = false;
//       this.scroll_1 = this.$refs.wrapper1.scroll;
//       this.getSearchList(this); */
//     },

//     getSearchList () {
//       // let data_type = _this.getType();
//       // let params = {
//       //   data_type: data_type,
//       //   action: "query",
//       //   query_param: _this.searchValue,
//       //   encryption_key: window.localStorage.encryption_key,
//       //   // "user_id": _this.userId,
//       //   pagenum: _this.pageNum,
//       //   pagesize: _this.pageSize,
//       //   fetchall: "false"
//       // };
//       // Axios.post(params).then(data => {
//       //   if (data.success) {
//       //     this.totalPageBySearch = data.result.pageCount;
//       //     if (!_this.isNullData(data.result.record)) {
//       //       if (_this.pageNumBySearch < data.result.pageCount) {
//       //         console.log("这是第" + _this.pageNumBySearch + "页");
//       //         _this.$nextTick(() => {
//       //           _this.showSearchPullUp = true;
//       //           _this.$refs.wrapper1.donePullup();
//       //         });
//       //       } else {
//       //         _this.showSearchPullUp = false;
//       //       }
//       //       _this.pageNumBySearch++;
//       //       let _approvalList = _this.jsonArray(data.result.record); // 多条数据
//       //       for (let source of _approvalList) {
//       //         let itemDetail = _this.analyseData(source);
//       //         _this.approvalListBySearch.push(itemDetail);
//       //       }
//       //     } else {
//       //       _this.showSearchPullUp = false;
//       //     }
//       //     _this.$nextTick(() => {
//       //       if (!_this.scroll_1) {
//       //         _this.scroll_1 = new BScroll(_this.$refs.wrapper1, {});
//       //       } else {
//       //         _this.scroll_1.refresh();
//       //       }
//       //     });
//       //   } else {
//       //     this.showPrompt(this.$t("ERROR_INFO"), JSON.stringify(data.error.message));
//       //   }
//       // });
//     },

//     /* 实现延迟请求   用于响应搜索框有值时的操作 */
//     searchWorkflow: _.debounce(
//       function () {
//         this.initSearchPage();
//         this.pageNumBySearch = 1;
//         /* loadDataBySearch(this); */
//       },
//       400 // 等待用户停止输入后的时间（毫秒）
//     )
//   },
//   watch: {
//     searchValue: function (value) {
//       // 用于监听搜索框是否有值
//       if (value != "") {
//         this.searchWorkflow();
//       } else {
//         this.approvalListBySearch = [];
//         this.showSearchPullUp = false;
//       }
//     },

//   },
//   beforeRouteLeave: function (to, from, next) {
//     if (to.name == "mainpage" || this.goDetailPage) {
//       this.goDetailPage = false;
//       next();
//     } else {
//       this.closeWindow();
//     }
//   }
// };

// /**
//  * 用于计算蓝色横线的显示位置
//  * */
// function caculatePosition (index, totalNum) {
//   let total = 100;
//   let part = total / totalNum;
//   let partPercent = part * 0.6;

//   let left = (index - 1) * part + (part - partPercent) / 2;
//   let right = 100 - (left + partPercent);
//   return {
//     left: left,
//     right: right
//   };
// }
//
</script>

//
<style lang="scss" rel="stylesheet/scss" scoped>
// @import "../../assets/scss/_variables.scss";
// @import "../../assets/scss/list.scss";

// .list-header-item {
//   color: "#454545";
// }
// .currentTab {
//   color: #d21810;
// }

// //搜索弹出框里面的样式
// .popup1 {
//   width: 100%;
//   height: 100%;
//   /*background: #F1F6F9;*/
//   .search-workflow {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     width: 100%;
//     padding: 10px;
//     height: 35px;
//     border: none;
//     input {
//       -webkit-appearance: none;
//       -moz-appearance: none;
//       //appearance: none;
//       -webkit-appearance: none;
//       float: left;
//       text-align: left;
//       //display: inline-block;
//       border: 1px solid #e6ecf0;
//       box-sizing: border-box;
//       border-radius: 5px;
//       height: 35px;
//       padding: 4px 2vw;
//       color: #9f9f9f;
//       margin-bottom: 6px;
//       width: 82%;
//     }

//     .cancel-button {
//       height: 35px;
//       line-height: 35px;
//       width: 15%;
//       float: left;
//       text-align: center;
//       color: #666666;
//       font-size: 14px; //14
//     }
//   }
//   .search-workflow-content {
//     /*background: #F1F6F9;*/
//     position: absolute;
//     top: 55px;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     width: 100%;
//     overflow-y: hidden;
//     .wrapper {
//       width: 100%;
//       height: 100%;
//     }

//     .approval-list-item {
//       padding: 10px 10px;
//     }
//   }
// }
//
</style>
