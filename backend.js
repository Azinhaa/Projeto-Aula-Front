
const express = require ('express')
const cors= require('cors')
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
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


// construindo o login
const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: { type: String, required:true}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)



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



app.post("/signup", async(req, res) => {
    try{
        const login = req.body.login
        const password=  req.body.password
        const senhaCriptografada= await bcrypt.hash(password, 10)
        const usuario= new Usuario({login:login, password: senhaCriptografada})
        const respMongo= await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (e){
        console.log(e)
        res.status(409).end()
    }

})

app.post("/login", async(req, res)=> { 
    const login= req.body.login
    const password = req.body.password
    const usuarioExiste = await Usuario.findOne({login: login})
    if (!usuarioExiste){
        return res.status(401).json({mensagem: "login invalido"})
    }
    const senhaInvalida= await bcrypt.compare(password, usuarioExiste.password)
    if (!senhaInvalida){
        return res.status(401).json({mensagem: "senha invalida"})
    }

    const token = jwt.sign(
        {login: login}, 
        "chave secreta",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
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