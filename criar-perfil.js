document.getElementById('criarPerfilForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    // Salvar o nome de usuário e senha no localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    alert('Perfil criado com sucesso! Você pode fazer login agora.');
    window.location.href = 'login.html'; // Redireciona para a página de login
  });
  