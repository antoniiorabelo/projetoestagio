package com.example.demo.service;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

import com.example.demo.dto.StudentInput;
import com.example.demo.dto.StudentResult;
import com.example.demo.dto.SystemResponse;
/*  =====================================================================================================================
 FOI USADO IA PARA GERAR ESTE TESTE, MAS ELE FOI REVISADO E AJUSTADO MANUALMENTE PARA CORRIGIR ERROS E MELHORAR A CLAREZA
    =====================================================================================================================
*/
class GradeServiceTest {

    
    private final GradeService gradeService = new GradeService(); 

    @Test
    void deveCalcularMediaDoAlunoCorretamente() {
        // 1. PREPARAÇÃO (Arrange)
        // Como são Records, passamos os valores direto no construtor
        StudentInput aluno = new StudentInput(
            "João Teste", 
            Arrays.asList(10.0, 8.0, 6.0, 10.0, 6.0), // Soma = 40. Média = 8.0
            80.0
        );

        List<StudentInput> turma = Arrays.asList(aluno);

        // 2. AÇÃO (Act)
        SystemResponse resultado = gradeService.processStudents(turma); 

        // 3. VERIFICAÇÃO (Assert)
        StudentResult resultadoJoao = resultado.studentResults().get(0);
        assertEquals(8.0, resultadoJoao.averageGrade(), 0.01, 
            "A média do João deve ser exatamente 8.0");
    }

    @Test
    void deveIdentificarAlunoComFrequenciaBaixaEAcimaDaMedia() {
        // 1. PREPARAÇÃO
        StudentInput alunoFrequente = new StudentInput(
            "Ana", 
            Arrays.asList(10.0, 10.0, 10.0, 10.0, 10.0), // Média 10
            90.0
        );

        StudentInput alunoFaltoso = new StudentInput(
            "Pedro", 
            Arrays.asList(5.0, 5.0, 5.0, 5.0, 5.0), // Média 5
            70.0 // Abaixo de 75%
        );

        // 2. AÇÃO
        SystemResponse resultado = gradeService.processStudents(Arrays.asList(alunoFrequente, alunoFaltoso));

        // 3. VERIFICAÇÕES
        
        // Frequência
        List<String> alunosAbaixo75 = resultado.studentsBelow75Attendance();
        assertEquals(1, alunosAbaixo75.size(), "Deve encontrar exatamente 1 aluno com falta");
        assertTrue(alunosAbaixo75.contains("Pedro"), "O aluno faltoso deve ser o Pedro");
        assertFalse(alunosAbaixo75.contains("Ana"), "A Ana não deve estar na lista de faltas");

        // Acima da média (Média geral da turma será 7.5. Ana tem 10, Pedro tem 5)
        List<String> alunosAcimaMedia = resultado.studentsAboveClassAverage();
        assertEquals(1, alunosAcimaMedia.size(), "Apenas 1 aluno está acima da média de 7.5");
        assertTrue(alunosAcimaMedia.contains("Ana"), "A Ana deve estar acima da média");
    }

    @Test
    void deveCalcularMediaGeralDaTurmaPorDisciplina() {
        // 1. PREPARAÇÃO
        StudentInput aluno1 = new StudentInput("Maria", Arrays.asList(10.0, 10.0, 10.0, 10.0, 10.0), 100.0);
        StudentInput aluno2 = new StudentInput("Carlos", Arrays.asList(5.0, 5.0, 5.0, 5.0, 5.0), 100.0);

        // 2. AÇÃO
        SystemResponse resultado = gradeService.processStudents(Arrays.asList(aluno1, aluno2));

        // 3. VERIFICAÇÃO
        List<Double> mediasTurma = resultado.classAveragesPerDiscipline();
        
        assertEquals(5, mediasTurma.size(), "Devem existir 5 disciplinas");
        // (10 + 5) / 2 = 7.5 para cada disciplina
        assertEquals(7.5, mediasTurma.get(0), 0.01, "A média da turma na 1ª disciplina deve ser 7.5");
        assertEquals(7.5, mediasTurma.get(4), 0.01, "A média da turma na última disciplina deve ser 7.5");
    }
    
    @Test
    void naoDeveFalharSeListaForVaziaOuNula() {
        // 1. PREPARAÇÃO
        List<StudentInput> turmaVazia = Arrays.asList();
        
        // 2. AÇÃO
        SystemResponse resultadoVazio = gradeService.processStudents(turmaVazia);
        SystemResponse resultadoNulo = gradeService.processStudents(null);
        
        // 3. VERIFICAÇÃO
        assertNotNull(resultadoVazio, "O sistema não deve quebrar com listas vazias");
        assertTrue(resultadoVazio.studentResults().isEmpty(), "Deve retornar lista vazia de resultados");
        
        assertNotNull(resultadoNulo, "O sistema não deve quebrar se receber null");
    }
}