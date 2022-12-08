const form = document.getElementById("novoItem");
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);   
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome" : nome.value,
        "quantidade": quantidade.value
    }
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);
        //Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0 ;

         criaElemento(itemAtual);

         itens.push(itemAtual)

    }
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""
})
function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroDoItem = document.createElement("strong")
    numeroDoItem.innerHTML = item.quantidade;
    numeroDoItem.dataset.id = item.id
    novoItem.appendChild(numeroDoItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem); 
}
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}
//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "Apagar"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao;
}
//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento (tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}








