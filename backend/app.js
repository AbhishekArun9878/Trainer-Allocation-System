const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./database/connection')
const Trainers = require('./routes/Trainers')
const Admins = require('./routes/AuthAdmin')
const TrainerAuth = require('./routes/CommanLogin')
const AddTrainer = require('./routes/AddTrainer')
const AcademicOU = require('./routes/Academic')

const app = express();
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

app.use('/trainer', Trainers);
app.use('/newtrainer', AddTrainer);
app.use('/admin', Admins);
app.use('/trainers', TrainerAuth)
app.use('/academic', AcademicOU)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});