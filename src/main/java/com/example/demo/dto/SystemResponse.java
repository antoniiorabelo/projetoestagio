package com.example.demo.dto;

import java.util.List;

public record SystemResponse(
    List<StudentResult> studentResults,          
    List<Double> classAveragesPerDiscipline,     
    List<String> studentsAboveClassAverage,      
    List<String> studentsBelow75Attendance       
) {}