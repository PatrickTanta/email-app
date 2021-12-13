<template>
  <div class="loader"></div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style scoped>
.loader {
  margin: auto;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #1d2021;
  border-right: 5px solid #1d2021;
  border-bottom: 5px solid #7c6f64;
  border-left: 5px solid #7c6f64;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
