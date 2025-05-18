const listas = JSON.parse(localStorage.getItem('listas')) || []

function adicionarLista(){
  let nomeLista = document.getElementById('nome_lista').value
  let inputNomeLista = document.getElementById('nome_lista')

  if(nomeLista.length === 0) {
    alert("[ERRO] Insira um nome para a lista")
    return
  }

  listas.push({nomeLista, cards: []})

  salvar()

  inputNomeLista.value = "" 
  inputNomeLista.focus()

  renderizar()
}
function renderizar(){
  let quadro = document.getElementById('quadro')
  quadro.innerHTML = ''
  listas.forEach((lista, indexLista) => {
    let divLista = document.createElement('div')
    divLista.className = "div_lista"
    divLista.id = `lista_${indexLista}`
    
    //Título da lista
    let tituloLista = document.createElement('h3')
    tituloLista.textContent = lista.nomeLista
    tituloLista.id = "titulo_lista"
    
    //Botão de excluir lista
    let btnExcluirLista = document.createElement('button')
    btnExcluirLista.textContent = "Excluir"
    btnExcluirLista.className = "btn_excluir_lista"
    btnExcluirLista.onclick = function () {
      removerLista(indexLista)
    }

    //Botão de editar nome lista
    let btnEditarLista = document.createElement('button')
    btnEditarLista.textContent = "Editar"
    btnEditarLista.className = "btn_editar_lista"
    btnEditarLista.onclick = function() {
      editarLista(indexLista)
    }

    quadro.appendChild(divLista)
    divLista.appendChild(tituloLista)
    tituloLista.appendChild(btnEditarLista)
    tituloLista.appendChild(btnExcluirLista)

    lista.cards.forEach((textoCard, indexCard) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = textoCard;

          //botão de excluir card
          const btnExcluirCard = document.createElement("button");
          btnExcluirCard.textContent = "Excluir";
          btnExcluirCard.className = "btn_escluir_card";
          btnExcluirCard.onclick = function () {
            removerCard(indexLista, indexCard);
          }

          //botão de editar card
          let btnEditarCard = document.createElement('button')
          btnEditarCard.textContent = "Editar"
          btnEditarCard.className = "btn_editar_card"
          btnEditarCard.onclick = function(){
            editarCard(indexLista, indexCard)
          }
          
          divLista.appendChild(card);
          card.appendChild(btnEditarCard)
          card.appendChild(btnExcluirCard);
      
        })

    //Criar input nome card e botão
    let inputCard = document.createElement('input')
    let btnAddCard = document.createElement('button')
    btnAddCard.textContent = 'Adicionar Card'
    inputCard.placeholder = "Novo card";
    btnAddCard.className = "btn_adicionar_card"
    inputCard.className = "input_adicionar_card"
    btnAddCard.onclick = function(){
      adicionarCard(indexLista, inputCard.value)
    }
    divLista.appendChild(inputCard)
    divLista.appendChild(btnAddCard)
  });
}
function renderizarLista(indexLista) {
  const lista = listas[indexLista]

  const novaDivLista = document.createElement('div')
  novaDivLista.className = "div_lista"
  novaDivLista.id = `lista_${indexLista}`

  // Título da lista
  let tituloLista = document.createElement('h3')
  tituloLista.textContent = lista.nomeLista

  // Botão editar
  let btnEditarLista = document.createElement('button')
  btnEditarLista.textContent = "Editar"
  btnEditarLista.className = "btn_editar_lista"
  btnEditarLista.onclick = function(){
    editarLista(indexLista)
  } 

  // Botão excluir
  let btnExcluirLista = document.createElement('button')
  btnExcluirLista.textContent = "Excluir"
  btnExcluirLista.className = "btn_excluir_lista"
  btnExcluirLista.onclick = function(){
    removerLista(indexLista)
  } 

  // Adiciona botões ao título
  tituloLista.appendChild(btnEditarLista)
  tituloLista.appendChild(btnExcluirLista)
  novaDivLista.appendChild(tituloLista)

  // Cards
  lista.cards.forEach((textoCard, indexCard) => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = textoCard

    const btnEditarCard = document.createElement("button")
    btnEditarCard.textContent = "Editar"
    btnEditarCard.className = "btn_editar_card"
    btnEditarCard.onclick = function(){
      editarCard(indexLista, indexCard)
    }

    const btnExcluirCard = document.createElement("button")
    btnExcluirCard.textContent = "X"
    btnExcluirCard.className = "btn_excluir_card"
    btnExcluirCard.onclick = function(){
      removerCard(indexLista, indexCard)
    }

    card.appendChild(btnEditarCard)
    card.appendChild(btnExcluirCard)
    novaDivLista.appendChild(card)
  })

  // Input novo card
  const inputCard = document.createElement('input')
  inputCard.placeholder = "Novo card"
  inputCard.className = 'input_adicionar_card'

  const btnAddCard = document.createElement('button')
  btnAddCard.textContent = "Adicionar Card"
  btnAddCard.className = 'btn_adicionar_card'
  btnAddCard.onclick = function(){
      adicionarCard(indexLista, inputCard.value)
    }

  novaDivLista.appendChild(inputCard)
  novaDivLista.appendChild(btnAddCard)

  // Substituir lista antiga pela nova
  const divAntiga = document.getElementById(`lista_${indexLista}`)
  if (divAntiga) {
    divAntiga.replaceWith(novaDivLista)
  }
}

function removerLista(indexLista){
  listas.splice(indexLista, 1)

  salvar()

  renderizar()
}
function editarLista(indexLista){
  let novoNomeLista = window.prompt('Digite o novo nome da lista')

  if(novoNomeLista.length === 0) {
    alert("[ERRO] Insira um novo nome válido para a lista")
    return
  }else{
    listas[indexLista].nomeLista = novoNomeLista
  }

  salvar()

  renderizarLista(indexLista)
}
function adicionarCard(indexLista, texto){
  if(texto.length === 0) {
    alert("[ERRO] Insira um nome para o Card")
    return
  }
  listas[indexLista].cards.push(texto)

  salvar()

  renderizarLista(indexLista)
}
function editarCard(indexLista, indexCard){
  let novoNomeCard = prompt("Digite o nome novo do card")

  if(novoNomeCard.length === 0) {
    alert("[ERRO] Insira um novo nome válido para o card")
    return
  }else{
    listas[indexLista].cards[indexCard] = novoNomeCard
  }

  salvar()

  renderizarLista(indexLista)
}
function removerCard(indexLista, indexCard){
  listas[indexLista].cards.splice(indexCard, 1)

  salvar()

  renderizarLista(indexLista)
}
function salvar(){
  localStorage.setItem('listas', JSON.stringify(listas))
}
window.onload = renderizar
