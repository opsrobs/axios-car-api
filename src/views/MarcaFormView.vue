<template>
    <div>
        <form @submit.prevent="salvar()">
            <span v-if="mensagem">{{mensagem}}<br /></span>
            <label for="nome">Nome:</label>
            <input type="text" size="40" required v-model="marca.nome" />
            <br />
            <input type="submit" value="Salvar" />
            <a href="javascript:void(0)" @click="voltar()">Voltar</a>
            <p> {{ $route.params.id }}</p>
            <br />
            <p><button @click="voltar()">Voltar</button></p>

        </form>
    </div>
</template>

<script>
    
import axios from 'axios'
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
        console.log(this.$route.params.id);
    },
    methods: {
        voltar() {
            this.$router.go(-1)
        },
        salvar(){
            axios.post('https://carros-app-example.herokuapp.com/marca/',
            this.marca)
            .then(() => this.mensagem = 'Registro gravado')
            .catch(error => this.mensagem `Problema na gravação ${error}`)
        }
    }


}
</script>