<template>
  <ul id="tabDoneListWrap">
    <li v-for="(item, index) in doneListDataProps" :key="item.id" class="item">
      index:{{ index }}+id:{{ item.id }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    doneListDataProps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
#tabDoneListWrap {
  background-color: #f7f7f7;
  .item {
    width: 95%;
    height: 4rem;
    margin: 0.5rem auto;
    border: 0.1rem solid green;
    border-radius: 0.5rem;
    list-style: none;
    margin-top: 0.5rem;
    background: #fff;
    line-height: 4rem;
  }
}
</style>
