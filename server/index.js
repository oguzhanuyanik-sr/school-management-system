const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Students = require('./models/Students');

const app = express();
app.use(
  cors({
    origin: ['https://school-system-client1.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(
  'mongodb+srv://mubco:nEaMIDZ2dU0IHPap@myproject.wpdzp1v.mongodb.net/school_system?retryWrites=true&w=majority'
);

app.get('/', (req, res) => {
  res.json('Hello');
});

// Get All Users
app.get('/list', async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Specific User
app.get('/list/:studentId', async (req, res) => {
  try {
    const student = await Students.findById(req.params.studentId);
    res.json(student);
  } catch (err) {
    res.json({ message: err });
  }
});

// Add User
app.post('/add', async (req, res) => {
  const student = new Students({
    student_no: req.body.student_no,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  try {
    const addedStudent = await student.save();
    res.json(addedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update User
app.patch('/update/:studentId', async (req, res) => {
  try {
    const updatedStudent = await Students.updateOne(
      { _id: req.params.studentId },
      {
        $set: {
          student_no: req.body.student_no,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birth_date: req.body.birth_date,
          address: req.body.address,
          phone: req.body.phone,
          midterm: req.body.midterm,
          final: req.body.final,
          homework: req.body.homework,
        },
      }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete User
app.delete('/delete/:studentId', async (req, res) => {
  try {
    const removedStudent = await Students.deleteOne({
      _id: req.params.studentId,
    });
    res.json(removedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(3001, () => {
  console.log('Server is Running');
});