let students = []; // Array para armazenar os alunos e suas informações

// Carregar os dados do localStorage quando a página for carregada
const storedStudents = localStorage.getItem('students');
if (storedStudents) {
  students = JSON.parse(storedStudents);
  displayStudents(); // Exibir os alunos salvos no localStorage
}

// Função para adicionar um aluno
function addStudent() {
  const name = document.getElementById('student-name').value;
  const grades = [
    {
      subject: "História",
      grade: parseFloat(document.getElementById('grade1').value)
    },
    {
      subject: "Matemática",
      grade: parseFloat(document.getElementById('grade2').value)
    },
    {
      subject: "Educação Física",
      grade: parseFloat(document.getElementById('grade3').value)
    },
    {
      subject: "Filosofia",
      grade: parseFloat(document.getElementById('grade4').value)
    },
    {
      subject: "Geografia",
      grade: parseFloat(document.getElementById('grade5').value)
    },
  ];
  const attendance = parseFloat(document.getElementById('attendance').value);

  // Calcular a média do aluno
  const media = grades.reduce((acc, grade) => acc + grade.grade, 0) / grades.length;

  // Adicionar aluno ao array
  students.push({ name, grades, attendance, media });

  // Salvar os dados no localStorage
  localStorage.setItem('students', JSON.stringify(students));

  alert(`${name} adicionado com sucesso! \nMédia: ${media.toFixed(2)}\nFrequência: ${attendance}%`);

  // Limpar campos
  clearFields();
  displayStudents(); // Exibir os alunos após adicionar
}

// Função para limpar os campos após adicionar um aluno
function clearFields() {
  document.getElementById('student-name').value = '';
  document.getElementById('attendance').value = '';
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`grade${i}`).value = '';
  }
}

// Função para exibir os alunos salvos
function displayStudents() {
  const studentList = document.getElementById('student-list');
  studentList.innerHTML = ''; // Limpar a lista existente

  students.forEach(student => {
    const studentItem = document.createElement('li');
    studentItem.textContent = `${student.name} - Média: ${student.media.toFixed(2)} - Frequência: ${student.attendance}%`;
    studentList.appendChild(studentItem);
  });
}

// Função para exibir os resultados da turma
function showResults() {
  const avgList = document.getElementById('avg-list');
  const aboveAverageList = document.getElementById('above-average-list');
  const belowAttendanceList = document.getElementById('below-attendance-list');

  avgList.innerHTML = ''; 
  aboveAverageList.innerHTML = ''; 
  belowAttendanceList.innerHTML = ''; 

  let totalGrades = [0, 0, 0, 0, 0]; 
  let totalMedia = 0; 
  let totalAttendance = 0; 

  students.forEach(student => {
    student.grades.forEach((grade, index) => {
      totalGrades[index] += grade.grade;
    });
    totalMedia += student.media;
    totalAttendance += student.attendance;
  });

  const classAverage = totalMedia / students.length;

  totalGrades.forEach((total, index) => {
    const avg = total / students.length;
    const avgItem = document.createElement('li');
    avgItem.textContent = `${['História', 'Matemática', 'Educação Física', 'Filosofia', 'Geografia'][index]} - Média da turma: ${avg.toFixed(2)}`;
    avgList.appendChild(avgItem);
  });

  const classAverageItem = document.createElement('li');
  classAverageItem.textContent = `Média Geral da Turma: ${classAverage.toFixed(2)}`;
  avgList.appendChild(classAverageItem);

  students.forEach(student => {
    if (student.media > classAverage) {
      const aboveItem = document.createElement('li');
      aboveItem.textContent = `${student.name} - Média: ${student.media.toFixed(2)}`;
      aboveAverageList.appendChild(aboveItem);
    }

    if (student.attendance < 75) {
      const belowItem = document.createElement('li');
      belowItem.textContent = `${student.name} - Frequência: ${student.attendance}%`;
      belowAttendanceList.appendChild(belowItem);
    }
  });

  document.getElementById('results').style.display = 'block';
}

// Função para limpar o localStorage
function clearLocalStorage() {
  localStorage.clear();
  alert("Os dados foram limpos!");
  location.reload();
}
