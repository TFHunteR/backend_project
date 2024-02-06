const getSubjectTeachers = require('./modules/Subjects/getSubjectTeachers')
const getEnrollmentFiles = require('./modules/Uploads/getEnrollmentFiles')
const getFile = require('./modules/Uploads/getFile')
const getUser = require('./modules/Users/getUser')
const _ = require('lodash')
const FILE_LOCATION = process.env.FILE_LOCATION
const { getSubject, getSection, getEnrollee } = require('./query')
const getEnrolleeQuarterlyGrades = require('./modules/Grades/getEnrolleeQuarterlyGrades')
const getEnrolleeSection = require('./modules/Sections/getEnrolleeSection')
const getRefPayments = require('./modules/Payments/getRefPayments')

module.exports = {
  Enrollment: {
    files: (params) => {
      const enrollment = params && params.toJSON()
      const enrolleeId = _.has(enrollment, 'id') ? enrollment.id : null

      return getEnrollmentFiles(null, { enrolleeId })
    },
    section: (params) => {
      const enrollment = params && params.toJSON()
      const enrolleeId = _.has(enrollment, 'id') ? enrollment.id : null
      const schoolYearId = _.has(enrollment, 'schoolYearId')
        ? enrollment.schoolYearId
        : null

      return getEnrolleeSection(null, { enrolleeId, schoolYearId })
    },
    payments: (params) => {
      const enrollment = params && params.toJSON()
      const enrolleeId = _.has(enrollment, 'id') ? enrollment.id : null

      return getRefPayments(null, { referenceId: enrolleeId })
    }
  },
  UserAvatar: {
    file: (params) => {
      const avatar = params.toJSON()
      const { fileId } = avatar

      return getFile(null, { fileId })
    }
  },
  UserFile: {
    filePath: (userFile) => {
      const { filePath } = userFile.toJSON()
      const replaced = _.replace(filePath, 'assets/', '')

      return `${FILE_LOCATION}/${replaced}`
    }
  },
  Section: {
    adviser: (params) => {
      const section = params.toJSON()
      const sectionAdviser = _.has(section, 'sectionAdviser')
        ? section.sectionAdviser
        : null
      const id = _.has(sectionAdviser, 'teacherId')
        ? sectionAdviser.teacherId
        : null

      return getUser(null, { id })
    }
  },
  SectionStudent: {
    student: async (params) => {
      const sectionStudent = params.toJSON()
      const enrolleeId = _.has(sectionStudent, 'enrolleeId')
        ? sectionStudent.enrolleeId
        : null

      const enrollee = await getEnrollee(null, { enrolleeId }).then(
        (instance) => instance && instance.toJSON()
      )

      const student = _.has(enrollee, 'student') ? enrollee.student : null

      return student
    },
    quarterlyGrades: async (params) => {
      const sectionStudent = params.toJSON()
      const enrolleeId = _.has(sectionStudent, 'enrolleeId')
        ? sectionStudent.enrolleeId
        : null

      const grades = await getEnrolleeQuarterlyGrades(null, {
        enrolleeId
      })

      return grades || []
    }
    // finalGrade: async (params) => {
    //   const sectionStudent = params.toJSON()
    //   const enrolleeId = _.has(sectionStudent, 'enrolleeId')
    //     ? sectionStudent.enrolleeId
    //     : null

    //   const grades = await getEnrolleeQuarterlyGrades(null, {
    //     enrolleeId
    //   })

    //   let final = 0

    //   _.map(grades, (inst) => {
    //     console.log({ grade })
    //     const grade = inst && inst.toJSON()
    //     const q1 = _.has(grade, 'q1') ? grade.q1 : 0
    //     const q2 = _.has(grade, 'q2') ? grade.q2 : 0
    //     const q3 = _.has(grade, 'q3') ? grade.q3 : 0
    //     const q4 = _.has(grade, 'q4') ? grade.q4 : 0

    //     const total = (q1 + q2 + q3 + q4) /4

    //   })

    //   return final ? parseFloat(final) : 0
    // }
  },
  SectionSubject: {
    subject: (params) => {
      const sectionSubject = params.toJSON()
      const subjectId = _.has(sectionSubject, 'subjectId')
        ? sectionSubject.subjectId
        : null

      return getSubject(null, { id: subjectId })
    },
    teacher: (params) => {
      const sectionSubject = params.toJSON()
      const teacherId = _.has(sectionSubject, 'teacherId')
        ? sectionSubject.teacherId
        : null

      return getUser(null, { id: teacherId })
    },
    section: (params) => {
      const sectionSubject = params.toJSON()
      const sectionId = _.has(sectionSubject, 'sectionId')
        ? sectionSubject.sectionId
        : null

      return getSection(null, { id: sectionId })
    }
  },
  Subject: {
    teachers: async (params) => {
      const subject = params.toJSON()
      const subjectId = _.has(subject, 'id') ? subject.id : null
      const teachers = _.has(subject, 'teachers') ? subject.teachers : []

      if (!teachers || !teachers.length)
        return getSubjectTeachers(null, { subjectId })

      return teachers
    }
  },
  SubjectTeacher: {
    user: async (params) => {
      const teacher = params.toJSON()
      const user = _.has(teacher, 'user') ? teacher.user : null
      const userId = _.has(teacher, 'teacherId') ? teacher.teacherId : null

      if (!user) return getUser(null, { id: userId })

      return user
    }
  }
}
