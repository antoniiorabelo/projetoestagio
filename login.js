// Lógica para realizar o login
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Obter os valores de nome de usuário e senha
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Recuperar o usuário armazenado no localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Verificar se o usuário existe e as credenciais são válidas
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert("Login bem-sucedido!");
    
    // Marcar o usuário como logado no localStorage
    localStorage.setItem('loggedIn', true);
    
    // Redirecionar para a página de adicionar notas
    window.location.href = "adicionar-notas.html"; // Ou qualquer página de sucesso
  } else {
    alert("Credenciais inválidas. Tente novamente.");
  }
});
