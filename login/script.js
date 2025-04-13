function login() {
    //Captura o valor dos inputs email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    //Checa se os valores adicionados são compatíveis com os cadastros do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        alert('Login realizado com sucesso!');
        window.location.href = '../projeto/index.html';
        // Redirecionar pra página do projeto
    } else {
        alert('E-mail ou senha incorretos.');
    }
}