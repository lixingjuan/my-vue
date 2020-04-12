<template>
  <ul id="tabTodoListWrap">
    <li v-for="(item, index) in todoListDataProps" :key="item.id" class="item">
      index:{{ index }}+id:{{ item.id }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    todoListDataProps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // todoListDataProps: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
#tabTodoListWrap {
  background-color: #f7f7f7;
  .item {
    width: 95%;
    height: 4rem;
    margin: 0.5rem auto;
    border: 0.1rem solid red;
    border-radius: 0.5rem;
    list-style: none;
    margin-top: 0.5rem;
    background: #fff;
    line-height: 4rem;
  }
}
</style>
