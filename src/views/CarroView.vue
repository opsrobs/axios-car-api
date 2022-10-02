<template>
    <div>
        <h1>Carro</h1>

        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Ano Fabricação</th>
                <th>Ano Modelo</th>
                <th>Preco</th>
            </tr>
            <tr v-for="c in carros" :key="c.id">
                <td>{{ c.id }}</td>
                <td>{{ c.nome }}</td>
                <td>{{ c.anoFabricacao }}</td>
                <td>{{ c.anoModelo }}</td>
                <td>{{ c.preco }}</td>
                <td> <a href="javascript:void(0)" @click="editar(c)">Editar</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            //https://carros-app-example.herokuapp.com/carro
            carros: []
        }

    },
    mounted() {
        axios
            .get('https://carros-app-example.herokuapp.com/carro')
            .then(resp => this.carros = resp.data)
    },
    methods: {
        editar(carro){
            this.$router.push(`/carro-form/${carro.id}`)

        }
    }

}
</script>