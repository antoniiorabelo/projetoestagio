package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.StudentInput;
import com.example.demo.dto.StudentResult;
import com.example.demo.dto.SystemResponse;

@Service // Aqui avisamos ao Spring que essa classe cuida das regras de negócio (lógica)
public class GradeService {

    public SystemResponse processStudents(List<StudentInput> students) {
        
        // Se a lista vier vazia ou nula, não há o que processar
        if (students == null || students.isEmpty()) {
            return new SystemResponse(new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }

        List<StudentResult> studentResults = new ArrayList<>();
        
        // Vai guardar a soma das notas de cada disciplina (são 5 no total)
        double[] sumPerDiscipline = new double[5];
        
        // Vai ajudar a calcular a média geral da turma
        double totalClassSum = 0.0;

        // 1. Vamos calcular a média de cada aluno e, ao mesmo tempo,
        //    somar as notas por disciplina
        for (StudentInput student : students) {
            double studentGradesSum = 0.0;
            
            // Percorre as 5 notas do aluno
            for (int i = 0; i < 5; i++) {
                double grade = student.grades().get(i);
                
                studentGradesSum += grade;           // soma das notas do aluno
                sumPerDiscipline[i] += grade;        // soma geral da disciplina
            }
            
            // Calcula a média do aluno
            double studentAvg = studentGradesSum / 5.0;
            
            // Soma para depois calcular a média geral da turma
            totalClassSum += studentAvg;
            
            // Guarda o resultado desse aluno
            studentResults.add(new StudentResult(
                    student.name(),
                    studentAvg,
                    student.attendance()
            ));
        }

        // 2. Média geral da turma (média das médias dos alunos)
        double overallClassAverage = totalClassSum / students.size();

        // 3. Média da turma em cada disciplina
        List<Double> classAveragesPerDiscipline = new ArrayList<>();
        for (double sum : sumPerDiscipline) {
            classAveragesPerDiscipline.add(sum / students.size());
        }

        // 4. Separar alunos por critérios importantes
        List<String> studentsAboveClassAverage = new ArrayList<>();
        List<String> studentsBelow75Attendance = new ArrayList<>();

        for (StudentResult result : studentResults) {
            
            // Alunos com desempenho acima da média da turma
            if (result.averageGrade() > overallClassAverage) {
                studentsAboveClassAverage.add(result.name());
            }
            
            // Alunos com frequência abaixo de 75% (precisam de atenção)
            if (result.attendance() < 75.0) {
                studentsBelow75Attendance.add(result.name());
            }
        }

        // 5. Retorna tudo organizado em um único objeto de resposta
        return new SystemResponse(
                studentResults,
                classAveragesPerDiscipline,
                studentsAboveClassAverage,
                studentsBelow75Attendance
        );
    }
}