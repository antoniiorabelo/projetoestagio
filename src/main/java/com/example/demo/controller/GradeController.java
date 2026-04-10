package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StudentInput;
import com.example.demo.dto.SystemResponse;
import com.example.demo.service.GradeService;

@RestController // Diz ao Spring que isto é uma API REST
@RequestMapping("/api/grades") // O endereçoda nossa API
@CrossOrigin(origins = "*") // Permite que o React (que vai rodar noutra porta) consiga aceder a esta API sem erros de segurança, tipo spring tem um bloqueio por padrão para evitar que sites mals acessem
public class GradeController {

    @Autowired // Pede ao Spring para injetar o serviço que criamos no serviço
    private GradeService gradeService;

    
    @PostMapping("/process")
    public ResponseEntity<SystemResponse> processGrades(@RequestBody List<StudentInput> students) {
        
        SystemResponse response = gradeService.processStudents(students);
        
        return ResponseEntity.ok(response);
    }
}