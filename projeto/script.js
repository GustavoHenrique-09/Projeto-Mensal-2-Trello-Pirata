const API_BASE = "https://personal-ga2xwx9j.outsystemscloud.com/Trellospl/rest/Trello";
let boardAtualId = null;
const MINHA_ASSINATURA = "CriadoPor:Gustavo"; 

async function carregarBoards() {
  const res = await fetch(`${API_BASE}/GetBoards`);
  const boards = await res.json();
  console.log("Todos os boards disponíveis:", boards);

  
  const meusBoards = boards.filter(board => board.Description === MINHA_ASSINATURA);
  console.log("Meus boards:", meusBoards);

  const boardList = document.getElementById("lista-boards");
  if (boardList) {
    boardList.innerHTML = "";
    meusBoards.forEach(board => {
      const li = document.createElement("li");
      li.innerHTML = `<button onclick="carregarBoardCompleto(${board.Id})">${board.Name}</button>`;
      boardList.appendChild(li);
    });
  }

  return meusBoards;
}

async function criarBoard(nome, cor = "#315D86") {
  try {
    const res = await fetch(`${API_BASE}/CreateOrUpdateBoard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id: 0,
        Name: nome,
        Description: MINHA_ASSINATURA,
        HexadecimalColor: cor
      })
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    const boardId = await res.text();
    console.log("Board criado com ID:", boardId);
    await carregarBoards();
    await carregarBoardCompleto(boardId); 
    return boardId;
  } catch (error) {
    console.error("Erro ao criar board:", error);
  }
}

async function carregarBoardCompleto(boardId) {
  boardAtualId = boardId;
  const res = await fetch(`${API_BASE}/GetCompleteBoard?BoardId=${boardId}`);
  const data = await res.json();
  renderizarBoard(data);
}


async function criarColuna(boardId, titulo) {
  const res = await fetch(`${API_BASE}/CreateOrUpdateColumn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Id: 0, BoardId: boardId, Title: titulo })
  });
  await carregarBoardCompleto(boardId);
  return await res.text();
}


async function criarCard(columnId, titulo, descricao = "") {
  const res = await fetch(`${API_BASE}/CreateOrUpdateTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Id: 0, ColumnId: columnId, Title: titulo, Description: descricao })
  });
  await carregarBoardCompleto(boardAtualId);
  return await res.text();
}

async function deletarCard(taskId) {
  await fetch(`${API_BASE}/DeleteTask?TaskId=${taskId}`, {
    method: "DELETE"
  });
  await carregarBoardCompleto(boardAtualId);
}



function renderizarBoard(data) {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  data.ColumnStrs.forEach(colunaObj => {
    const coluna = colunaObj.Column;

    const colunaEl = document.createElement("div");
    colunaEl.className = "div_lista";

    const titulo = document.createElement("h3");
    titulo.textContent = coluna.Title;
    colunaEl.appendChild(titulo);

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards";

    colunaObj.Tasks.forEach(task => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";

      const cardTitulo = document.createElement("p");
      cardTitulo.textContent = task.Title;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => deletarCard(task.Id);

      cardEl.appendChild(cardTitulo);
      cardEl.appendChild(deleteBtn);
      cardsContainer.appendChild(cardEl);
    });

    const input = document.createElement("input");
    input.placeholder = "Nova tarefa";
    input.className = "input_adicionar_card";

    const botao = document.createElement("button");
    botao.textContent = "+";
    botao.className = "btn_adicionar_card";
    botao.onclick = () => {
      const titulo = input.value.trim();
      if (titulo) {
        criarCard(coluna.Id, titulo);
        input.value = "";
      }
    };

    colunaEl.appendChild(cardsContainer);
    colunaEl.appendChild(input);
    colunaEl.appendChild(botao);

    boardDiv.appendChild(colunaEl);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  carregarBoards();

  const btnCriarBoard = document.getElementById("btn-criar-board");
  if (btnCriarBoard) {
    btnCriarBoard.onclick = () => {
      const nome = prompt("Nome do novo board:");
      if (nome) criarBoard(nome);
    };
  }

  const btnCriarColuna = document.getElementById("btn-criar-coluna");
  if (btnCriarColuna) {
    btnCriarColuna.onclick = () => {
      const titulo = prompt("Título da nova coluna:");
      if (titulo && boardAtualId) criarColuna(boardAtualId, titulo);
    };
  }
});
