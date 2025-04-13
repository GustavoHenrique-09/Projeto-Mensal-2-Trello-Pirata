// Pega as listas do localStorage ou começa com um array vazio se não achar nada
let listas = JSON.parse(localStorage.getItem("listas")) || [];

// Salva todos os itens no local "listas"
function salvar() {
  localStorage.setItem("listas", JSON.stringify(listas));
}

//Função de inicialização do código
function renderizar() {
  const container = document.getElementById("listas-container");
  container.innerHTML = "";

  // Cria uma div e class para as listas
  listas.forEach((lista, indexLista) => {
    const listaDiv = document.createElement("div");
    listaDiv.className = "lista";

    //Título da lista
    const titulo = document.createElement("h3");
    titulo.innerHTML = lista.titulo;

    //Botão para excluir a lista
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "❌";
    btnExcluir.style.marginLeft = "10px";
    btnExcluir.onclick = function () {
      removerLista(indexLista);
    };
    
    titulo.appendChild(btnExcluir);
    listaDiv.appendChild(titulo);

    //Cria a div para armazenar cada card
    lista.cards.forEach((textoCard, indexCard) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = textoCard;

      //botão de excluir card
      const btnRemover = document.createElement("button");
      btnRemover.textContent = "X";
      btnRemover.className = "btnRemove";
      btnRemover.onclick = function () {
        removerCard(indexLista, indexCard);
      };

      card.appendChild(btnRemover);
      listaDiv.appendChild(card);
    });

    // Input pra adicionar um novo card
    const input = document.createElement("input");
    input.placeholder = "Novo card";
    input.style.marginTop = "10px";
    listaDiv.appendChild(input);

    // Botão pra adicionar o card nomeado
    const btnAddCard = document.createElement("button");
    btnAddCard.innerHTML = "Adicionar Card";
    btnAddCard.style.padding = "4px"
    btnAddCard.style.marginTop = "7px"
    btnAddCard.onclick = function () {
      adicionarCard(indexLista, input.value);
    };
    listaDiv.appendChild(btnAddCard);

    container.appendChild(listaDiv);
  });
}

// Adiciona uma nova lista
function adicionarLista() {
  const nome = prompt("Digite o nome da lista:");
  if (!nome) return;
  listas.push({ titulo: nome, cards: [] });
  salvar();
  renderizar();
}

// Adiciona um novo card 
function adicionarCard(indexLista, texto) {
  if (!texto) return;
  listas[indexLista].cards.push(texto);
  salvar();
  renderizar();
}

// Remover card de uma lista
function removerCard(indexLista, indexCard) {
  listas[indexLista].cards.splice(indexCard, 1);
  salvar();
  renderizar();
}

// Remover lista inteira
function removerLista(indexLista) {
  listas.splice(indexLista, 1);
  salvar();
  renderizar();
}

// Carrega tudo ao abrir a página
renderizar();
