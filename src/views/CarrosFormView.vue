<template>
    <div>
        <h1>
            x
            <Toast />
        </h1>
    </div>
    <div>
        <form @submit.prevent="salvar()">
            <div class="first-class" id="first-id">
                <div class="p-fluid grid">
                    <span v-if="mensagem">{{mensagem}}<br /></span>
                    <span class="p-float-label">
                        <InputText id="nome" type="text" size="20" required v-model="carro.nome" />
                        <label for="username">Nome do Veiculo</label>
                    </span>
                    <br />
                    <br />
                    <span class="p-float-label">
                        <InputText id="data" type="number" size="20" required v-model="carro.anoFabricacao" />
                        <label for="username">Ano de Fabricação</label>
                    </span>
                    <br />
                    <br />
                    <span class="p-float-label">
                        <InputText id="data" type="number" size="20" required v-model="carro.anoModelo" />
                        <label for="username">Ano modelo</label>
                    </span>
                    <br />
                    <br />
                    <span class="p-float-label">
                        <InputText id="data" type="number" size="20" required v-model="carro.preco" />
                        <label for="username">Preço</label>
                    </span>
                    <br />
                    <br />
                    <input type="submit" value="Salvar">
                    <Toast/>

                </div>
            </div>


        </form>
        <div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast';




export default {
    props: {

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
            value: Date.now(),
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
                }),
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted', life: 3000 });

        }
        console.log(this.$route.params.id);
    },
    methods: {
        voltar() {
            this.$router.go(-1)
        },
        salvar() {
            axios.post('https://carros-app-example.herokuapp.com/carro/',
                this.carro)
                .then(() => this.mensagem = 'Registro gravado')
                .catch(error => this.mensagem`Problema na gravação ${error}`)

                this.$toast.add({severity:'success', summary: 'Default Message'})

        },
        teste() {
            this.$bvToast.toast(`teste teste`, {
                title: 'oloco',
                autoHideDelay: 5000
            })
        }

    },
    components: {
        InputText,
        Toast
    }


}
</script>

<style scoped>

.first-class{
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%
}

</style>
