let students = []; // Array para armazenar os alunos e suas informações

function addStudent() {
  const name = document.getElementById('student-name').value;
  const grades = [
    {
      subject: "História", // Disciplina fixada
      grade: parseFloat(document.getElementById('grade1').value)
    },
    {
      subject: "Matemática", // Disciplina fixada
      grade: parseFloat(document.getElementById('grade2').value)
    },
    {
      subject: "Educação Física", // Disciplina fixada
      grade: parseFloat(document.getElementById('grade3').value)
    },
    {
      subject: "Filosofia", // Disciplina fixada
      grade: parseFloat(document.getElementById('grade4').value)
    },
    {
      subject: "Geografia", // Disciplina fixada
      grade: parseFloat(document.getElementById('grade5').value)
    },
  ];
  const attendance = parseFloat(document.getElementById('attendance').value);

  // Calcular a média do aluno
  const media = grades.reduce((acc, grade) => acc + grade.grade, 0) / grades.length;

  // Adicionar aluno ao array
  students.push({ name, grades, attendance, media });

  alert(`${name} adicionado com sucesso! \nMédia: ${media.toFixed(2)}\nFrequência: ${attendance}%`);

  // Limpar campos
  clearFields();
}

function clearFields() {
  document.getElementById('student-name').value = '';
  document.getElementById('attendance').value = '';
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`grade${i}`).value = '';
  }
}

function showResults() {
  // Exibir resultados da turma
  const avgList = document.getElementById('avg-list');
  const studentList = document.getElementById('student-list');
  const aboveAverageList = document.getElementById('above-average-list');
  const belowAttendanceList = document.getElementById('below-attendance-list');

  avgList.innerHTML = ''; // Limpar resultados anteriores
  studentList.innerHTML = '';
  aboveAverageList.innerHTML = ''; // Limpar lista de alunos acima da média
  belowAttendanceList.innerHTML = ''; // Limpar lista de alunos com baixa frequência

  let totalGrades = [0, 0, 0, 0, 0]; // Somatório das notas de cada disciplina
  let totalMedia = 0; // Somatório das médias de todos os alunos
  let totalAttendance = 0; // Somatório da frequência de todos os alunos

  // Calcular média por disciplina e somar médias para a média geral da turma
  students.forEach(student => {
    student.grades.forEach((grade, index) => {
      totalGrades[index] += grade.grade;
    });
    totalMedia += student.media;
    totalAttendance += student.attendance;

    // Adicionar informações dos alunos na lista principal
    const studentItem = document.createElement('li');
    studentItem.textContent = `${student.name} - Média: ${student.media.toFixed(2)} - Frequência: ${student.attendance}%`;
    studentList.appendChild(studentItem);
  });

  // Calcular a média da turma
  const classAverage = totalMedia / students.length;
  const classAttendance = totalAttendance / students.length;

  // Exibir média da turma por disciplina
  totalGrades.forEach((total, index) => {
    const avg = total / students.length;
    const avgItem = document.createElement('li');
    avgItem.textContent = `${['História', 'Matemática', 'Educação Física', 'Filosofia', 'Geografia'][index]} - Média da turma: ${avg.toFixed(2)}`;
    avgList.appendChild(avgItem);
  });

  // Exibir a média geral da turma
  const classAverageItem = document.createElement('li');
  classAverageItem.textContent = `Média Geral da Turma: ${classAverage.toFixed(2)}`;
  avgList.appendChild(classAverageItem);

  // Exibir alunos com média acima da média da turma
  students.forEach(student => {
    if (student.media > classAverage) {
      const aboveItem = document.createElement('li');
      aboveItem.textContent = `${student.name} - Média: ${student.media.toFixed(2)}`;
      aboveAverageList.appendChild(aboveItem);
    }

    // Exibir alunos com frequência abaixo de 75%
    if (student.attendance < 75) {
      const belowItem = document.createElement('li');
      belowItem.textContent = `${student.name} - Frequência: ${student.attendance}%`;
      belowAttendanceList.appendChild(belowItem);
    }
  });

  document.getElementById('results').style.display = 'block'; // Exibir os resultados
}
