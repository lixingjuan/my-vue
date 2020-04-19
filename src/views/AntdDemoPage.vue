<template>
  <div>
    <div>
      <h1>Message</h1>
      <a-button @click="success">Success</a-button>
      <a-button @click="error">Error</a-button>
      <a-button @click="warning">Warning</a-button>
    </div>
    <div>
      <h1>Notification</h1>
      <a-button type="primary" @click="openNotification('topRight')"
        >Open the notification box</a-button
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    success() {
      console.log(this);
      console.log(this.message);
      this.$message.success("This is a success message");
    },
    error() {
      this.$message.error("This is an error message");
    },
    warning() {
      this.$message.warning("This is a warning message");
    },
    openNotification() {
      this.$notification.open({
        message: "Notification Title",
        // placement,
        description: "哈喽！",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    }
  }
};
</script>
