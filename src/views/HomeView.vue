<template>
  <div class="home">
    <router-view />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  data(){
    return {
      
  }
},
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
