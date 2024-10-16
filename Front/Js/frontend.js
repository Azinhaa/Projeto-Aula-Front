const protocolo= "http://"
const baseURL= "localhost:3000"
const filmesEndpoint = "/filmes"

function listarFilmes(filmes){
    //atualizar a tabela 
    let tabela= document.querySelector(".filmes")
    let corpoTabela= tabela.getElementsByTagName("tbody")[0]
    //1-linmpa
    corpoTabela.innerHTML=""
    // preenche a tabela com a base atualizada
    for (let filme of filmes){
        let linha= corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse =  linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}


async function obterFilmes(){
    const URLcompleta= `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes= (await axios.get(URLcompleta)).data
    listarFilmes(filmes)
    

    // console.log(filmes)
}

async function cadastrarFilme() {
    // montar a url completa
    const URLcompleta= `${protocolo}${baseURL}${filmesEndpoint}`
    // busca nos inputs o que foi digitado
    let tituloFilme = document.querySelector("#tituloFilme")
    let sinopseFilme = document.querySelector("#sinopseFilme")
    //traz os valores que foram digitados
    let titulo = tituloFilme.value
    let sinopse= sinopseFilme.value
    if(titulo && sinopse){
         //limpa os campos de digitacao
        tituloFilme.value = ""
        sinopseFilme.value = ""
        //enviando o filme novo e recebendo a base atualizada
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
        listarFilmes(filmes)
    } 
    else{
        let alert = document.querySelector(".alert")
        alert.classList.add("show")
        alert.classList.remove("d-none")
        setTimeout(() => {
            alert.classList.remove("show")
            alert.classList.add("d-none")
        }, 2000)
    }
}

// {
//     console.log("teste")
// }