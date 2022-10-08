<template>
  <TabMenu :model="items" />
  <router-view />
</template>
<script>
import TabMenu from 'primevue/tabmenu'

export default({
  data(){
    return {
      items: [
                {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
                {label: 'About', icon: 'pi pi-fw pi-calendar', to: '/about'},
                {label: 'Marcas', icon: 'pi pi-fw pi-pencil', to:'/Marca'},
                {label: 'Carros', icon: 'pi pi-fw pi-file', to:'/Carro'},
                {label: 'Cores', icon: 'pi pi-fw pi-cog', to:'/Cor'}
            ]
  }
},
components: {
    TabMenu 
  }
})
</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  nav {
    padding: 30px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  nav a.router-link-exact-active {
    color: #42b983;
  }
  </style>
