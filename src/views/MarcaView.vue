<template>
    <div>
        <Toast />
        <h1 class="title-brand">
            Marcas
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Iendificador</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Opção</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="m in marcas" :key="m.id">
                    <td>{{ m.id }}</td>
                    <td>{{ m.nome }}</td>
                    <td @click="id_marca = m">
                        <SplitButton label="Novo" @click="novo()" icon="pi pi-plus" :model="items"
                            href="javascript:void(0)">

                        </SplitButton>
                    </td>
                </tr>
                <ConfirmDialog @click="messageDialog(m)"></ConfirmDialog>

            </tbody>

        </table>
        <div class="col-lg-12">
            <button type="button" @click="novo()" class="btn btn-outline-primary">Nova marca</button>
        </div>
    </div>


</template>

<script>
import axios from 'axios';
import SplitButton from 'primevue/splitbutton'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast';






export default {
    data() {
        return {
            marcas: [],
            id_marca: 0,
            opcao: null,

            items: [
                {
                    label: 'Editar',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.editar(this.id_marca)
                        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        this.messageDialog(this.id_marca)


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
            if (this.id_marca == 0 || this.id_marca == null) {
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
        load() {
            axios.get('https://carros-app-example.herokuapp.com/marca')
                .then(resp => {
                    this.marcas = resp.data
                })

            //window.location.reload();


        },
        toastMessage(item) {
            return this.opcao == 1
                ? this.$toast.add({ severity: 'warn', summary: 'Delete', detail: item + ' deletado com sucesso!!', life: 3000 })
                : this.$confirm.close();

        },
        messageDialog(marca) {
            this.$confirm.require({
                message: `Você deseja deletar ${marca.nome}?`,
                header: 'Confirmar exclusão!!!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.excluir(marca)
                    this.opcao = 1
                    this.toastMessage(marca.nome)
                    this.$confirm.close();
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
