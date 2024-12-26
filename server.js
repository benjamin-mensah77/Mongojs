


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;
const mongoURI = 'mongodb://localhost:27017/BENK'; // Replace with your MongoDB URI

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
    name: String,
    class: String,
    location: String,
    birthdate: Date,

    mobile: String,
});

const Student = mongoose.model('Student', StudentSchema);

// Registration route
app.post('/register', async (req, res) => {
    const { name, class: studentClass, location, birthdate, mobile } = req.body; // Destructure the input fields

    const newStudent = new Student({ name, class: studentClass, location, birthdate, mobile });
    try {
        await newStudent.save();
        res.json({ message: 'Registration successful!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error registering student' });
    }
});

// Route to display students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        let html = `
            <html>
                <head>
                    <title>Student List</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>Student List</h1>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Location</th>
                            <th>Birthdate</th>
                            <th>Mobile</th>
                        </tr>`;
        
        students.forEach(student => { // Corrected variable name
            html += `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.class}</td>
                            <td>${student.location}</td>
                            <td>${new Date(student.birthdate).toLocaleDateString()}</td>
                            <td>${student.mobile}</td>
                        </tr>`;
        });

        html += `
                    </table>
                    <button class="back-button" onclick="window.location.href='/'">Back to Registration</button>
                </body>
            </html>`;
        
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
});

// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});















