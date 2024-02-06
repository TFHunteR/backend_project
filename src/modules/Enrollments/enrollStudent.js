const Promise = require('bluebird')
const {
  Enrollees,
  EnrolleeFiles,
  sequelize,
  Users,
  Payments
} = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const uploadFile = require('../Uploads/uploadFile')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const createdBy = _.has(context, 'id') ? context.id : null

    async function doSave() {
      const userId = _.has(payload, 'studentId') ? payload.studentId : null
      const schoolYearId = _.has(payload, 'schoolYearId')
        ? payload.schoolYearId
        : null
      const gradeLevel = _.has(payload, 'gradeLevel')
        ? payload.gradeLevel
        : null
      const others = _.has(payload, 'others') ? payload.others : null
      const files = _.has(payload, 'files') ? payload.files : null
      const paymentType = _.has(payload, 'paymentType')
        ? payload.paymentType
        : null
      const amount = _.has(payload, 'amount')
        ? parseFloat(payload.amount)
        : null

      var enrollmentStatus = 'UNPAID'
      switch (paymentType) {
        case 'FULL':
          enrollmentStatus = 'FULLY_PAID'
          break
        case 'PARTIAL':
          enrollmentStatus = 'PARTIALLY_PAID'
          break
        default:
          break
      }

      const t = await sequelize.transaction()

      try {
        // check first if already enrolled
        await Enrollees.findOne({
          where: { userId, schoolYearId },
          transaction: t
        })
          .then((result) => {
            if (result) {
              throw new Error('Student already enrolled')
            }
          })
          .catch((err) => {
            const error = sequelizeHelper.extractError(err)

            throw error
          })

        const student = await Users.findOne({
          where: { id: userId },
          include: [
            'profile',
            {
              model: Enrollees,
              as: 'enrollment',
              include: [
                {
                  model: EnrolleeFiles,
                  as: 'files'
                }
              ],
              order: [['files', 'desc']]
            }
          ],
          transaction: t
        })
          .then(async (studentInst) => {
            return studentInst
          })
          .catch(async (err) => {
            const error = sequelizeHelper.extractError(err)

            throw error
          })

        // enroll student
        const enrollmentInst = await Enrollees.create(
          {
            userId,
            schoolYearId,
            gradeLevel,
            paymentType,
            others,
            status: enrollmentStatus,
            createdBy
          },
          { transaction: t }
        )
        const enrollment = enrollmentInst && enrollmentInst.toJSON()
        const enrolleeId = _.has(enrollment, 'id') ? enrollment.id : null

        // payment
        await Payments.create(
          {
            type: 'ENROLLMENT',
            referenceId: enrolleeId,
            paymentType,
            amount,
            others,
            status: 'ACCEPTED',
            createdBy
          },
          { transaction: t }
        )

        // upload file attachments
        await Promise.map(files, (file) => {
          return uploadFile(__, { file, transaction: t }, { ...context }).then(
            (result) => {
              const fileResult = result && result.toJSON()
              const fileId = _.has(fileResult, 'id') ? fileResult.id : null

              // associate files to enrollment
              return EnrolleeFiles.create(
                { enrolleeId, fileId, createdBy },
                { transaction: t }
              )
            }
          )
        })

        student.set({ enrollment: enrollmentInst })
        await student.save()

        await t.commit()

        return student
      } catch (err) {
        await t.rollback()
        throw err
      }
    }

    return doSave().then(resolve).catch(reject)
  })
