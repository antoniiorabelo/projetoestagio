// Lógica para criar o perfil
document.getElementById("create-profile-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Obter os valores dos campos de entrada
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Verificar se as senhas correspondem
  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  // Armazenar o usuário no localStorage
  const user = { username, password };
  localStorage.setItem('user', JSON.stringify(user));

  // Exibir mensagem de sucesso e redirecionar para a página de login
  alert("Perfil criado com sucesso! Agora você pode fazer login.");
  window.location.href = "login.html"; // Redireciona para o login após a criação do perfil
});
