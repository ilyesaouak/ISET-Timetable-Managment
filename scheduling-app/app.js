// Import necessary modules
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/schedule-form', (req, res) => {
  res.render('scheduleForm');
});

app.get('/schedule-view', (req, res) => {
  // Fetch schedules from the database (dummy data here)
  const schedules = [
    { teacher: 'Mr. Smith', room: '101', subject: 'Math', timeSlot: '9:00 AM' },
    { teacher: 'Ms. Johnson', room: '102', subject: 'History', timeSlot: '10:00 AM' },
  ];
  res.render('scheduleView', { schedules });
});

app.get('/absence-form', (req, res) => {
  res.render('absenceForm');
});
app.get('/timetable', (req, res) => {
  // Sample data for the timetable
  const timetable = {
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    slots: [
      { time: '8h30 à 10h00', sessions: [
          { subject: 'Web 3.0', teacher: 'MARIEM JERIDI', room: 'SI 03' },
          { subject: 'Méthodologie de Conception Objet', teacher: 'Mariem JERIDI', room: 'SI 03' },
          { subject: 'Gestion des données Massives', teacher: 'Rayen BEN SALAH', room: 'LG 04' },
          { subject: 'Preparing TOEIC', teacher: 'Dziriya ARFAOUI', room: 'SI 01' },
          { subject: 'Atelier Framework cross-platform', teacher: 'Wahid HAMDI', room: 'LI 06' }
        ]
      },
      // Add more slots and sessions as needed
    ]
  };

  res.render('timetable', { timetable });
});
app.get('/create-timetable', (req, res) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeslots = ['8h30 à 10h00', '10h10 à 11h40', '11h50 à 13h20', '14h30 à 16h00', '16h10 à 17h40'];

  res.render('createTimetable', { days, timeslots });
});

app.post('/create-timetable', (req, res) => {
  const timetableData = req.body;
  // Save the timetableData here (e.g., to a database)
  res.send('Timetable created successfully!');
});

// Sample route for viewing a room's timetable
app.get('/salle/:room', (req, res) => {
  const room = req.params.room; // e.g., "SI 01"
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeslots = [
    '8h30 à 10h00',
    '10h10 à 11h40',
    '11h50 à 13h20',
    '14h30 à 16h00',
    '16h10 à 17h40'
  ];

  // Sample timetable data for "SI 01"
  const timetable = {
    '8h30 à 10h00': {
      'Lundi': { subject: 'Architecture des Ordinateurs', teacher: 'Rana RHILI', group: 'TI 11' },
      'Mardi': { subject: 'Systèmes Logiques', teacher: 'Wahbi RAJHI', group: 'TI 11' },
      'Mercredi': { subject: 'Développement web et multimédia I', teacher: 'Sarra JEMLI', group: 'TI 11' },
      'Jeudi': { subject: 'Preparing TOEIC', teacher: 'Prof Anglais', group: 'DSI 32' },
      'Vendredi': { subject: 'Mathématique Appliquée', teacher: 'Taher BEN YOUSSEF', group: 'TI 11' },
    },
    // Add other timeslots and days...
  };

  res.render('salleTimetable', { room, days, timeslots, timetable });
});
// Route to display the timetable creation form
app.get('/create-timetable', (req, res) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeslots = [
    '8h30 à 10h00',
    '10h10 à 11h40',
    '11h50 à 13h20',
    '14h30 à 16h00',
    '16h10 à 17h40'
  ];

  res.render('createTimetable', { days, timeslots });
});

// Route to handle timetable submission
app.post('/save-timetable', (req, res) => {
  const timetableData = req.body; // Get data from the form

  // Here you can add logic to save the data in a database or JSON file
  // For now, let's log it to console
  console.log(timetableData);

  res.redirect('/salle/SI%2001'); // Redirect to view timetable (update as needed)
});

app.get('/create-salle-timetable/:room', (req, res) => {
  const room = req.params.room; // Get the room from URL params
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']; // Days of the week
  const timeslots = ['8h30 à 10h00', '10h10 à 11h40', '11h50 à 13h20', '14h30 à 16h00', '16h10 à 17h40']; // Time slots

  res.render('createSalleTimetable', { room, days, timeslots });
});

// Route to handle the timetable form submission
app.post('/save-timetable', (req, res) => {
  const timetableData = req.body; // Get the timetable data from the form

  // Log the timetable data for now (you can save it to a database or a file)
  console.log(timetableData);

  // For demonstration, we will redirect to the timetable view page for room SI 01
  res.redirect('/salle/SI%2001');
});

// Route to view the timetable for a room (e.g., SI 01)
app.get('/salle/:room', (req, res) => {
  const room = req.params.room; // Get the room from URL params
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']; // Days of the week
  const timeslots = [
    '8h30 à 10h00',
    '10h10 à 11h40',
    '11h50 à 13h20',
    '14h30 à 16h00',
    '16h10 à 17h40'
  ];
  
  const timetable = {
    '8h30 à 10h00': {
      'Lundi': { subject: 'Architecture des Ordinateurs', teacher: 'Rana RHILI', group: 'TI 11' },
      'Mardi': { subject: 'Systèmes Logiques', teacher: 'Wahbi RAJHI', group: 'TI 11' },
      'Mercredi': { subject: 'Développement web et multimédia I', teacher: 'Sarra JEMLI', group: 'TI 11' },
      'Jeudi': { subject: 'Preparing TOEIC', teacher: 'Prof Anglais', group: 'DSI 32' },
      'Vendredi': { subject: 'Mathématique Appliquée', teacher: 'Taher BEN YOUSSEF', group: 'TI 11' },
    },
    '10h10 à 11h40': {
      'Lundi': { subject: 'Génie Logiciel', teacher: 'Mohamed SALAH', group: 'TI 12' },
      'Mardi': { subject: 'Bases de Données', teacher: 'Amine CHOUIKH', group: 'TI 12' },
      'Mercredi': { subject: 'Réseaux Informatiques', teacher: 'Nadia SAID', group: 'TI 12' },
      'Jeudi': { subject: 'Anglais Technique', teacher: 'John DOE', group: 'DSI 33' },
      'Vendredi': { subject: 'Probabilités et Statistiques', teacher: 'Sana MOKHTAR', group: 'TI 12' },
    },
    '11h50 à 13h20': {
      'Lundi': { subject: 'Algèbre Linéaire', teacher: 'Samir MOURAD', group: 'TI 13' },
      'Mardi': { subject: 'Algorithmique', teacher: 'Ali KHALIL', group: 'TI 13' },
      'Mercredi': { subject: 'Programmation C', teacher: 'Mouna BEN SLIMANE', group: 'TI 13' },
      'Jeudi': { subject: 'Expression Française', teacher: 'Marie DUPONT', group: 'DSI 34' },
      'Vendredi': { subject: 'Physique Appliquée', teacher: 'Fatma BELHADJ', group: 'TI 13' },
    },
    '14h30 à 16h00': {
      'Lundi': { subject: 'Gestion de Projets', teacher: 'Hassen REBAI', group: 'TI 14' },
      'Mardi': { subject: 'Informatique Industrielle', teacher: 'Said HAMDI', group: 'TI 14' },
      'Mercredi': { subject: 'Systèmes Embarqués', teacher: 'Karim KASSAR', group: 'TI 14' },
      'Jeudi': { subject: 'Communication en Anglais', teacher: 'Anna SMITH', group: 'DSI 35' },
      'Vendredi': { subject: 'Gestion Financière', teacher: 'Wajdi JEMAI', group: 'TI 14' },
    },
    '16h10 à 17h40': {
      'Lundi': { subject: 'Economie', teacher: 'Rim TRIKI', group: 'TI 15' },
      'Mardi': { subject: 'Mathématiques Discrètes', teacher: 'Omar LABIDI', group: 'TI 15' },
      'Mercredi': { subject: 'Système d’Information', teacher: 'Hana TRABELSI', group: 'TI 15' },
      'Jeudi': { subject: 'Langue et Culture', teacher: 'Meriem MEJRI', group: 'DSI 36' },
      'Vendredi': { subject: 'Droit des Affaires', teacher: 'Mohsen ZAYANI', group: 'TI 15' },
    }
  };
  

  res.render('salleTimetable', { room, days, timeslots, timetable });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Dummy validation (replace this with your actual validation logic)
  const validEmail = "user@example.com"; // Example of valid email
  const validPassword = "password123"; // Example of valid password

  if (email === validEmail && password === validPassword) {
    // Redirect to the homepage (or dashboard)
    res.redirect('/dashboard');
  } else {
    // If credentials are incorrect, re-render the login page with an error message
    res.render('login', { error: "Invalid email or password" });
  }
});

// Route for dashboard after successful login
app.get('/dashboard', (req, res) => {
  res.send("Welcome to the Dashboard!");
});

// Route to view the teacher's timetable (e.g., for a teacher named "Mr. Smith")
app.get('/teacher-timetable/:teacher', (req, res) => {
  const teacher = req.params.teacher; // e.g., "Mr. Smith"
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']; // Days of the week
  const timeslots = [
    '8h30 à 10h00',
    '10h10 à 11h40',
    '11h50 à 13h20',
    '14h30 à 16h00',
    '16h10 à 17h40'
  ];

  // Sample timetable data for a teacher
  const timetable = {
    '8h30 à 10h00': {
      'Lundi': { subject: 'Math', room: 'SI 03' },
      'Mardi': { subject: 'History', room: 'SI 02' },
      'Mercredi': { subject: 'Physics', room: 'SI 04' },
      'Jeudi': { subject: 'Web Design', room: 'SI 05' },
      'Vendredi': { subject: 'Mathematics', room: 'SI 03' },
    },
    '10h10 à 11h40': {
      'Lundi': { subject: 'History', room: 'SI 02' },
      'Mardi': { subject: 'Math', room: 'SI 03' },
      'Mercredi': { subject: 'Computer Science', room: 'SI 06' },
      'Jeudi': { subject: 'English', room: 'SI 07' },
      'Vendredi': { subject: 'Physics', room: 'SI 04' },
    },
    // Add other timeslots for the week...
  };

  res.render('teacherTimetable', { teacher, days, timeslots, timetable });
});

// Route to display the login page
app.get('/login', (req, res) => {
  res.render('login'); // Renders the login template (login.handlebars)
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Dummy validation (replace this with your actual validation logic)
  const validEmail = "user@example.com"; // Example of valid email
  const validPassword = "password123"; // Example of valid password

  if (email === validEmail && password === validPassword) {
    // Redirect to the homepage (or dashboard) after successful login
    res.redirect('/dashboard');
  } else {
    // If credentials are incorrect, re-render the login page with an error message
    res.render('login', { error: "Invalid email or password" });
  }
});

// Route to display the absence form
app.get('/insert-absence', (req, res) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeslots = ['8h30 à 10h00', '10h10 à 11h40', '11h50 à 13h20', '14h30 à 16h00', '16h10 à 17h40'];
  
  res.render('insertAbsence', { days, timeslots });
});

// Route to handle form submission
app.post('/insert-absence', (req, res) => {
  const absenceData = req.body;

  // Log data for now; replace with saving to a database
  console.log(absenceData);

  // Redirect or show a success message
  res.redirect('/timetable');
});

// Route to render the registration form
app.get('/register', (req, res) => {
  res.render('register'); // Renders the register.handlebars template
});

// Route to handle form submission
app.post('/register', (req, res) => {
  const { firstname, lastname, email, cin, password, confirmPassword } = req.body;

  // Basic form validation
  if (password !== confirmPassword) {
    return res.render('register', { error: "Passwords do not match!" });
  }

  // Log the registration details (for demonstration purposes)
  console.log({ firstname, lastname, email, cin, password });

  // TODO: Add database logic here to save the new user

  // Redirect to login or a welcome page after successful registration
  res.redirect('/login');
});

// Route to render the teacher timetable creation form
app.get('/create-teacher-timetable', (req, res) => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeslots = ['8h30 à 10h00', '10h10 à 11h40', '11h50 à 13h20', '14h30 à 16h00', '16h10 à 17h40'];
  const teacherName = "John Doe"; // Replace with actual teacher name data

  res.render('createTeacherTimetable', { days, timeslots, teacherName });
});

// Route to handle the teacher timetable form submission
app.post('/create-teacher-timetable', (req, res) => {
  const timetableData = req.body;
  
  // Log the form data (for demonstration) - replace with database logic
  console.log(timetableData);

  // Redirect to a confirmation page or back to the teacher timetable view
  res.redirect('/teacher-timetable');
});

// No-school days for Tunisia in 2024/2025
const noSchoolDays = [
  '2024-03-20', // Independence Day
  '2024-05-01', // Labour Day
  '2025-01-14', // Revolution Day
  // Add other specific no-school dates as needed
];

// Helper function to determine if a date falls within a specified week of the month
function isWeekOfMonth(date, month, week) {
  const dayOfMonth = date.getDate();
  return date.getMonth() === month && Math.ceil(dayOfMonth / 7) === week;
}

// Helper function to generate the calendar
function generateAcademicCalendar() {
  const months = [];
  const startYear = 2024;
  const endYear = 2025;
  const academicMonths = [
      { year: startYear, month: 8 },  // September 2024
      { year: startYear, month: 9 },  // October 2024
      { year: startYear, month: 10 }, // November 2024
      { year: startYear, month: 11 }, // December 2024
      { year: endYear, month: 0 },    // January 2025
      { year: endYear, month: 1 },    // February 2025
      { year: endYear, month: 2 },    // March 2025
      { year: endYear, month: 3 },    // April 2025
      { year: endYear, month: 4 },    // May 2025
      { year: endYear, month: 5 },    // June 2025
  ];

  academicMonths.forEach(({ year, month }) => {
      const days = [];
      const date = new Date(year, month, 1);
      const monthName = date.toLocaleString('default', { month: 'long' });

      // Add leading empty days for alignment based on the starting weekday
      for (let i = 0; i < date.getDay(); i++) {
          days.push({ date: '', isHoliday: false, color: '' });
      }

      // Generate each day in the month
      while (date.getMonth() === month) {
          const formattedDate = date.toISOString().split('T')[0];
          const dayInfo = {
              date: date.getDate(),
              isHoliday: noSchoolDays.includes(formattedDate),
              color: '', // Default color
          };

          // Apply color based on specified conditions
          if (isWeekOfMonth(date, 10, 2) || isWeekOfMonth(date, 11, 2) || isWeekOfMonth(date, 3, 2) || isWeekOfMonth(date, 5, 4)) {
              dayInfo.color = 'red'; // Red for specified weeks
          } else if (isWeekOfMonth(date, 11, 3) || isWeekOfMonth(date, 11, 4) || isWeekOfMonth(date, 2, 1) || isWeekOfMonth(date, 2, 2)) {
              dayInfo.color = 'blue'; // Blue for specified weeks
          } else if (dayInfo.isHoliday) {
              dayInfo.color = 'green'; // Green for holidays
          }

          days.push(dayInfo);
          date.setDate(date.getDate() + 1);
      }

      months.push({
          name: monthName,
          year: year,
          days: days
      });
  });

  return months;
}

// Route to render the academic calendar
app.get('/year-calendar', (req, res) => {
  const months = generateAcademicCalendar();
  res.render('yearCalendar', { months });
});

// Sample absence data
const absences = [
  { date: '2024-09-15', teacher: 'Rana RHILI' },
  { date: '2024-09-20', teacher: 'Wahbi RAJHI' },
  { date: '2024-10-05', teacher: 'Sarra JEMLI' },
  // Add more absent dates as needed
];

// Helper function to generate calendar data for a given month and year
function generateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();

  const days = [];
  const absentDates = absences.map(absence => absence.date);

  // Add empty days to align the first day of the month with the correct weekday
  const emptyDays = Array.from({ length: startDayOfWeek });

  // Populate days with absence information
  for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
          date: day,
          isAbsent: absentDates.includes(formattedDate),
      });
  }

  return {
      monthName: new Date(year, month).toLocaleString('default', { month: 'long' }),
      year,
      emptyDays,
      days,
  };
}

// Route to render the absence calendar
app.get('/teacher-absences', (req, res) => {
  const year = 2024; // Set the year you want to display (e.g., 2024/2025 academic year)
  const month = 8; // September (0-based index for months)

  const calendarData = generateCalendar(year, month);
  res.render('teacherAbsencesCalendar', calendarData);
});

// Array to store student absences
const studentAbsences = [];

// Route to display the form
app.get('/insert-student-absence', (req, res) => {
    res.render('insertStudentAbsence');
});

// Route to handle form submission
app.post('/insert-student-absence', (req, res) => {
    const { studentName, absenceDate, notes } = req.body;

    // Store the absence
    studentAbsences.push({
        studentName,
        date: absenceDate,
        notes,
    });

    console.log('Student Absence Recorded:', { studentName, date: absenceDate, notes });
    res.redirect('/view-student-absences'); // Redirect to view calendar page after submission
});

// Helper function to generate a monthly calendar with student absences
function generateStudentCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();

  const days = [];
  const absentDates = studentAbsences.filter(absence => {
      const date = new Date(absence.date);
      return date.getFullYear() === year && date.getMonth() === month;
  });

  const absentDaysMap = absentDates.reduce((map, absence) => {
      const day = new Date(absence.date).getDate();
      map[day] = { studentName: absence.studentName, notes: absence.notes };
      return map;
  }, {});

  // Add empty days to align the first day of the month with the correct weekday
  const emptyDays = Array.from({ length: startDayOfWeek });

  for (let day = 1; day <= daysInMonth; day++) {
      days.push({
          date: day,
          isAbsent: !!absentDaysMap[day],
          studentName: absentDaysMap[day]?.studentName,
          notes: absentDaysMap[day]?.notes,
      });
  }

  return {
      monthName: new Date(year, month).toLocaleString('default', { month: 'long' }),
      year,
      emptyDays,
      days,
  };
}

// Route to view student absences calendar
app.get('/view-student-absences', (req, res) => {
  const year = 2024;
  const month = 8; // September (0-based)

  const calendarData = generateStudentCalendar(year, month);
  res.render('studentAbsencesCalendar', calendarData);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
