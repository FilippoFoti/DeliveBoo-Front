<script>
import axios from "axios";

export default {
  data() {
    return {
      clientToken: [],
    };
  },

  mounted() {
    axios.get("http://localhost:8000/api/generate_token").then((resp) => {
      this.clientToken = resp.data.token;
      console.log(this.clientToken);
    });
  }
};
</script>

<template>
  
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;
</style>
