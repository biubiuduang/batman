<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p v-if="userName">{{userName}}</p>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import store from "@/store";

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  userName = "";

  created() {
    store.dispatch("fetchUser").then(data => {
      this["userName"] = data.username;
    });
  }
}
</script>
