function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        alert('Login realizado com sucesso!');
        window.location.href = '../projeto/index.html';
        // Redirecionar para a página desejada após o login
        // window.location.href = 'pagina-principal.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
}