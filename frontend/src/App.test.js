import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
/*  =====================================================================================================================
 FOI USADO IA PARA GERAR ESTE TESTE, MAS ELE FOI REVISADO E AJUSTADO MANUALMENTE PARA CORRIGIR ERROS E MELHORAR A CLAREZA
    =====================================================================================================================
*/
// Como usamos alert() no código, aqui criamos uma versão "fake"
// para que os testes não quebrem quando ele for chamado
window.alert = jest.fn();

describe('Testes do Componente App (React)', () => {

  // Antes de cada teste, limpamos o histórico do alert
  // para garantir que um teste não interfira no outro
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o título principal do sistema', () => {
    render(<App />);
    
    // Procura pelo título na tela (ignorando maiúsculas/minúsculas)
    const titleElement = screen.getByText(/Sistema Escolar - dti digital/i);
    
    expect(titleElement).toBeInTheDocument();
  });

  test('deve disparar um alerta se tentar adicionar aluno com campos vazios', () => {
    render(<App />);
    
    // Clica no botão sem preencher nada
    const addButton = screen.getByText('+ Adicionar Aluno');
    fireEvent.click(addButton);

    // Verifica se o alerta apareceu com a mensagem esperada
    expect(window.alert).toHaveBeenCalledWith("Por favor, preencha todos os campos do aluno!");
  });

  test('deve adicionar um aluno na lista quando preenchemos tudo corretamente', () => {
    render(<App />);

    // 1. Preenche o nome
    const nameInput = screen.getByPlaceholderText('Ex: João Silva');
    fireEvent.change(nameInput, { target: { value: 'Maria Joaquina' } });

    // 2. Preenche a frequência
    const freqInput = screen.getByPlaceholderText('Ex: 80');
    fireEvent.change(freqInput, { target: { value: '90' } });

    // 3. Preenche todas as 5 notas
    const gradeInputs = screen.getAllByPlaceholderText('0.0');
    gradeInputs.forEach(input => {
      fireEvent.change(input, { target: { value: '8.5' } });
    });

    // 4. Clica para adicionar o aluno
    const addButton = screen.getByText('+ Adicionar Aluno');
    fireEvent.click(addButton);

    // 5. Agora conferimos se deu tudo certo

    // O nome deve aparecer na lista
    const studentName = screen.getByText('Maria Joaquina');
    expect(studentName).toBeInTheDocument();

    // A frequência também deve aparecer
    const studentFreq = screen.getByText('Freq: 90%');
    expect(studentFreq).toBeInTheDocument();

    // Como deu tudo certo, nenhum alerta deve ter sido chamado
    expect(window.alert).not.toHaveBeenCalled();
  });

  test('deve impedir que uma nota maior que 10 seja inserida', () => {
    render(<App />);
    
    // Pega o primeiro campo de nota
    const firstGradeInput = screen.getAllByPlaceholderText('0.0')[0];
    
    // Tenta colocar um valor inválido
    fireEvent.change(firstGradeInput, { target: { value: '11' } });

    // Espera que o sistema avise o usuário
    expect(window.alert).toHaveBeenCalledWith("A nota deve ser um valor entre 0 e 10!");
  });
});