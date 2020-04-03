<template>
  <div>
    <li v-for="(item, index) in isOrNotDone" :key="index">{{ item.todo_text }}</li>
    {{ doneOrNot }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  components: {},
  props: {
    doneOrNot: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listData: []
    };
  },
  computed: {
    ...mapState({
      // listData: this.$store.state.moduleTodo.listData,
      allListData: state => state.moduleTodo.listData
    }),
    isOrNotDone() {
      return this.$store.getters.isorNotDoneTodos(this.doneOrNot);
    }
    // ...mapGetters({
    //   listData: "isorNotDoneTodos"("0")

    //   // else if (this.doneOrNot === "notDone") {
    //   //   console.log("notDone");
    //   //   this.listData = this.notDoneListData;
    //   // } else {
    //   //   console.log("all");
    //   //   this.listData = this.allListData;
    //   // }
    //   /*    isDoneListData: "isDoneTodos",
    //   notDoneListData: "notDoneTodos" */
    // })
  },
  watch: {},
  mounted() {
    this.listData = this.isDoneListData;
    // console.log(this.isDoneListData);
    // // if (this.doneOrNot === "done") {
    // //   console.log("done");
    // //   this.listData = this.isdoneListData;
    // // } else if (this.doneOrNot === "notDone") {
    // //   console.log("notDone");
    // //   this.listData = this.notDoneListData;
    // // } else {
    // //   console.log("all");
    // //   this.listData = this.allListData;
    // // }
    // console.log(this.isdoneListData);
    // console.log(this.listData);
  },
  methods: {}
};
</script>

<style scoped></style>
