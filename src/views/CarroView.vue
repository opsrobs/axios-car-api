<template>
    <div>
        <h1>Carro</h1>

        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Placa</th>
            </tr>
            <tr v-for="c in carros" :key="c.id">
                <td>{{ c.id }}</td>
                <td>{{ c.nome }}</td>
                <td>{{ c.placa }}</td>
                <td> <a href="javascript:void(0)" @click="editar(c)">Editar</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //https://carros-app-example.herokuapp.com/carro
            carros: [
                {
                    id: 0,
                    nome: 'hb20',
                    placa:'xpt-0123'
                },
                {
                    id: 1,
                    nome: 'fusion',
                    placa:'xyz-9375'
                }
            ]
        }

    },
    methods: {
        editar(carro){
            this.$router.push(`/carro-form/${carro.id}`)

        }
    }

}
</script>