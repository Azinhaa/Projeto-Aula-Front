
const express = require ('express')
const cors= require('cors')
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
app.use(cors())

//GET http://localhost:3000/oii
app.get('/oii', (req, res) => {
    //manda mensagem de tezxto(retorna)
    res.send('oii')
})

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

// variaveis
// const = constsnte
// var -> nao pode ser usada fora de contexto
// let - uso fora de contexto

// let filmes=[
//     {
//         titulo: "Dirty Dancing",
//         sinopse:"Na esperança de curtir sua juventude, Frances fica decepcionada ao descobrir que vai passar o verão de 1963 com os pais em um resort na sonolenta região de Catskills. A sua sorte muda quando ela conhece o instrutor de dança do resort, Johnny. Quando ele a coloca como sua nova parceira de dança, os dois acabam se apaixonando."
//     },
//     {
//         titulo:"Greese",
//         sinopse:"Na Califórnia de 1959, a boa moça Sandy e o metido Danny se apaixonam e aproveitam um verão inesquecível na praia. Quando voltam às aulas, eles descobrem que frequentam a mesma escola. Danny lidera a gangue dos T-Birds, um grupo que gosta de jaquetas de couro e muito gel no cabelo, e Sandy passa tempo com as Pink Ladies, lideradas pela firme e sarcástica Rizzo. Quando os dois se reúnem, Sandy percebe que Danny não é o mesmo por quem se apaixonou, e ambos precisam mudar caso queiram ficar juntos."
//     }
// ]




//consulta dos filmes fazer ending point parecido com o get oi
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    //envia resposta em objeto jason
    res.json(filmes)
})

app.post("/filmes", async (req, res) =>{
    //capturar o que user enviar
    const titulo= req.body.titulo;
    const sinopse= req.body.sinopse;
    const filme= new Filme({ titulo: titulo, sinopse: sinopse})

    await filme.save();
    const filmes = await Filme.find()
    res.json(filmes)
})

async function conectarAoBanco(){
    await mongoose.connect(`mongodb+srv://carolmitsuoka:12345678910@cluster0.ixl1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`)
}


app.listen(3000, () => {
    try{
        conectarAoBanco()
        console.log("up and running");
    }
    catch(e){
        console.log("erro na conexao", e)
    }
});