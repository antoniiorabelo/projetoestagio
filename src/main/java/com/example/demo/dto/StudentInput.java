package com.example.demo.dto;

import java.util.List;

public record StudentInput(
    String name, 
    List<Double> grades, 
    Double attendance    
) {}