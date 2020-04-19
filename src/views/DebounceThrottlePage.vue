<template>
  <div id="pageContainer">
    <div id="PageTitle">
      手机不支持mousemove事件
    </div>
    <div id="pageBody">
      <div id="debounceModule">
        <div class="effectModule" id="debounce" @mousemove="mousemoveNotDebounce">
          未防抖效果{{ countNotDebounce }}
        </div>

        <div class="effectModule" id="debounce" @mousemove="mousemoveHadDebounce">
          <p class="info">
            防抖：不管触发多少次，都会在设置的事件后再执行函数；若在此期间再次触发，则清除定时器，等到设置的时间再触发
          </p>
          已防抖效果{{ countHadDebounce }}
        </div>
      </div>

      <div id="throttleModule">
        <div class="effectModule" id="throttle" @mousemove="mousemoveNotThrottle">
          未节流效果{{ countNotThrottle }}
        </div>
        <div class="effectModule" id="throttle" @mousemove="mousemoveHadThrottle">
          <p class="info">
            节流：不管触发多少次，都只会在设定的时间内仅执行一次
          </p>
          已节流效果{{ countHadThrottle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from "@/utils";

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      countNotDebounce: 0,
      countHadDebounce: 0,
      countNotThrottle: 0,
      countHadThrottle: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    mousemoveNotDebounce: function() {
      console.log(this.count);
      this.countNotDebounce = this.countNotDebounce + 1;
    },
    mousemoveHadDebounce: debounce(function() {
      console.log(this.count);
      this.countHadDebounce = this.countHadDebounce + 1;
    }, 1000),
    mousemoveNotThrottle: function() {
      this.countNotThrottle = this.countNotThrottle + 1;
    },
    mousemoveHadThrottle: throttle(function() {
      this.countHadThrottle = this.countHadThrottle + 1;
    })
  }
};
</script>

<style scoped lang="scss">
#pageContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  #PageTitle {
    margin-bottom: 300px;
  }
  #pageBody {
    display: flex;
    flex-direction: row;

    .effectModule {
      width: 300px;
      height: 300px;
      color: #fff;
      font-size: 30px;
      border: 1px #ccc solid;
      border-radius: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .info {
        color: #000;
        font-size: 20px;
      }
    }
    #debounce {
      background-color: green;
    }
    #throttle {
      background-color: red;
    }
  }
}
</style>
