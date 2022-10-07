<template>
    <div>

        <form @submit.prevent="salvar()">
            <span v-if="mensagem">{{mensagem}}<br /></span>
            <label for="nome">Nome:</label>
            <input type="text" size="40" required v-model="carro.nome" /><br/>
            <label for="Ano_fabricacao">Ano de Fabricação:</label>
            <input type="number" size="40" required v-model="carro.anoFabricacao" /><br/>
            <label for="Ano_modelo">Ano do modelo:</label>
            <input type="number" size="40" required v-model="carro.anoModelo" /><br/>
            <label for="preco">Preço:</label>
            <input type="number" size="40" required v-model="carro.preco" />
            <br />
            <br />
            <input type="submit" value="Salvar" />
            <a href="javascript:void(0)" @click="voltar()">Voltar</a>
            <p> {{ $route.params.id }}</p>
            <br />
            <p><button @click="voltar()">Voltar</button></p>
            <p><button @click="atualizar()">atualizar</button></p>

        </form>
       
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{

},
    data() {
        return {
            //https://carros-app-example.herokuapp.com/carro
            carro: {
                nome: '',
                anoFabricacao: '',
                anoModelo: '',
                preco: null
            },
            mensagem: null
        }

    },
    mounted() {
        const id = this.$route.params.id
        if (id) {
            axios.get(
                `https://carros-app-example.herokuapp.com/carro/${id}`)
                .then(resp => this.carro = resp.data)
                .catch(error => {
                    alert(error)
                    this.$router.push("/carro")
                })
        }
        console.log(this.$route.params.id);
    },
    methods: {
        voltar() {
            this.$router.go(-1)
        },
        atualizar(carros){
            const id = carros.id
            
            axios.put(`https://carros-app-example.herokuapp.com/carro/${id}`,carros
            )
            alert(carros)
        }
        
    }


}
</script>
