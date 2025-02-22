// Initialize student list from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Handle Add Student Form Submission
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = parseFloat(document.getElementById('grade').value);

    if (name && age && !isNaN(grade)) {
        const student = { name, age, grade };
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        displayLeaderboard();
        updateChart();
        this.reset();
    } else {
        alert("Please fill all fields correctly!");
    }
});

// Display Leaderboard
function displayLeaderboard() {
    students.sort((a, b) => b.grade - a.grade);
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';
    students.forEach((student, index) => {
        const badge = student.grade >= 90 ? '🏆' : student.grade >= 75 ? '⭐' : '';
        list.innerHTML += `<li>${index + 1}. ${student.name} - Grade: ${student.grade} ${badge}</li>`;
    });
}

// Grade Distribution Chart
function updateChart() {
    const grades = students.map(s => s.grade);
    const names = students.map(s => s.name);

    const ctx = document.getElementById('gradeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Student Grades',
                data: grades,
                backgroundColor: 'rgba(30, 144, 255, 0.8)',
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Search Student by Name
function searchStudent() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchValue));
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';
    filteredStudents.forEach((student, index) => {
        list.innerHTML += `<li>${index + 1}. ${student.name} - Grade: ${student.grade}</li>`;
    });
}

// Add Assignment Function
function addAssignment() {
    const assignmentText = document.getElementById('assignment').value;
    if (assignmentText) {
        const assignmentList = document.getElementById('assignmentList');
        assignmentList.innerHTML += `<li>${assignmentText}</li>`;
        document.getElementById('assignment').value = '';
    }
}

// Initial Load
displayLeaderboard();
updateChart();
