function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação de e-mail simplificada
    if (!email.includes('@') || !email.includes('.')) {
        alert('E-mail inválido. Certifique-se de que ele contém "@" e ponto.');
        return;
    }

    // Validação de senha (mínimo 6 caracteres)
    if (senha.length < 6) {
        alert('Senha deve ter no mínimo 6 caracteres.');
        return;
    }

    // Armazenamento no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    window.location.href = '../login/index.html'; // Redireciona para a página de login
}