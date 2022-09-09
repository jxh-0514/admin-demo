<template>
  <div>
    <transferTable
      v-model="value"
      :dataList="list"
      :columns="columns"
      keyName="id"
      @change="change"
    ></transferTable>
  </div>
</template>

<script>
import transferTable from "./components/tableTransfer";
export default {
  components: {
    transferTable,
  },
  data() {
    return {
      list: [
        {
          id: "1",
          name: "张三",
          age: "sex",
          sex: "男",
        },
        {
          id: "2",
          name: "李四",
          age: "sex",
          sex: "男",
        },
        {
          id: "3",
          name: "王二",
          age: "sex",
          sex: "男",
        },
      ],
      columns: [
        {
          key: "id",
          label: "id",
          visible: false,
        },
        {
          key: "name",
          label: "姓名",
          visible: true,
        },
        {
          key: "age",
          label: "年龄",
          visible: true,
        },
        {
          key: "sex",
          label: "性别",
          visible: true,
        },
      ],
      value: ["1", "2"],
    };
  },

  methods: {
    change(val) {
      console.log(val);
      console.log(this.value);
    },
  },
};
</script>
