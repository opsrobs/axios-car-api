<template>
    <div>
        <h1>
            Marca
        </h1>
        <button @click="novo()">Novo</button>

        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
            </tr>
            <tr v-for="m in marcas" :key="m.id">
                <td>{{ m.id }}</td>
                <td>{{ m.nome }}</td>
                <SplitButton label="BALA DA GIULIA" icon="pi pi-plus" :model="items"></SplitButton>
                <td> <a href="javascript:void(0)" @click="editar(m)">Editar</a></td>
                <td> <a href="javascript:void(0)" @click="excluir(m)">Excluir</a></td>
            </tr>
        </table>
    </div>


</template>

<script>
import axios from 'axios';
import SplitButton from 'primevue/splitbutton';


export default {
    data() {
        return {
            marcas: [],
            items: [
				{
					label: 'Update',
					icon: 'pi pi-refresh',
					command: () => {
						this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
					}
				},
				{
					label: 'Delete',
					icon: 'pi pi-times',
					command: () => {
						this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
					}
				},
				{
					label: 'Vue Website',
					icon: 'pi pi-external-link',
					command: () => {
						window.location.href = 'https://vuejs.org/'
					}
				}
			]
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
        novo() {
            this.$router.push('/Marca-form/')
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


    },
    components:{
        SplitButton
    }

}
</script>
