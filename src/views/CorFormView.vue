<template>
    <div>
        <h1>Cores</h1><br />
        <Toast />
    </div>
    <div>
        <form @submit.prevent="salvar()">
            <div class="first-class" id="first-id">
                <div class="p-fluid grid">
                    <span class="p-float-label">
                        <InputText id="nome" type="text" size="20" required v-model="cor.nome" />
                        <label for="username">Nome da cor</label>
                    </span>
                    <br />
                    <br />
                    <div class="p-fluid grid">
                        <span class="p-float-label">
                            <InputText id="nome" type="text" size="20" required v-model="cor.rgb" />
                            <label for="username">RGB da cor</label>
                            <ColorPicker id="color-picker" :inline="false" v-model="cor.rgb" />
                        </span>
                    </div>
                    <br />
                    <br />
                    <div class="p-fluid grid">
                        <span class="p-float-label">
                            <InputText id="nome" type="text" size="20" required v-model="cor.ativo" />
                            <label for="username">Status</label>
                            <Checkbox v-model="cor.ativo" :binary="true" />
                            <br />
                            <br />
                        </span>
                    </div>
                    <input class="p-button-text zoom" type="submit" value="Salvar">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker';

export default {
    data() {
        return {
            cor: {
                id: null,
                nome: '',
                rgb: '',
                ativo: false
            },
        }
    },
    mounted() {
        const id = this.$route.params.id

        if (id) {
            axios.get(
                `https://carros-app-example.herokuapp.com/cor/${id}`)
                .then(resp => this.cor = resp.data)
                .catch(error => {
                    alert(error)
                    this.$router.push("/carro")
                })

        }
        console.log(this.$route.params.id);
    },
    methods: {
        voltar() {
            this.$router.go(-1)
        },
        salvar() {
            axios.post('https://carros-app-example.herokuapp.com/cor/',
                this.cor)
                .then(() => this.mensagem = 'Registro gravado')
                .catch(() => this.value = 1),
                this.$toast.add({ severity: 'success', summary: 'Registro gravado', detail: 'Registro gravados com sucesso', life: 3000 })
        }
    },
    components: {
        Checkbox,
        Toast,
        InputText,
        ColorPicker
    }


}
</script>

<style>
.first-class {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%
}

.p-button-text {}

.zoom {
    background-color: rgb(45, 177, 230);
    transition: transform .2s;
    width: 60%;
    height: 30px;
    border: none;
    margin: 0 auto;
    border-radius: 80px;

}

.zoom:hover {
    transform: scale(1.2);
}

#color-picker {
    margin-top: 1rem;
}
</style>
