const addSectionAdviser = require('./modules/Sections/addSectionAdviser')
const addSectionSubject = require('./modules/Sections/addSectionSubject')
const addSectionStudent = require('./modules/Sections/addSectionStudent')
const addSubjectTeacher = require('./modules/Subjects/addSubjectTeacher')
const changeSchoolYearStatus = require('./modules/SchoolYears/changeSchoolYearStatus')
const changeSectionStatus = require('./modules/Sections/changeSectionStatus')
const changeSubjectStatus = require('./modules/Subjects/changeSubjectStatus')
const createSection = require('./modules/Sections/createSection')
const changeUserStatus = require('./modules/Users/changeUserStatus')
const createSchoolYear = require('./modules/SchoolYears/createSchoolYear')
const createSubject = require('./modules/Subjects/createSubject')
const createUser = require('./modules/Users/createUser')
const enrollStudent = require('./modules/Enrollments/enrollStudent')
const registerStudent = require('./modules/Users/registerStudent')
const smsBroadcast = require('./modules/Text/broadcastSms')
const smsSend = require('./modules/Text/sendSms')
const saveAvatar = require('./modules/Uploads/saveAvatar')
const saveSubjectQuarterlyGrades = require('./modules/Grades/saveSubjectQuarterlyGrades')
const uploadFile = require('./modules/Uploads/uploadFile')
const saveAnnouncement = require('./modules/Announcements/saveAnnouncement')
const saveStudentLrn = require('./modules/Users/saveStudentLrn')
const payStudent = require('./modules/Payments/payStudent')

module.exports = {
  addSectionAdviser,
  addSectionSubject,
  addSectionStudent,
  addSubjectTeacher,
  changeSchoolYearStatus,
  changeSectionStatus,
  changeSubjectStatus,
  changeUserStatus,
  createSchoolYear,
  createSection,
  createSubject,
  createUser,
  enrollStudent,
  payStudent,
  registerStudent,
  uploadFile,
  smsSend,
  smsBroadcast,
  saveAnnouncement,
  saveAvatar,
  saveStudentLrn,
  saveSubjectQuarterlyGrades
}
