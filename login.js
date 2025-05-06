document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Recuperar as credenciais salvas
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    // Verificar se o login é válido
    if (username === storedUsername && password === storedPassword) {
      alert('Login bem-sucedido!');
      window.location.href = 'index.html'; // Redireciona para o sistema de notas
    } else {
      alert('Nome de usuário ou senha incorretos.');
    }
  });
  