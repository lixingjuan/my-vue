<template>
  <div class="big_box">
    <!--顶部背景图片-->
    <div class="back_box">
      <!--顶部导航-->
      <van-nav-bar title="出租率收款情况统计" left-arrow @click-left="tbClickLeft" />
    </div>
    <!--中间数据部分-->
    <div class="tabs_wrap">
      <van-tabs v-model="currentTab">
        <van-tab title="出租率" name="rate">
          <!-- <tab-item :tabWrapProps="{ listDataProps, histogramDataProps }" /> -->
          <rate-report
            @queryParamChange="queryData"
            :tabWrapProps="{ listDataProps, histogramDataProps }"
          />
        </van-tab>
        <van-tab title="收款" name="collection">
          <!-- <tab-item :tabWrapProps="{ listDataProps, histogramDataProps }" /> -->
          <collection-report
            @queryParamChange="queryData"
            :tabWrapProps="{ listDataProps, histogramDataProps }"
          />
        </van-tab>
        <van-tab title="商家" name="business">
          <!-- <tab-item :tabWrapProps="{ listDataProps, histogramDataProps }" /> -->
          <business-report
            @queryParamChange="queryData"
            :tabWrapProps="{ listDataProps, histogramDataProps }"
          />
        </van-tab>
      </van-tabs>
      <!-- <div class="tab_tile">
      <div class="span1" @click="setCurrentTab('rate')">出租率</div>
      <div class="span2" @click="setCurrentTab('Collection')">收款</div>
      <div class="span3" @click="setCurrentTab('Business')">商家</div>
    </div>

    <tab-wrap :tabWrapProps="{ listDataProps, histogramDataProps }" /> -->
    </div>
  </div>
</template>

<script>
import RateReport from "@/components/RentalReport/RateReport.vue";
import BusinessReport from "@/components/RentalReport/BusinessReport.vue";
import CollectionReport from "@/components/RentalReport/CollectionReport.vue";

// import { formatDate } from "@/request/comReq";
import { collectionReportapi } from "@/request/api";

export default {
  name: "",
  components: {
    RateReport,
    BusinessReport,
    CollectionReport
  },
  props: {},
  watch: {},

  data() {
    return {
      currentTab: "business",
      listDataProps: [
        {
          id: 1,
          czl: "98.9",
          dz: "全国",
          sk: "4584",
          sj: "458"
        },
        {
          id: 2,
          czl: "34.9",
          dz: "成都",
          sk: "484",
          sj: "48"
        },
        {
          id: 3,
          czl: "54",
          dz: "上海",
          sk: "84",
          sj: "41"
        },
        {
          id: 4,
          czl: "85.5",
          dz: "天津",
          sk: "785",
          sj: "458"
        },
        {
          id: 5,
          czl: "65",
          dz: "青岛",
          sk: "48",
          sj: "14"
        },
        {
          id: 6,
          czl: "65",
          dz: "青岛",
          sk: "48",
          sj: "14"
        }
      ],
      histogramDataProps: {
        title: {
          text: "", // 图标标题
          textStyle: {
            // 主标题文本样式
            fontSize: 14,
            color: "#ccc"
          }
        },
        tooltip: {},
        legend: {
          textStyle: {
            // 图例文字的样式
            color: "#ccc",
            fontSize: 14
          },
          data: ["收款金额", "出租率"] // 图例
        },
        xAxis: {
          data: ["成都", "重庆", "青岛", "天津", "上海"]
        },
        yAxis: [
          {
            type: "value",
            name: "收款金额（万元）",
            min: 0,
            max: 2500,
            interval: 500,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ccc"
              }
            }
          },
          {
            type: "value",
            name: "出租率（%）",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value} %",
              textStyle: {
                color: "#ccc"
              }
            }
          }
        ],
        series: [
          {
            name: "收款金额",
            type: "bar",
            data: [500, 800, 860, 900, 500]
          },
          {
            name: "出租率",
            type: "line", // 图形类型
            yAxisIndex: 1, // 这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            data: [40, 60, 80, 90, 50]
          }
        ]
      }
    };
  },
  created() {
    // TODO: 从路由获取对应数据参数参数并发起请求
    // this.queryData();
  },
  methods: {
    async queryData(queryParams) {
      console.log("来自子组件的参数", queryParams);
      const params = {
        companyId: "10358"
        // queryDateStart: formatDate(new Date()),
        // queryDateEnd: formatDate(new Date()),
        // dateType: "mon"
      };
      const res = await collectionReportapi(params);
      console.log(res);
    },
    setCurrentTab() {},
    // 返回
    tbClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.big_box {
  height: 122vh;
  background-color: #f8f8f8;
  // position: relative;
  margin: 0 auto;
  width: 100%;
}

/*顶部导航*/
.back_box {
  height: 3.4rem;
  background-image: url(/bg-移动报表-首页@3x.png);
  .van-nav-bar {
    height: 1.4375rem;
    line-height: 1.4375rem;
    background-color: rgba(255, 255, 255, 0);
  }
  .van-nav-bar__left {
    left: 0.46875rem;
  }
  .van-nav-bar__left,
  .van-nav-bar__right {
    font-size: 0.5625rem;
  }
  .van-nav-bar__arrow {
    font-size: 0.5625rem;
  }
  .van-nav-bar__title {
    font-size: 0.5rem;
    color: white;
  }
  .van-nav-bar__right {
    right: 0.46875rem;
  }
  /*导航栏更改*/
  [class*="van-hairline"]::after {
    border: 0px solid transparent;
  }
  .van-nav-bar .van-icon {
    color: white;
  }
}
.van-tabs__wrap {
  margin: -2rem auto 0.2rem auto;
  height: 1rem;
  background-color: transparent;
  .van-tabs__nav {
    background-color: transparent;
    .van-tab {
      font-size: 0.4rem;
      color: #ffffff;
      line-height: 1rem;
    }
  }
}
// .van-tab--active {
//   background-color: transparent !important;
//   color: red;
// }
// .van-tab--primary {
//   color: red;
// }
/* tab_title */
// .tab_tile {
//   width: 90%;
//   display: flex;
//   justify-content: space-around;
//   margin: -1.8rem auto 0.4rem auto;
//   font-size: 0.4rem;
//   color: #ffffff;
// }
</style>

<style lang="scss">
.tabs_wrap {
  .van-tabs__wrap {
    margin: -2rem auto 0.2rem auto;
    height: 1rem;
    background-color: transparent;
    .van-tabs__nav {
      background-color: transparent;
      .van-tab {
        font-size: 0.4rem;
        color: #ffffff;
        line-height: 1rem;
      }
    }
  }
  [class*="van-hairline"]::after {
    border: 0 solid transparent;
  }
}
</style>
