module.exports = `
  scalar JSON
  scalar File

  type Announcement {
    id: ID
    audience: [RoleCodes]
    message: String
    status: AnnouncementStatus
    createdBy: String
    createdAt: String
  }

  type Enrollment {
    id: ID
    userId: Int
    schoolYearId: Int
    gradeLevel: GradeLevels
    sectionStudent: SectionStudent
    student: User
    section: Section
    paymentType: PaymentType
    status: String
    payments: [Payment]
    files: [UserFile]
    createdBy: String
    createdAt: String
  }

  type Payment {
    id: ID
    type: String
    referenceId: Int
    paymentType: PaymentType
    amount: Float
    others: JSON
    status: String
    files: [UserFile]
    createdBy: String
    createdAt: String
  }

  type SchoolYear {
    id: ID!
    name: String
    startDate: String
    endDate: String
    status: SchoolYearStatus
    createdBy: String
    createdAt: String
  }

  type Section {
    id: ID!
    name: String
    gradeLevel: GradeLevels
    endDate: RoleCodes!
    status: SectionStatus
    createdBy: String
    createdAt: String
    adviser: User
    sectionStudents: [SectionStudent]
  }

  type SectionAdviser{
    id: ID!
    section: Section
    adviser: User
    schoolYear: SchoolYear
    createdBy: String
    createdAt: String
  }

  type SectionSubject{
    id: ID!
    sectionId: Int
    subjectId: Int
    teacherId: Int
    schoolYearId: Int
    subject: Subject
    section: Section
    teacher: User
    createdBy: String
    createdAt: String
  }

  type SectionStudent{
    id: ID!
    sectionId: Int
    schoolYearId: Int
    enrolleeId: Int
    student: User
    section: Section
    quarterlyGrades: [QuarterlyGrade]
    createdBy: String
    createdAt: String
  }

  type Subject{
    id: ID!
    name: String
    gradeLevel: GradeLevels
    category: SubjectCategory
    teachers: [SubjectTeacher]
    createdBy: String
    createdAt: String
  }

  type SubjectTeacher {
    id: ID!
    subjectId: String
    teacherId: String
    user: User
    createdBy: String
    createdAt: String
  }

  type TextMessage {
    id: ID
    audience: [RoleCodes]
    recipients: [JSON]
    message: String
    status: TextMessageStatus
    createdBy: String
    createdAt: String
  }

  type User {
    id: ID!
    username: String!
    status: String
    roleCode: RoleCodes!
    profile: UserProfile
    enrollment: Enrollment
    createdAt: String
    createdBy: String
  }

  type UserAvatar {
    id: ID!
    userId: String!
    fileId: String!
    file: UserFile
    createdBy: String
    createdAt: String
    updatedBy: String
    updatedAt: String
  }

  type UserFile {
    id: ID!
    name: String
    type: String
    fileSize: Float
    filePath: String
    encoding: String
    createdBy: Int
    createdAt: String
  }

  type UserProfile {
    id: ID!
    userId: String!
    lrnNo: String
    firstName: String!
    middleName: String
    lastName: String!
    gender: String
    mobile: String
    birthDay: String
    email: String!
    parents: JSON
    guardian: JSON
    address: JSON
  }

  type QuarterlyGrade {
    id: ID!
    sectionSubjectId: Int!
    schoolYearId: Int!
    enrolleeId: Int!
    q1: Float
    q2: Float
    q3: Float
    q4: Float
    verdict: GRADE_VERDICT
    createdBy: Int
    createdAt: String
    updatedBy: Int
    updatedAt: String
  }

  enum AnnouncementStatus {
    FOR_APPROVAL
    ACTIVE
    INACTIVE
  }

  enum TextMessageStatus {
    FAILED
    SENT
  }

  enum GradeLevels {
    Kinder
    Grade_1
    Grade_2
    Grade_3
    Grade_4
    Grade_5
    Grade_6
  }

  enum RoleCodes {
    STUDENT
    TEACHER
    SCHOOL_ADMIN
    SYSTEM_ADMIN
    REGISTRAR
  }

  enum SchoolYearStatus {
    UNPUBLISHED
    PUBLISHED
    CLOSED
  }

  enum SectionStatus {
    ACTIVE
    INACTIVE
  }

  enum SubjectCategory {
    ENGLISH
    MATH
    AP
    ESP
    TLE
    MAPEH
    SCIENCE
    FILIPINO
  }
  
  input InputUser {
    username: String!
    password: String
    roleCode: RoleCodes
    profile: InputUserProfile
  }

  input InputUserProfile {
    lrnNo: String
    firstName: String!
    middleName: String
    lastName: String!
    gender: Gender!
    mobile: String
    email: String!
    address: JSON
    birthDay: String
    birthPlace: String
    parents: JSON
    guardian: JSON
    others: JSON
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum PaymentType {
    FULL
    PARTIAL
  }

  enum UserStatus {
    FOR_APPROVAL
    ACTIVE
    INACTIVE
  }

  enum SchoolYearStatus {
    PENDING
    ENROLLMENT
    ONGOING
    CLOSED
  }

  enum SectionStatus {
    ACTIVE
    INACTIVE
  }

  enum GRADE_VERDICT {
    PASSED
    FAILED
    INCOMPLETE
  }

  type Query {
    getAnnouncement(id: ID!): Announcement
    getAnnouncements: [Announcement]
    getTopAnnouncements: [Announcement]
    getAllStudents(status: [UserStatus]): [User]
    getAllUsers(roleCodes: [RoleCodes] status: [UserStatus]): [User]
    getEnrollee(enrolleeId: ID!): Enrollment
    getEnrollees: [Enrollment]
    getEnrollmentSY: [SchoolYear]
    getForSectionEnrollees(gradeLevel: GradeLevels! schoolYearId: Int!): [User]
    getQuarterlyGrade(id: ID!): QuarterlyGrade 
    getSchoolYear(id: ID!): SchoolYear
    getSchoolYears: [SchoolYear]
    getSection(id: ID!): Section
    getSections: [Section]
    getSectionSubjects(sectionId: Int! schoolYearId: Int!): [SectionSubject]
    getSectionStudents(sectionId: Int! schoolYearId: Int!): [SectionStudent]
    getSubject(id: ID!): Subject
    getSubjects(gradeLevel: GradeLevels): [Subject]
    getSubjectTeachers(subjectId: ID!): [SubjectTeacher]
    getTeacherSections(teacherId: ID!): [Section]
    getTextMessage(id: ID!): TextMessage
    getTextMessages: [TextMessage]
    getUnenrolledStudents: [User]
    getUser(id: ID!): User
    getUserAvatar(userId: ID!): UserAvatar
    getUserEnrollment(userId: Int! schoolYearId: Int!): Enrollment
  }

  type Mutation {
    addSectionAdviser(sectionId: String! teacherId: String! schoolYearId: String! createdBy: Int): SectionAdviser
    addSectionSubject(sectionId: Int! teacherId: Int! subjectId: Int! schoolYearId: Int!): SectionSubject
    addSectionStudent(sectionId: String! enrolleeId: String! schoolYearId: String! createdBy: Int): User
    addSubjectTeacher(subjectId: ID! userId: Int!): SubjectTeacher
    changeSchoolYearStatus(id: ID! status: SchoolYearStatus! updatedBy: Int): SchoolYear
    changeSectionStatus(id: ID! status: SectionStatus! updatedBy: Int): Section
    changeSubjectStatus(id: ID! status: String! updatedBy: Int): Section
    changeUserStatus(id: ID! status: UserStatus! updatedBy: Int): User
    createUser(user: InputUser! createdBy: Int): User
    createSchoolYear(name: String! startDate: String! endDate: String! createdBy: Int): SchoolYear
    createSection(name: String! gradeLevel: GradeLevels createdBy: Int): Section
    createSubject(name: String! gradeLevel: GradeLevels! category: SubjectCategory! createdBy: Int): Subject
    enrollStudent(studentId: ID! schoolYearId: Int! gradeLevel: GradeLevels! paymentType: PaymentType amount: Float! files: File! others: JSON): User
    payStudent(referenceId: ID! others: JSON amount: Float! files: File!): Payment
    registerStudent(user: InputUser): User
    smsSend(body: String! to: String!): JSON
    smsBroadcast(audience: [RoleCodes] message: String!): TextMessage
    saveAnnouncement(id: ID audience: [RoleCodes!]! message: String!): Announcement
    saveAvatar(userId: ID! fileId: Int!): UserAvatar
    saveStudentLrn(userId: ID! lrnNo: String!): UserProfile
    saveSubjectQuarterlyGrades(
      sectionSubjectId: Int!
      schoolYearId: Int!
      enrolleeId: Int!
      q1: Float
      q2: Float
      q3: Float
      q4: Float
      verdict: GRADE_VERDICT
    ): QuarterlyGrade
    uploadFile(file: File!): UserFile
  }
`
