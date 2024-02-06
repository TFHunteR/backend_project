const getAllUsers = require('./modules/Users/getAllUsers')
const getAnnouncements = require('./modules/Announcements/getAnnouncements')
const getEnrollee = require('./modules/Enrollments/getEnrollee')
const getEnrollees = require('./modules/Enrollments/getEnrollees')
const getEnrollmentSY = require('./modules/SchoolYears/getEnrollmentSY')
const getForSectionEnrollees = require('./modules/Enrollments/getForSectionEnrollees')
const getSchoolYear = require('./modules/SchoolYears/getSchoolYear')
const getSchoolYears = require('./modules/SchoolYears/getSchoolYears')
const getSection = require('./modules/Sections/getSection')
const getSections = require('./modules/Sections/getSections')
const getSectionSubjects = require('./modules/Sections/getSectionSubjects')
const getSectionStudents = require('./modules/Sections/getSectionStudents')
const getAllStudents = require('./modules/Users/getAllStudents')
const getSubject = require('./modules/Subjects/getSubject')
const getSubjects = require('./modules/Subjects/getSubjects')
const getSubjectTeachers = require('./modules/Subjects/getSubjectTeachers')
const getTeacherSections = require('./modules/Sections/getTeacherSections')
const getUnenrolledStudents = require('./modules/Enrollments/getUnenrolledStudents')
const getUser = require('./modules/Users/getUser')
const getUserAvatar = require('./modules/Uploads/getUserAvatar')
const getQuarterlyGrade = require('./modules/Grades/getQuarterlyGrade')
const getUserEnrollment = require('./modules/Enrollments/getUserEnrollment')
const getAnnouncement = require('./modules/Announcements/getAnnouncement')
const getTopAnnouncements = require('./modules/Announcements/getTopAnnouncements')
const getTextMessages = require('./modules/Text/getTextMessages')
const getTextMessage = require('./modules/Text/getTextMessage')

module.exports = {
  getAnnouncement,
  getTopAnnouncements,
  getAllStudents,
  getAllUsers,
  getAnnouncements,
  getEnrollee,
  getEnrollees,
  getEnrollmentSY,
  getForSectionEnrollees,
  getQuarterlyGrade,
  getSchoolYear,
  getSchoolYears,
  getSection,
  getSections,
  getSectionSubjects,
  getSectionStudents,
  getSubjectTeachers,
  getSubject,
  getSubjects,
  getTeacherSections,
  getTextMessage,
  getTextMessages,
  getUnenrolledStudents,
  getUser,
  getUserAvatar,
  getUserEnrollment
}
