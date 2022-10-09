<template>
    <div>
        <Toast />
        <h1 class="title-brand">
            Cores
        </h1>

        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Cor</th>
                    <th>RGB</th>
                    <th>Status</th>
                    <th>Opção</th>
                </tr>
            </thead>
                <tr v-for="c in cores" :key="c.id">
                    <td>{{ c.id }}</td>
                    <td>{{ c.nome }}</td>
                    <td id="cor" :style="{'background-color': c.rgb, 'font-size': '10px' }"></td>
                    <td class="material-symbols-outlined">{{ ativo(c) }} </td>

                    <td @click="cor_id = c">
                        <SplitButton label="Novo" @click="novo()" icon="pi pi-plus" :model="items" href="javascript:void(0)">
                        </SplitButton>
                    </td>
                </tr>
                <ConfirmDialog @click="messageDialog(c)"></ConfirmDialog>


        </table>
        <div class="col-lg-12" >
            <button type="button" @click="novo()" class="btn btn-outline-primary">Nova marca</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SplitButton from 'primevue/splitbutton'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast';


export default {
    data() {
        return {
            //https://carros-app-example.herokuapp.com/carro
            cores: [],
            cor_id:null,
            opcao:null,
            items: [
                {
                    label: 'Editar',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.editar(this.cor_id)
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        this.messageDialog(this.cor_id)
                    }
                }
            ]

        }

    },
    mounted() {
        axios
            .get('https://carros-app-example.herokuapp.com/cor')
            .then(resp => this.cores = resp.data)
    },
    methods: {
        ativo(cor) {
            return cor.ativo == true ? 'thumb_up' : 'thumb_down_off'
        },
        editar(cor) {
            if (this.cor_id.id == 0 || this.cor_id == null) {
                return
            }
            this.$router.push(`/Cor-form/${cor.id}`)

        },
        novo() {
            this.cor_id = null
            this.$router.push('/Cor-form/')
        },
        excluir(cor) {
            const id = cor.id
            axios
                .delete(`https://carros-app-example.herokuapp.com/cor/${id}`)
                .then(this.load())
                .catch(error => alert(error))
        },
        load() {
            axios.get('https://carros-app-example.herokuapp.com/Cor')
                .then(resp => {
                    this.cores = resp.data
                })

        },
        toastMessage(item) {
            return this.opcao == 1
                ? this.$toast.add({ severity: 'warn', summary: 'Delete', detail: item + ' deletado com sucesso!!', life: 3000 })
                : this.$confirm.close();

        },
        messageDialog(cor) {
            this.$confirm.require({
                message: `Você deseja deletar ${cor.nome}?`,
                header: 'Confirmar exclusão!!!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel:'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.excluir(cor)
                    this.opcao =1,
                    this.$confirm.close();
                    this.toastMessage(cor.nome)
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
        ConfirmDialog,
        Toast
    }

}
</script>

<style>
#cor {
    border-radius: 50px;
}

.material-symbols-outlined {
    display: inline-block;
    margin-top:10px;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}
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