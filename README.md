# EducaFácil - Sistema de Gestão de Notas e Frequência

**EducaFácil** é um sistema web desenvolvido para ajudar professores a gerenciar as notas, medias e frequências de seus alunos de forma simples e eficiente. O sistema permite registrar, visualizar e gerenciar as notas de diferentes disciplinas, além de controlar a presença dos alunos.

---

## Como Funciona

### 1. **Criação de Perfil**
   - A primeira página que o usuário vê permite que ele crie um perfil com um nome de usuário e senha.
   - O usuário insere um nome de usuário único, uma senha e uma confirmação da senha.
   - Se as senhas coincidirem, o perfil será armazenado no **localStorage** e o usuário será redirecionado para a página de login.

### 2. **Login**
   - Após criar o perfil, o usuário pode fazer login fornecendo o nome de usuário e a senha criados.
   - As credenciais são verificadas no **localStorage**, e o usuário será redirecionado para a página de **Adicionar Notas** se o login for bem-sucedido.

### 3. **Adicionar Notas e Frequência**
   - Na página de **Adicionar Notas**, o professor pode inserir:
     - **Notas** de cinco disciplinas (História, Matemática, Educação Física, Filosofia, Geografia).
     - **Frequência** de cada aluno.
   - As notas são validadas para garantir que estejam entre 0 e 10, e a frequência é validada para garantir que esteja entre 0% e 100%.

### 4. **Exibir Resultados**
   - O sistema calcula automaticamente:
     - A **média** de cada aluno nas disciplinas.
     - A **média geral da turma** em cada disciplina.
   - Também exibe relatórios:
     - **Alunos com média superior à média da turma**.
     - **Alunos com frequência abaixo de 75%**.

### 5. **Armazenamento Local**
   - As informações dos alunos, notas e frequência são armazenadas no **localStorage** do navegador, garantindo que os dados não se percam durante a navegação entre páginas.

---

## Lista de Premissas Assumidas

- **Uso de `localStorage`**: O sistema utiliza `localStorage` para armazenar as informações de login, notas e frequência dos alunos. Isso garante que as informações não se percam entre recarregamentos da página, mas não oferece persistência entre dispositivos ou sessões diferentes.

- **Acesso ao Sistema**: O sistema foi desenvolvido para ser acessado diretamente através de um navegador, sem a necessidade de backend. Portanto, a persistência dos dados é limitada ao navegador do usuário.

- **Validação Básica de Dados**: O sistema valida as notas (de 0 a 10) e a frequência (de 0% a 100%) no momento do cadastro. No entanto, não há validações de segurança para proteger contra manipulação de dados.

- **Compatibilidade**: O sistema foi desenvolvido para ser utilizado em navegadores modernos (Chrome, Firefox, etc.).

- **Não há suporte a múltiplos usuários simultâneos**: O sistema não possui funcionalidades para múltiplos usuários ao mesmo tempo. A gestão de alunos é feita por um único professor que possui um perfil.

---

## Decisões de Projeto

### 1. **Armazenamento Local (`localStorage`)**
O projeto utiliza `localStorage` para armazenar os dados dos alunos, notas e frequência. Isso simplifica a implementação e garante persistência local dos dados enquanto o navegador estiver aberto ou até o usuário apagar os dados manualmente.

**Decisão**: A escolha foi feita para evitar a necessidade de um backend e banco de dados, tornando o projeto mais simples e de fácil execução para fins educacionais ou prototipagem.

### 2. **Validação de Dados no Frontend**
Para garantir que os dados inseridos pelo usuário (notas e frequência) estejam dentro de limites válidos (notas entre 0 e 10, e frequência entre 0 e 100), a validação foi feita diretamente no frontend, utilizando atributos HTML (`min`, `max`) e lógica JavaScript.

**Decisão**: Essa escolha foi feita para proporcionar uma experiência mais direta e rápida para o usuário, sem a complexidade de validações no backend.

### 3. **Interface Responsiva**
O projeto utiliza o **Bootstrap** para garantir que a interface seja responsiva e se ajuste bem em diferentes dispositivos, como desktop e mobile.

**Decisão**: A escolha pelo Bootstrap visa fornecer uma solução pronta e eficiente para a construção de interfaces responsivas sem exigir muito trabalho adicional de CSS.

### 4. **Simplicidade no Processo de Autenticação**
O sistema de **login** e **criação de perfil** foi simplificado, armazenando as credenciais no `localStorage` sem criptografia.

**Decisão**: A escolha foi feita para simplificar a implementação e permitir que o projeto funcione em um contexto local e sem a necessidade de um servidor backend.

---

## Tecnologias Utilizadas

- **HTML**: Estrutura básica da página web.
- **CSS**: Estilização das páginas com layout moderno e responsivo.
- **JavaScript**: Lógica de negócios para manipulação de notas, frequência e cálculos.
- **Bootstrap**: Framework de design para tornar o sistema responsivo e bem estruturado.
- **LocalStorage**: Armazenamento local dos dados (notas, frequência, alunos) no navegador, permitindo que as informações sejam persistidas entre recarregamentos da página.
  
---
Fotos
# Tela Inicial
![Captura de tela 2025-05-07 150048](https://github.com/user-attachments/assets/2ee04f94-1640-48a1-b376-9ab21775239b)
# Criação de Perfil 
![Captura de tela 2025-05-07 150544](https://github.com/user-attachments/assets/ce1397b6-8b68-4db9-a5d2-94f13abc5654)
# Login
![Captura de tela 2025-05-07 150505](https://github.com/user-attachments/assets/eb636096-0db5-432a-84c9-7536b718fcf9)
# Adicionar Notas e Frequência
![Captura de tela 2025-05-07 150948](https://github.com/user-attachments/assets/322d21f8-dbd1-4052-920f-fb1eb33a0add)
# Saídas
![Captura de tela 2025-05-07 151127](https://github.com/user-attachments/assets/82c6d86e-c0bf-48b0-aa38-508d7366e6dd)

---
# Vídeo funcional do site
[Assista ao vídeo no YouTube](https://youtu.be/k49hA-HYdHY)

## Como Rodar o Projeto

1. **Clonar o Repositório**:
   - Clone o repositório do projeto para o seu computador:
   
   ```bash
   git clone <URL_DO_REPOSITORIO>
