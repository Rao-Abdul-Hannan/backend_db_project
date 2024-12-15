const express = require('express');
const readAllStudentsController = require('../../../controllers/readControllers/readAllStudentsController')
const readAllTeachersController = require("../../../controllers/readControllers/readAllTeachersController");
const readSpecificTeacherController = require("../../../controllers/readControllers/readSpecificTeacherController");
const readSpecificStudentController = require("../../../controllers/readControllers/readSpecificStudentController");
const readSpecificStudentController = require("../../../controllers/readControllers/readSpecificStudentController");
const readAdmissionDataController = require("../../../controllers/readControllers/readAdmissionDataController");
const readAttendanceDataController = require("../../../controllers/readControllers/readAttendanceDataController");
const readClassRoomDataController = require('../../../controllers/readControllers/readClassRoomDataController');
const readEventDataController = require('../../../controllers/readControllers/readEventDataController');
const readExamDataController = require('../../../controllers/readControllers/readExamDataController');
const readExamResultDataController = require('../../../controllers/readControllers/readExamResultDataController');
const readMonthlyFeeController = require('../../../controllers/readControllers/readMonthlyFeeController');
const readParentDataController = require('../../../controllers/readControllers/readParentDataController');
const readPeriodDataController = require('../../../controllers/readControllers/readPeriodDataController');
const readRoomDataController = require('../../../controllers/readControllers/readRoomDataController');
const readSectionDataController = require('../../../controllers/readControllers/readSectionDataController');
const readStudentEventDataController = require('../../../controllers/readControllers/readStudentEventDataController');
const readSubjectCourseDataController = require('../../../controllers/readControllers/readSubjectCourseDataController');
const readTranscriptController = require('../../../controllers/readControllers/readTranscriptController');
const readStudentMarksController = require('../../../controllers/readControllers/readStudentMarksController');
const readStudentCoursesController = require('../../../controllers/readControllers/readStudentCoursesController');
const readTeacherTeachingSectionsController = require('../../../controllers/readControllers/readTeacherTeachingSections');
const readStudentParticipationsController = require('../../../controllers/readControllers/readStudentParticipationsController');
const createStudentController = require('../../../controllers/writeControllers/createStudentController');

const v1Router = express.Router()


//Read Controllers
v1Router.get(`/all-students`, readAllStudentsController) 
v1Router.get(`/all-teachers`, readAllTeachersController) 
v1Router.get(`/specific-teacher/:teacher_id`, readSpecificTeacherController) 
v1Router.get('/specific-student/:student_id', readSpecificStudentController)
v1Router.get('/attendance-data', readAttendanceDataController)
v1Router.get("/admission-data", readAdmissionDataController);
v1Router.get("/classroom-data", readClassRoomDataController);
v1Router.get("/events-data", readEventDataController);
v1Router.get("/exam-data", readExamDataController);
v1Router.get("/exam-result", readExamResultDataController);
v1Router.get("/monthly-fee", readMonthlyFeeController);
v1Router.get("/parent-data", readParentDataController);
v1Router.get("/period-data", readPeriodDataController);
v1Router.get("/room-data", readRoomDataController);
v1Router.get("/section-data", readSectionDataController);
v1Router.get("/student-event-data", readStudentEventDataController);
v1Router.get("/subject-course-data", readSubjectCourseDataController);
v1Router.get("/transcript/:student_id", readTranscriptController);
v1Router.get("/student-marks-filter/:marks/:student_id", readStudentMarksController);
v1Router.get("/student-courses/:student_id", readStudentCoursesController);
v1Router.get("/teacher-teaching-sections/:t_id", readTeacherTeachingSectionsController);
v1Router.get("/student-participations", readStudentParticipationsController);

//Write Controllers
v1Router.post(`/add-student`, createStudentController)


module.exports = v1Router