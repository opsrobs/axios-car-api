<template>
    <div>
        <Toast />

        <h1 class="title-brand">Carros</h1>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ano Fabricação</th>
                    <th scope="col">Ano Modelo</th>
                    <th scope="col">Preco</th>
                    <th scope="col">Opção</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="c in carros" :key="c.id">
                    <td>{{ c.id }}</td>
                    <td>{{ c.nome }}</td>
                    <td>{{ c.anoFabricacao }}</td>
                    <td>{{ c.anoModelo }}</td>
                    <td>{{ c.preco }}</td>
                    <td @click="carro = c">
                        <SplitButton label="Novo" @click="novo()" icon="pi pi-plus" :model="items"
                            href="javascript:void(0)">
                        </SplitButton>
                    </td>
                </tr>
                <ConfirmDialog @click="messageDialog(c)" defaultFocus="reject">
                </ConfirmDialog>

            </tbody>
        </table>

        <div class="col-lg-12">
            <button type="button" @click="novo()" class="btn btn-outline-primary">Nova marca</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SplitButton from 'primevue/splitbutton'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
export default {
    data() {
        return {
            //https://carros-app-example.herokuapp.com/carro
            carros: [],
            carro: null,
            opcao: null,
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

        }, excluir(carro) {
            const id = carro.id

            axios
                .delete(`https://carros-app-example.herokuapp.com/carro/555`)
                .then(this.load())
                .catch(error => alert(error))
            // .delete(`https://carros-app-example.herokuapp.com/carro/${id}`)

            // .catch(error => this.mensagem = `Problema na gravação ${error}`)

            console.log(id)
        },
        novo() {
            this.carro = null
            this.$router.push('/carro-form/')
        },
        load() {
            axios.get('https://carros-app-example.herokuapp.com/carro')
                .then(resp => {
                    this.carros = resp.data
                })
            //this.toastMessage()

            //window.location.reload();
        },
        toastMessage(item) {
            return this.opcao == 1
                ? this.$toast.add({ severity: 'warn', summary: 'Delete', detail: item + ' deletado com sucesso!!', life: 3000 })
                : this.$confirm.close();

        },
        messageDialog(car) {
            return car != null ? this.$confirm.require({
                message: `Você deseja deletar ${car.nome}?`,
                header: 'Confirmar exclusão!!!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.excluir(car)
                    this.opcao = 1
                    this.toastMessage(car.nome)
                    this.$confirm.close();
                    //this.load()
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
                : this.$confirm.close()
        }
    },
    components: {
        SplitButton,
        ConfirmDialog,
        Toast
    }

}
</script>

<style>
.col-lg-12 {
    text-align: right;
    padding: 10px;
    margin-right: 20px;
}

.title-brand {
    margin-top: 15px;
    margin-bottom: 25px;

    font-family: 'Bitter', serif;
    font-size: 40px;
    font-weight: bold;
}
</style>