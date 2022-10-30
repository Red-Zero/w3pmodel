

<template>
  <Header></Header>

  <RouterView />
</template>
<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent } from "vue";
import Header from './components/header.vue'

export default defineComponent({
  name: "App",
  components: {Header},
});
</script>

<style scoped>

</style>
