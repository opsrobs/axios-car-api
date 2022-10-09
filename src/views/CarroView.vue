<template>
    <div>
        <h1 class="title-brand">Carros</h1>

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
                <td @click="carro = c">
                <ConfirmDialog @click="messageDialog(c)"></ConfirmDialog>

                <SplitButton label="Novo" icon="pi pi-plus" :model="items" href="javascript:void(0)">
                </SplitButton>
                </td>

            </tr>
        </table>
        
        <div class="col-lg-12" >
            <button type="button" @click="novo()" class="btn btn-outline-primary">Nova marca</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SplitButton from 'primevue/splitbutton'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
    data() {
        return {
            //https://carros-app-example.herokuapp.com/carro
            carros: [],
            carro:null,
            items: [
                {
                    label: 'Editar',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.editar(this.carro)
                        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        this.messageDialog(this.carro)
                        this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
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
        }

    },
    mounted() {
        axios
            .get('https://carros-app-example.herokuapp.com/carro')
            .then(resp => this.carros = resp.data)
    },
    
    methods: {
        editar(carros) {
            this.$router.push(`/carro-form/${carros.id}`)

        },excluir(carros) {
            const id = carros.id
            axios
            .delete(`https://carros-app-example.herokuapp.com/carro/${id}`)
            .then(this.load())
            .catch(error => alert(error))
        },
        load(){
            axios.get()
            .then( resp => {
                this.carros = resp.data
            })
            window.location.reload();
        },
        messageDialog(car) {
            this.$confirm.require({
                message: `Você deseja deletar ${car.nome}?`,
                header: 'Confirmar exclusão!!!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel:'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.excluir(car)
                    this.$confirm.close();
                    this.load()
                },
                reject: () => {
                    this.load()
                    this.$confirm.close()

                },
                onHide: () => {
                    this.load()
                    this.$confirm.close()
                }
            })
        }
    },
    components: {
        SplitButton,
        ConfirmDialog
    }

}
</script>

<style>
.col-lg-12 {
    text-align: right;
    padding: 10px;
    margin-right: 20px;
}
.title-brand{
    margin-top: 15px;
    margin-bottom: 25px;

    font-family: 'Bitter', serif;
    font-size: 40px;
    font-weight: bold;
}
</style>