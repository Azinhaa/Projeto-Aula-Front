
const protocolo= "http://"
const baseURL= "localhost:3000"

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

function exibirAlerta (seletor, innerHTML, classesToAdd, classesToRemove, timeout){
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove(...classesToAdd)
        alert.classList.add(...classesToRemove)
    }, timeout)
}

function esconderModal(seletor, timeout){
    setTimeout(() =>{
        let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
        modal.hide()
    }, timeout)
}


async function obterFilmes(){
    const filmesEndpoint = "/filmes"
    const URLcompleta= `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes= (await axios.get(URLcompleta)).data
    listarFilmes(filmes)
    

    // console.log(filmes)
}

async function cadastrarFilme() {
    const filmesEndpoint = "/filmes"
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
        exibirAlerta(".alert-filme", "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000)

        // let alert = document.querySelector(".alert")
        // alert.classList.add("show")
        // alert.classList.remove("d-none")
        // setTimeout(() => {
        //     alert.classList.remove("show")
        //     alert.classList.add("d-none")
        // }, 2000)
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput")
    let passwordCadastroInput = document.querySelector("#passwordCadastroInput")
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if(usuarioCadastro && passwordCadastro){
        try{
            const cadastroEndpoint = "/signup"
            const URLcompleta= `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post (URLcompleta,{login:usuarioCadastro, password:passwordCadastro})
            

            // let alert=document.querySelector(".alert-modal-cadastro")
            // alert.innerHTML= "Cadastrado com sucesso!!!"
            // alert.classList.add("show", "alert-success")
            // alert.classList.remove("d-none")
            // setTimeout(() => {
            //     alert.classList.remove("show", "alert-success")
            //     alert.classList.add("d-none")
            //     let modalCadastro = bootstrap.Modal.getInstance(
            //         document.querySelector("#modalCadastro")
            //     )
            //     modalCadastro.hide()
            // }, 2000)

            usuarioCadastroInput.value=""
            passwordCadastroInput.value=""
            exibirAlerta(".alert-modal-cadastro", "Usuario cadastrado com sucesso", ["show", "alert-success"], ["d-none"], 2000)
            esconderModal("#modalCadastro", 2000)

        }
        catch(e){
            usuarioCadastroInput.value=""
            passwordCadastroInput.value=""
            exibirAlerta(".alert-modal-cadastro", "Usuário já cadastrado", ["show", "alert-danger"], ["d-none"], 2000)
            esconderModal("#modalCadastro", 2000)


            // let alert=document.querySelector(".alert-modal-cadastro")
            // alert.innerHTML= "Não foi possivel cadastrar!!!"
            // alert.classList.add("show", "alert-danger")
            // alert.classList.remove("d-none")
            // setTimeout(() => {
            //     alert.classList.remove("show", "alert-danger")
            //     alert.classList.add("d-none")
            //     let modalCadastro = bootstrap.Modal.getInstance(
            //         document.querySelector("#modalCadastro")
            //     )
            //     modalCadastro.hide()
            // }, 2000)
        }
    }
    else{
        exibirAlerta(".alert-modal-cadastro", "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000)

        // let alert=document.querySelector(".alert-modal-cadastro")
        // alert.innerHTML= "Preencha todos os campos!!!"
        // alert.classList.add("show", "alert-danger")
        // alert.classList.remove("d-none")
        // setTimeout(() => {
        //     alert.classList.remove("show", "alert-danger")
        //     alert.classList.add("d-none")
        // }, 2000)
    }
}

// {
//     console.log("teste")
// }

const loginUsuario = async() => {
    let usuarioLoginInput = document.querySelector("#usuarioLoginInput")
    let passwordLoginInput = document.querySelector("#passwordLoginInput")
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if(usuarioLogin&&passwordLogin){
        try{
            const loginEndpoint= "/login"
            const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response= await axios.post(
                URLcompleta,
                {login:usuarioLogin, password:passwordLogin})

            usuarioLoginInput.value=""
            passwordLoginInput.value=""
            exibirAlerta(".alert-modal-login", "Login Realizado com sucesso", ["show", "alert-success"], ["d-none"], 2000)
            esconderModal("#modalLogin", 2000)
            const cadastrarFilmeButton=document.querySelector("#cadastrarFilmeButton")
            cadastrarFilmeButton.disabled = false
        }
        catch(e){

        }
    }
    else{
        exibirAlerta(".alert-modal-login", "preencha todos os campos", ["show", "alert-danger"],["d-none"],2000)
    }
}