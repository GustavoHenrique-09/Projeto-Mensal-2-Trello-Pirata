function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação O email
    if (!email.includes('@') || !email.includes('.')) {
        alert('E-mail inválido. Certifique-se de que ele contém "@" e ponto.');
        return;
    }

    // Checa se a senha tem mais de 6 itens.
    if (senha.length < 6) {
        alert('Senha deve ter no mínimo 6 caracteres.');
        return;
    }

    // Armazena o cadastro no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    window.location.href = '../login/index.html'; 
    // Redireciona pra página de login
}