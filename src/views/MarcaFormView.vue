<template>
    <div>
        <h1>Marcas</h1>
        <form @submit.prevent="salvar()">
            <div class="first-class" id="first-id">
                <div class="p-fluid grid">
                    <span v-if="mensagem">{{mensagem}}<br /></span>
                    <span class="p-float-label">
                        <InputText id="nome" type="text" size="20" required v-model="marca.nome" />
                        <label for="username">Nome do Veiculo</label>
                    </span>
                    <br />
                    <input type="submit" value="Salvar" />
                    <br />
                    <a href="javascript:void(0)" @click="voltar()">Voltar</a>
                    <br />
                </div>
            </div>

        </form>
    </div>
</template>

<script>

import axios from 'axios'
import InputText from 'primevue/inputtext'

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
        }
    },
    components: {
        InputText
    }


}
</script>

<style>
.first-class{
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  border: solid 1px red
}
</style>