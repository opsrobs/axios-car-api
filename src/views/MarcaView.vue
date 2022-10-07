<template>
    <div>Marca

        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
            </tr>
            <tr v-for="m in marcas" :key="m.id">
                <td>{{ m.id }}</td>
                <td>{{ m.nome }}</td>
                <td> <a href="javascript:void(0)" @click="editar(m)">Editar</a></td>
                <td> <a href="javascript:void(0)" @click="excluir(m)">Excluir</a></td>
            </tr>
        </table>
    </div>


</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            marcas: [],
            //URL_marcas:'https://carros-app-example.herokuapp.com/marca'
        }

    }, mounted() {
        axios
            .get('https://carros-app-example.herokuapp.com/marca')
            .then(resp => this.marcas = resp.data)
    },
    methods: {
        editar(marca) {
            this.$router.push(`/Marca-form/${marca.id}`)

        },
        excluir(marca) {
            const id = marca.id
            axios
            .delete(`https://carros-app-example.herokuapp.com/marca/${id}`)
            .then(this.load())
            .catch(error => alert(error))
        },
        load(){
            axios.get()
            .then( resp => {
                this.marcas = resp.data
            })
        }


    }

}
</script>
