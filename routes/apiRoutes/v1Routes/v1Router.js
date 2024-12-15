const express = require('express');
const createStudentController = require('../../../controllers/studentsControllers/createStudentController');
const readAllStudentsController = require('../../../controllers/studentsControllers/readAllStudentsController');
const v1Router = express.Router()

v1Router.get(`/all-students`, readAllStudentsController) // read all
v1Router.post(`/add-student`, createStudentController)

module.exports = v1Router