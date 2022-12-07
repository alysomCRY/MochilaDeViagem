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

        itens[existe.id] = itemAtual
    }else {
        itemAtual.id = itens.length 

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

    lista.appendChild(novoItem); 
}
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}












