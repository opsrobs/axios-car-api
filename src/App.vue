<template>
<Button @click="active = 0" class="p-button-text" label="Activate 1st" />
<Button @click="active = 1" class="p-button-text" label="Activate 2nd" />
<Button @click="active = 2" class="p-button-text" label="Activate 3rd" />

<TabView v-model="active">
    <TabPanel header="Header I">
        Content I
    </TabPanel>
    <TabPanel header="Header II">
        Content II
    </TabPanel>
    <TabPanel header="Header III">
        Content III
    </TabPanel>
</TabView>

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/Marca">Marcas</router-link> |
    <router-link to="/Carro">Carros</router-link> |
    <router-link to="/Cor">Cores</router-link>

  </nav>
  <router-view />
</template>
<script>

export default({
  data(){
    return {
    active : 0
  }
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
