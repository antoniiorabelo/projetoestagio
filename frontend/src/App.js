import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const DISCIPLINE_NAMES = ['Matemática', 'Português', 'História', 'Ciências', 'Geografia'];

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [grades, setGrades] = useState(['', '', '', '', '']);
  const [attendance, setAttendance] = useState('');
  const [result, setResult] = useState(null);

  const handleGradeChange = (index, value) => {
    if (value !== '') {
      const numValue = Number(value);
      if (numValue < 0 || numValue > 10) {
        alert("A nota deve ser um valor entre 0 e 10!");
        return;
      }
    }
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleAddStudent = () => {
    const attNum = Number(attendance.replace('%', ''));
    if (attNum < 0 || attNum > 100) {
      alert("A frequência deve ser um valor entre 0 e 100!");
      return;
    }
    if (!name || grades.includes('') || !attendance) {
      alert("Por favor, preencha todos os campos do aluno!");
      return;
    }
    const newStudent = {
      name: name,
      grades: grades.map(Number),
      attendance: attNum
    };
    setStudents([...students, newStudent]);
    setName('');
    setGrades(['', '', '', '', '']);
    setAttendance('');
  };

  const handleProcess = async () => {
    if (students.length === 0) {
      alert("Adicione pelo menos um aluno antes de processar!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/grades/process', students);
      setResult(response.data);
    } catch (error) {
      console.error("Erro ao processar as notas:", error);
      alert("Erro ao conectar com o servidor. O Spring Boot está a correr?");
    }
  };

  return (
    <div className="app-container">
      <h1 className="header-title">Sistema Escolar - dti digital</h1>
      
      <div className="dashboard-grid">
        
        {/* SEÇÃO 1: FORMULÁRIO */}
        <div className="card">
          <h3>Adicionar Novo Aluno</h3>
          <div className="form-group">
            <label>Nome do Aluno</label>
            <input className="input-field" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: João Silva" />
          </div>
          <div className="form-group">
            <label>Notas das Disciplinas (0-10)</label>
            <div className="grades-container">
              {grades.map((grade, index) => (
                <div key={index} className="grade-input-wrapper">
                  <label className="discipline-label-form">
                    {DISCIPLINE_NAMES[index]}
                  </label>
                  <input 
                    className="input-field"
                    type="number" 
                    min="0" max="10" step="0.1"
                    value={grade} 
                    onChange={e => handleGradeChange(index, e.target.value)} 
                    placeholder="0.0"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Frequência (%)</label>
            <input className="input-field" type="number" min="0" max="100" value={attendance} onChange={e => setAttendance(e.target.value)} placeholder="Ex: 80" />
          </div>
          <button className="btn btn-secondary" onClick={handleAddStudent}>
            + Adicionar Aluno
          </button>
        </div>

        {/* SEÇÃO 2: LISTA DE ALUNOS */}
        <div className="card" style={{ animationDelay: '0.2s' }}>
          <h3>Turma Atual ({students.length} alunos)</h3>
          {students.length > 0 ? (
            <ul className="student-list">
              {students.map((s, index) => (
                <li key={index}>
                  <strong className="student-name">{s.name}</strong> 
                  <span className="student-freq">Freq: {s.attendance}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Nenhum aluno adicionado ainda.</p>
          )}
          <button className="btn btn-primary" onClick={handleProcess}>
            Processar Resultados da Turma
          </button>
        </div>

        {/* SEÇÃO 3: RESULTADOS */}
        {result && (
          <div className="card full-width" style={{ animationDelay: '0.1s' }}>
            <h2>Relatório de Desempenho</h2>
            
            <div className="dashboard-grid">
              <div>
                <h4>Médias e Frequência por Aluno</h4>
                <ul className="result-list">
                  {result.studentResults.map((s, index) => (
                    <li key={index}>
                      <strong className="student-name">{s.name}</strong>: Média {s.averageGrade.toFixed(2)} | Freq: {s.attendance}%
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Média da Turma</h4>
                <div className="highlight-box">
                  <ul className="highlight-box-list">
                    {result.classAveragesPerDiscipline.map((avg, index) => (
                      <li key={index}>
                        <strong>{DISCIPLINE_NAMES[index]}:</strong> {avg.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>

                <h4>Alunos Acima da Média</h4>
                {result.studentsAboveClassAverage.length > 0 ? (
                  <ul className="result-list">
                    {result.studentsAboveClassAverage.map((name, index) => <li key={index} className="student-name"> {name}</li>)}
                  </ul>
                ) : (
                  <p className="empty-state">Nenhum aluno atingiu esta marca.</p>
                )}

                <h4>Atenção (Frequência &lt; 75%)</h4>
                {result.studentsBelow75Attendance.length > 0 ? (
                  <ul className="result-list">
                    {result.studentsBelow75Attendance.map((name, index) => (
                      <li key={index} className="warning-text student-name"> {name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">Todos os alunos com frequência regular.</p>
                )}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;