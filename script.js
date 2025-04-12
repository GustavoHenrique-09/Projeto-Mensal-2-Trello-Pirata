// Pega as listas do localStorage ou começa com um array vazio se não achar nada
let listas = JSON.parse(localStorage.getItem("listas")) || [];

// Salva as listas no localStorage
function salvar() {
  localStorage.setItem("listas", JSON.stringify(listas));
}

// Mostra as listas na tela
function renderizar() {
  const container = document.getElementById("listas-container");
  container.innerHTML = ""; // Limpa o conteúdo atual

  // Para cada lista...
  listas.forEach((lista, indexLista) => {
    const listaDiv = document.createElement("div");
    listaDiv.className = "lista";

    // Título da lista
    const titulo = document.createElement("h3");
    titulo.innerHTML = lista.titulo;

    // Botão para excluir a lista
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "❌";
    btnExcluir.style.marginLeft = "10px";
    btnExcluir.onclick = function () {
      removerLista(indexLista);
    };

    titulo.appendChild(btnExcluir);
    listaDiv.appendChild(titulo);

    // Mostrar os cards da lista
    lista.cards.forEach((textoCard, indexCard) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = textoCard;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "X";
      btnRemover.className = "btnRemove";
      btnRemover.onclick = function () {
        removerCard(indexLista, indexCard);
      };

      card.appendChild(btnRemover);
      listaDiv.appendChild(card);
    });

    // Campo de texto para adicionar novo card
    const input = document.createElement("input");
    input.placeholder = "Novo card";
    listaDiv.appendChild(input);

    // Botão para adicionar novo card
    const btnAddCard = document.createElement("button");
    btnAddCard.innerHTML = "Adicionar Card";
    btnAddCard.onclick = function () {
      adicionarCard(indexLista, input.value);
    };
    listaDiv.appendChild(btnAddCard);

    container.appendChild(listaDiv);
  });
}

// Adiciona nova lista
function adicionarLista() {
  const nome = prompt("Digite o nome da lista:");
  if (!nome) return;
  listas.push({ titulo: nome, cards: [] });
  salvar();
  renderizar();
}

// Adiciona novo card a uma lista
function adicionarCard(indexLista, texto) {
  if (!texto) return;
  listas[indexLista].cards.push(texto);
  salvar();
  renderizar();
}

// Remove card de uma lista
function removerCard(indexLista, indexCard) {
  listas[indexLista].cards.splice(indexCard, 1);
  salvar();
  renderizar();
}

// Remove lista inteira
function removerLista(indexLista) {
  listas.splice(indexLista, 1);
  salvar();
  renderizar();
}

// Carrega tudo ao abrir a página
renderizar();
