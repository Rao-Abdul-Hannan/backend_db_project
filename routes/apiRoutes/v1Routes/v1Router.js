const express = require('express');
const readAllStudentsController = require('../../../controllers/readControllers/readAllStudentsController')
const readAllTeachersController = require("../../../controllers/readControllers/readAllTeachersController");
const readSpecificTeacherController = require("../../../controllers/readControllers/readSpecificTeacherController");
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
const createTeacherController = require('../../../controllers/writeControllers/createTeacherController');
const createEventController = require('../../../controllers/writeControllers/createEventController');
const adminSignUpController = require('../../../controllers/writeControllers/adminSignUpController');
const adminSignInController = require('../../../controllers/writeControllers/adminSignInController');
const deleteStudentController = require('../../../controllers/deleteControllers/deleteStudentController');
const deleteTeacherController = require('../../../controllers/deleteControllers/deleteTeacherController');
const deleteEventController = require('../../../controllers/deleteControllers/deleteEventController');
const updateStudentController = require('../../../controllers/updateControllers/updateStudentController');
const updateTeacherController = require('../../../controllers/updateControllers/updateTeacherController');
const updateEventController = require('../../../controllers/updateControllers/updateEventController');

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
v1Router.post(`/add-teacher`, createTeacherController)
v1Router.post(`/add-event`, createEventController)
v1Router.post(`/auth/sign-up`, adminSignUpController);
v1Router.post("/auth/sign-in", adminSignInController);

//Delete Controllers
v1Router.delete(`/delete-student/:student_id`, deleteStudentController)
v1Router.delete(`/delete-teacher/:t_id`, deleteTeacherController)
v1Router.delete(`/delete-event/:event_id`, deleteEventController)

//Update Controllers
v1Router.post("/update-student", updateStudentController)
v1Router.post("/update-teacher", updateTeacherController)
v1Router.post("/update-event", updateEventController)


module.exports = v1Router