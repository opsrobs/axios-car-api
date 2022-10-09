<template>
    <div>
        <Toast />
        <h1>Marcas</h1>
        <form @submit.prevent="salvar()">
            <div class="first-class" id="first-id">
                <div class="p-fluid grid">
                    <span class="p-float-label">
                        <InputText id="nome" type="text" size="20" required v-model="marca.nome" />
                        <label for="username">Nome do Veiculo</label>
                    </span>
                    <br />
                    <input class="p-button-text zoom" type="submit" value="Salvar">
                    <br />
                    <br />
                </div>
            </div>

        </form>
    </div>
</template>

<script>

import axios from 'axios'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'


export default {
    data() {
        return {
            marca: {
                nome: ''
            },
            mensagem: null
        }
    },
    mounted() {
        const id = this.$route.params.id
        if (id) {
            axios.get(
                `https://carros-app-example.herokuapp.com/marca/${id}`)
                .then(resp => this.marca = resp.data)
                .catch(error => {
                    alert(error)
                    this.$router.push("/marca")
                })
        }
        else {
            this.marca = {
                id: null,
                nome: ''
            }
        }
    },
    methods: {
        voltar() {
            this.$router.go(-1)
        },
        salvar() {
            axios.post('https://carros-app-example.herokuapp.com/marca/',
                this.marca)
                .then(() => this.mensagem = 'Registro gravado')
                .catch(error => this.mensagem = `Problema na gravação ${error}`)
                this.$toast.add({ severity: 'success', summary: 'Registro gravado', life: 3000 })

        }
    },
    components: {
        InputText,
        Toast

    }


}
</script>

<style>

.first-class {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%
}

.zoom {
  background-color: rgb(45, 177, 230);
  transition: transform .2s; 
  width: 60%;
  height: 30px;
  border:none;
  border-radius:20px;
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>