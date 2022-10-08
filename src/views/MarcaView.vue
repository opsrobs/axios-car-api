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
                
                <td @click="id_marca = m"> <SplitButton label="Novo" icon="pi pi-plus" :model="items" href="javascript:void(0)"></SplitButton></td>
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
            id_marca:0,
            items: [
				{
					label: 'Editar',
					icon: 'pi pi-refresh',
					command: () => {
                        this.editar(this.id_marca)
						this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
					}
				},
				{
					label: 'Delete',
					icon: 'pi pi-times',
					command: () => {
                        this.excluir(this.id_marca)
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
            if (this.id_marca == 0 || this.id_marca == null){
                return
            }
            this.$router.push(`/Marca-form/${marca.id}`)

        },
        novo() {
            this.id_marca = null
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
